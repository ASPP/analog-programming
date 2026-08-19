export default function Memory({ snapshot }: { snapshot: Snapshot }) {
  return (
    <div className="grid grid-cols-10 gap-0">
      {snapshot.state.memory.map((card, i) => (
        <div
          key={i}
          className={
              snapshot.highlightedMemory.includes(i)
                  ? "relative border border-blue-300 p-4 bg-red-100"
                  : "relative border border-blue-300 p-4"
          }
        >
          <div><b>0x{i.toString(16).padStart(2, '0')}</b></div>
          <div>{card}</div>
        </div>
      ))}
    </div>
  );
}
