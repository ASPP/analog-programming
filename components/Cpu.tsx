export default function CPU({
  registers,
  highlightedRegisters,
}: {
  registers: Record<Register, number | null>;
  highlightedRegisters: Register[];
}) {
  return (
    <div className="my-3 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <div className="mb-3 text-center font-mono text-sm font-bold text-gray-500">
        CPU
      </div>

      <div className="grid grid-cols-4 gap-3">
        {(["REG0", "REG1", "REG2", "REG3"] as const).map((reg) => {
          const highlighted = highlightedRegisters.includes(reg);

          return (
            <div
              key={reg}
              className={`
            rounded-lg border p-3 text-center transition-colors
            ${
              highlighted
                ? "border-indigo-400 bg-indigo-100"
                : "border-fuchsia-200 bg-fuchsia-50"
            }
          `}
            >
              <div className="font-mono text-xs font-bold text-gray-500">
                {reg}
              </div>

              <div className="mt-2 min-h-8 text-2xl">
                {registers[reg] ?? "\u00a0"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
