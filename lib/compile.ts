export type Register = "REG0" | "REG1" | "REG2" | "REG3";
export type Address = number;

export type Instruction =
  | ["fetch", Address, Register]
  | ["push", Register, Address]
  | ["sort", Register, Register]
  | ["halt"];

export type Program = Instruction[];

export interface CompileError {
  line: number;
  message: string;
}

export type CompileResult =
  | { ok: true; program: Program }
  | { ok: false; errors: CompileError[] };

  const REGISTERS = new Set<Register>(["REG0", "REG1", "REG2", "REG3"]);

export function compile(source: string): CompileResult {
  const program: Program = [];
  const errors: CompileError[] = [];

  const lines = source.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const lineNumber = i + 1;

    // Remove comments and whitespace
    const line = lines[i]
      .replace(/\/\/.*$/, "")
      .trim();

    // Empty lines are fine
    if (!line) {
      continue;
    }

    try {
      const instruction = parseInstruction(line);
      program.push(instruction);
    } catch (error) {
      errors.push({
        line: lineNumber,
        message: error instanceof Error
          ? error.message
          : "Invalid instruction",
      });
    }
  }

  // Don't accept a program with errors
  if (errors.length > 0) {
    return { ok: false, errors };
  }

  // Require halt?
  if (program.length === 0 || program.at(-1)?.[0] !== "halt") {
    errors.push({
      line: lines.length,
      message: "Program must end with halt.",
    });

    return { ok: false, errors };
  }

  return {
    ok: true,
    program,
  };
}

function parseInstruction(line: string): Instruction {
  // halt
  if (/^halt$/i.test(line)) {
    return ["halt"];
  }

  // fetch(0x00, REG0)
  let match = line.match(
    /^fetch\s*\(\s*(0x[0-9a-f]+|\d+)\s*,\s*(REG[0-3])\s*\)$/i
  );

  if (match) {
    const addr = parseAddress(match[1]);
    const reg = parseRegister(match[2]);

    return ["fetch", addr, reg];
  }

  // push(REG0, 0x00)
  match = line.match(
    /^push\s*\(\s*(REG[0-3])\s*,\s*(0x[0-9a-f]+|\d+)\s*\)$/i
  );

  if (match) {
    const reg = parseRegister(match[1]);
    const addr = parseAddress(match[2]);

    return ["push", reg, addr];
  }

  // sort(REG0, REG1)
  match = line.match(
    /^sort\s*\(\s*(REG[0-3])\s*,\s*(REG[0-3])\s*\)$/i
  );

  if (match) {
    return [
      "sort",
      parseRegister(match[1]),
      parseRegister(match[2]),
    ];
  }

  throw new Error(`Unknown or malformed instruction: ${line}`);
}

function parseRegister(value: string): Register {
  const register = value.toUpperCase() as Register;

  if (!REGISTERS.has(register)) {
    throw new Error(`Invalid register: ${value}`);
  }

  return register;
}

function parseAddress(value: string): Address {
  const address = Number(value);

  if (!Number.isInteger(address) || address < 0 || address >= 5) {
    throw new Error(
      `Invalid address: ${value}. Expected an address from 0x00 to 0x04.`
    );
  }

  return address;
}