"use client";

import { useEffect, useMemo, useState } from "react";
import Controls from "./Controls";
import { execute } from "@/lib/execute";
import Program from "./Program";
import Memory from "./Memory";
import CPU from "./Cpu";
import MemoryFillSizeControl from "./MemoryFillSizeControl";
import MemorySizeControl from "./MemorySizeControl";

export default function Simulator({ program }: { program: Program }) {
  const [step, setStep] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const [memorySize, setMemorySize] = useState(8);
  const [memoryFillSize, setMemoryFillSize] = useState(5);

  const memory = useMemo(() => createMemory(memorySize, memoryFillSize), [memorySize, memoryFillSize]);

  const initialState: InitialState = {
    memory: memory,
    registers: { REG0: null, REG1: null, REG2: null, REG3: null },
  };

  const history = useMemo(() => execute(program, memory), [program, memory]);

  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setStep((s) => (s == null ? 0 : Math.min(s + 1, history.length - 1)));
    }, 700);

    return () => clearInterval(timer);
  }, [playing, history.length]);

  function createMemory(memorySize: number, memoryFillSize: number): (number|null)[] {
    return Array.from({ length: memorySize }, (v, k) =>
      k < memoryFillSize ? Math.floor(Math.random() * 22) : null,
    );
  }

  function changeMemorySize(size: number) {
    setMemorySize(size);
    setMemoryFillSize(s => Math.min(s, size))
    setStep(null);
    setPlaying(false);
  }

  function changeMemoryFillSize(size: number) {
    setMemoryFillSize(size);
    setStep(null);
    setPlaying(false);
  }

  const currentState = step === null ? initialState : history[step].state;

  const snapshot = step === null ? null : history[step];

  const canPrevious = step !== null;

  const canNext =
    step === null ? history.length > 0 : step < history.length - 1;

  function previous() {
    if (step === null) return;

    setStep(step === 0 ? null : step - 1);
  }

  function next() {
    if (step === null) {
      setStep(0);
    } else if (step < history.length - 1) {
      setStep(step + 1);
    }
  }

  function restart() {
    setPlaying(false);
    setStep(null);
  }

  return (
    <>
      <h2 className="text-4xl font-bold py-3">Code</h2>
      <div className="columns-3">
        <Program program={program} step={step}></Program>
      </div>

      {/* <div className="relative"> */}
      <svg className="absolute inset-0 pointer-events-none">...</svg>

      <h2 className="text-4xl font-bold py-3">Computer</h2>

      <MemorySizeControl
        value={memorySize}
        min={1}
        max={10}
        onChange={changeMemorySize}
      />
      <MemoryFillSizeControl
        value={memoryFillSize}
        min={1}
        max={memorySize}
        onChange={changeMemoryFillSize}
      />
      <Memory
        memory={currentState.memory}
        highlightedMemory={snapshot?.highlightedMemory ?? []}
      ></Memory>

      <CPU
        registers={currentState.registers}
        highlightedRegisters={snapshot?.highlightedRegisters ?? []}
      ></CPU>
      {/* </div> */}

      <Controls
        playing={playing}
        canPrevious={canPrevious}
        canNext={canNext}
        onPrevious={previous}
        onNext={next}
        onRestart={restart}
        onPlayPause={() => setPlaying((p) => !p)}
      />
    </>
  );
}

// floating point <> real
