"use client";

import { useMemo, useState } from "react";
import Simulator from "./Simulator";
import { compile, CompileError } from "@/lib/compile";

function showCompileError(e: CompileError) {
  return `${e.line}: ${e.message}`;
}

export default function EditableSimulator({
  defaultSource,
}: {
  defaultSource: string;
}) {
  const [source, setSource] = useState(defaultSource);
  const [editing, setEditing] = useState(false);

  const [program, setProgram] = useState(() => compile(defaultSource));

  const result = useMemo(() => compile(source), [source]);

  function apply() {
    const result = compile(source);

    if (!result.ok) {
      return;
    }

    setProgram(result);
    setEditing(false);
    // setStep(0);
  }

  const initialMemory = [1, 20, 43, 5, 23, null, null];

  return (
    <>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-linear-to-r to-orange-600 from-yellow-400">
          ASPP analog programming
        </span>
      </h1>

      {editing && (
        <>
          <button
            onClick={() => apply()}
            className="rounded border border-blue-200 p-4 px-4 py-2 hover:bg-indigo-50"
          >
            Apply
          </button>

          <textarea
            value={source}
            onChange={(event) => setSource(event.target.value)}
            className="w-full min-h-80 rounded-xl border border-gray-200 bg-gray-100 p-4 font-mono text-sm leading-relaxed shadow-inner outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 resize-y"
            rows={20}
            onKeyDown={(e) => {
                // do not trigger save dialog
              if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                // apply();
              }
            }}
          ></textarea>

          {!result.ok && <>{result.errors.map(showCompileError)}</>}
        </>
      )}

      {!editing && (
        <button
          onClick={() => setEditing(true)}
          className="rounded border border-blue-200 p-4 px-4 py-2 hover:bg-indigo-50"
        >
          Edit
        </button>
      )}

      {program.ok && (
        <Simulator
          program={program.program}
          initialMemory={initialMemory}
        ></Simulator>
      )}

      {!program.ok && <>{program.errors.map(showCompileError)}</>}
    </>
  );
}
