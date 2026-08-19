export default function CPU({ snapshot }: { snapshot: Snapshot }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className={`relative rounded-lg p-4 ${snapshot.highlightedRegisters.includes("REG0")? "bg-red-100" : "bg-fuchsia-200"}`}>
        <b>REG0</b><br/>{snapshot.state.registers.REG0 ?? <>&nbsp;</>}
      </div>
      <div className={`relative rounded-lg p-4 ${snapshot.highlightedRegisters.includes("REG1")? "bg-red-100" : "bg-fuchsia-200"}`}>
        <b>REG1</b><br/>{snapshot.state.registers.REG1 ?? <>&nbsp;</>}
      </div>
      <div className={`relative rounded-lg p-4 ${snapshot.highlightedRegisters.includes("REG2")? "bg-red-100" : "bg-fuchsia-200"}`}>
        <b>REG2</b><br/>{snapshot.state.registers.REG2 ?? <>&nbsp;</>}
      </div>
      <div className={`relative rounded-lg p-4 ${snapshot.highlightedRegisters.includes("REG3")? "bg-red-100" : "bg-fuchsia-200"}`}>
        <b>REG3</b><br/>{snapshot.state.registers.REG3 ?? <>&nbsp;</>}
      </div>
    </div>
  );
}
