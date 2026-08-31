"use client";

function displayOp(instr: Instruction) {
    switch (instr[0]) {
        case "fetch": {
            return `fetch(0x${instr[1].toString(16).padStart(2, '0')}, ${instr[2]})`;
        }
        case "push": {
            return `push(${instr[1]}, 0x${instr[2].toString(16).padStart(2, '0')})`;
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