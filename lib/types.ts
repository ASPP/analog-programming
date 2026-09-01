
type Register = "REG0" | "REG1" | "REG2" | "REG3";
type Address = number;

type Memory = (number|null)[];

type Instruction =
  | ["fetch", Address, Register]
  | ["push", Register, Address]
  | ["sort", Register, Register]
  | ["halt"];

type Program = Instruction[];

interface MachineState {
  pc: number;
  registers: Record<Register, number | null>;
  memory: Memory;
  halted: boolean;
}

interface InitialState {
  registers: Record<Register, number | null>;
  memory: Memory;
}

interface Card {
    id: number;
    name: string;
    value: number;
    symbol: string;
}

// interface Snapshot {
//     pc: number;
//     instruction: Instruction;

//     registers: Record<Register, Card | null>;
//     memory: Card[];

//     bus?: {
//         from: "memory" | "register";
//         to: "memory" | "register";
//         card: Card;
//     };

//     highlightedRegisters: Register[];
//     highlightedMemory: number[];

//     description: string;
//     // explanation: string;
// }


interface Snapshot {
  state: MachineState;
  instruction: Instruction;
  description: string;

  highlightedRegisters: Register[];
  highlightedMemory: number[];
}
