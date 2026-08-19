export default function Controls({
  playing,
  canPrevious,
  canNext,
  onPrevious,
  onNext,
  onRestart,
  onPlayPause,
}: {
  playing: boolean;
  canPrevious: boolean;
  canNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onRestart: () => void;
  onPlayPause: () => void;
}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      <button
        className="rounded border border-red-200 p-4 px-4 py-2 hover:bg-indigo-50"
        onClick={onPrevious}
        disabled={!canPrevious}
      >
        ⏮<br/>Previous
      </button>
      <button
        className="rounded border border-red-200 p-4 px-4 py-2 hover:bg-indigo-50"
        onClick={onPlayPause}
        disabled={playing}
      >
        ▶<br/> Play
      </button>
      <button
        className="rounded border border-red-200 p-4 px-4 py-2 hover:bg-indigo-50"
        onClick={onPlayPause}
        disabled={!playing}
      >
        ⏸<br/> Pause
      </button>
      <button
        className="rounded border border-red-200 p-4 px-4 py-2 hover:bg-indigo-50"
        onClick={onNext}
        disabled={!canNext}
      >
        ⏭<br/> Next
      </button>
      <button
        className="rounded border border-red-200 p-4 px-4 py-2 hover:bg-indigo-50"
        onClick={onRestart}
      >
        ↺<br/> Restart
      </button>
    </div>
  );
}
