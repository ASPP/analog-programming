"use client";

import { useEffect, useMemo, useState } from "react";
import Controls from "./Controls";
import { execute } from "@/lib/execute";
import Program from "./Program";
import Memory from "./Memory";
import CPU from "./Cpu";

export default function Simulator({
  program,
  initialMemory
}: {
  program: Program;
  initialMemory: Memory;
}) {
  const history = useMemo(
    () => execute(program, initialMemory),
    [program, initialMemory],
  );

  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!playing) return;

    const timer = setInterval(() => {
      setStep((s) => Math.min(s + 1, history.length - 1));
    }, 700);

    return () => clearInterval(timer);
  }, [playing, history.length]);

  const snapshot = history[step];

  return (
    <>
      <h2 className="text-4xl font-bold py-3">Code</h2>
      <div className="columns-3">
        <Program program={program} step={step}></Program>
      </div>

      {/* <div className="relative"> */}
        <svg className="absolute inset-0 pointer-events-none">...</svg>

        <h2 className="text-4xl font-bold py-3">Computer</h2>
        <CPU snapshot={snapshot}></CPU>
        <Memory snapshot={snapshot}></Memory>
      {/* </div> */}

      <h2 className="text-4xl font-bold py-3">Controls</h2>
      <Controls
        playing={playing}
        canPrevious={step > 0}
        canNext={step < history.length - 1}
        onPrevious={() => setStep((s) => s - 1)}
        onNext={() => setStep((s) => s + 1)}
        onRestart={() => setStep(0)}
        onPlayPause={() => setPlaying((p) => !p)}
      />
    </>
  );
}
