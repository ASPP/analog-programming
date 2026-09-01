
export default function MemorySizeControl({
    value,
    min,
    max,
    onChange,
}: {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}) {
    return (
        <div>
            <label className="block text-sm font-medium">
                Memory: {value} card slots
            </label>

            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
                className="w-full"
            />
        </div>
    );
}
