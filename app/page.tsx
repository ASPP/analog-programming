import Program from "@/components/Program";
import Simulator from "@/components/Simulator";

export default function Home() {

  const program: Program = [
    ["fetch", 0x00, "REG0"],
    ["fetch", 0x01, "REG1"],
    ["fetch", 0x02, "REG2"],
    ["fetch", 0x03, "REG3"],
    ["sort", "REG0", "REG1"],
    ["sort", "REG1", "REG2"],
    ["sort", "REG2", "REG3"],
    ["sort", "REG0", "REG1"],
    ["sort", "REG1", "REG2"],
    ["sort", "REG0", "REG1"],
    ["push", "REG3", 0x03],
    ["fetch", 0x04, "REG3"],
    ["sort", "REG2", "REG3"],
    ["sort", "REG1", "REG2"],
    ["sort", "REG0", "REG1"],
    ["push", "REG0", 0x00],
    ["fetch", 0x03, "REG0"],
    ["sort", "REG0", "REG1"],
    ["sort", "REG1", "REG2"],
    ["sort", "REG2", "REG3"],
    ["sort", "REG0", "REG1"],
    ["sort", "REG1", "REG2"],
    ["sort", "REG0", "REG1"],
    ["push", "REG0", 0x01],
    ["push", "REG1", 0x02],
    ["push", "REG2", 0x03],
    ["push", "REG3", 0x04],
    ["halt"],
  ];

  const initialMemory = [1, 20, 43, 5, 23];

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-mono dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Simulator program={program} initialMemory={initialMemory}></Simulator>
      </main>
    </div>
  );
}
