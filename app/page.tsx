import EditableSimulator from "@/components/EditableSimulator";

export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-mono dark:bg-black">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">
        <EditableSimulator defaultSource={"halt"}></EditableSimulator>
      </main>
    </div>
  );
}
