export function execute(program: Program, memory: Memory): Snapshot[] {
    const state: MachineState = {
        pc: 0,
        halted: false,
        memory: [...memory],
        registers: {
            REG0: null,
            REG1: null,
            REG2: null,
            REG3: null
        },
    };

    const history: Snapshot[] = [];

    while (!state.halted) {
        const instr = program[state.pc];

        switch (instr[0]) {
            case "fetch": {
                const [, addr, reg] = instr;
                state.registers[reg] = state.memory[addr];
                state.memory[addr] = null;
                history.push({
                    instruction: instr,
                    description: `${reg} ← memory[${addr}]`,
                    state: structuredClone(state),
                    highlightedMemory: [addr],
                    highlightedRegisters: [reg]
                });
                state.pc++;
                break;
            }

            case "push": {
                const [, reg, addr] = instr;
                state.memory[addr] = state.registers[reg]!;
                state.registers[reg] = null;
                history.push({
                    instruction: instr,
                    description: `memory[${addr}] ← ${reg}`,
                    state: structuredClone(state),
                    highlightedMemory: [addr],
                    highlightedRegisters: [reg]
                });
                state.pc++;
                break;
            }

            case "sort": {
                const [, a, b] = instr;
                const va = state.registers[a]!;
                const vb = state.registers[b]!;

                if (va < vb) {
                    state.registers[a] = vb;
                    state.registers[b] = va;
                }

                history.push({
                    instruction: instr,
                    description: `sort(${a}, ${b})`,
                    state: structuredClone(state),
                    highlightedMemory: [],
                    highlightedRegisters: [a, b]
                });

                state.pc++;
                break;
            }

            case "halt":
                state.halted = true;
                history.push({
                    instruction: instr,
                    description: "halt",
                    state: structuredClone(state),
                    highlightedMemory: [],
                    highlightedRegisters: []
                });
                break;
        }
    }

    return history;
}