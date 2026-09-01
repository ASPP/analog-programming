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
    <div className="flex justify-center">
      <div className="inline-flex overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <button
          onClick={onPrevious}
          disabled={!canPrevious}
          className="px-4 py-3 text-gray-700 transition
                 hover:bg-indigo-50
                 disabled:cursor-not-allowed disabled:opacity-30"
          title="Previous step"
        >
          ⏮
        </button>

        <button
          onClick={onPlayPause}
          className="border-x border-gray-200 px-6 py-3 text-gray-700
                 transition hover:bg-indigo-50"
          title={playing ? "Pause" : "Play"}
        >
          {playing ? "⏸" : "▶"}
        </button>

        <button
          onClick={onNext}
          disabled={!canNext}
          className="px-4 py-3 text-gray-700 transition
                 hover:bg-indigo-50
                 disabled:cursor-not-allowed disabled:opacity-30"
          title="Next step"
        >
          ⏭
        </button>

        <button
          onClick={onRestart}
          className="border-l border-gray-200 px-4 py-3 text-gray-700
                 transition hover:bg-indigo-50"
          title="Restart"
        >
          ↺
        </button>
      </div>
    </div>
  );
}
