"use client";

import { execute } from "@/lib/execute";
import { useMemo, useState } from "react";

function displayOp(instr: Instruction) {
    switch (instr[0]) {
        case "fetch": {
            return `fetch(${instr[1]}, ${instr[2]})`;
        }
        case "push": {
            return `push(${instr[1]}, ${instr[2]})`;
        }
        case "sort": {
            return `sort(${instr[1]}, ${instr[2]})`;
        }
        case "halt": {
            return `halt`;
        }
    }
}

export default function Program({program, step}: {program: Program, step: number|null}) {

  return <ul>{program.map((op, idx) => {
    return <li key={idx}>{idx == step ? "*" : <>&nbsp;</>}{idx} {displayOp(op)}</li>;
  })}</ul>;
}