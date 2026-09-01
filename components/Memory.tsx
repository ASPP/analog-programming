export default function Memory({ memory, highlightedMemory }: { memory: Memory, highlightedMemory: number[] }) {
  return (

    <div className="my-3 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <div className="mb-3 text-center font-mono text-sm font-bold text-gray-500">
        Memory
      </div>

    <div className="flex justify-center">
      <div className="inline-flex overflow-hidden border border-gray-300 shadow-sm">
        {memory.map((card, i) => {
          const highlighted = highlightedMemory.includes(i);

          return (
            <div
              key={i}
              className={`
            w-20 px-3 py-3 text-center
            ${i > 0 ? "border-l border-gray-300" : ""}
            ${
              highlighted
                ? "bg-indigo-100 ring-inset ring-2 ring-indigo-400"
                : "bg-white hover:bg-gray-50"
            }
            transition-colors
          `}
            >
              <div className="font-mono text-xs font-semibold text-gray-500">
                0x{i.toString(16).padStart(2, "0")}
              </div>

              <div className="mt-2 min-h-10 text-3xl">{card}</div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}
