"use client"
import { moods, Mood } from "./moods";

type Props = {
    selected: string | null;
    onSelect: (mood: Mood) => void;
};

export default function MoodPicker({ selected, onSelect }: Props) {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {moods.map((mood) => (
                <button
                    key={mood.key}
                    type="button"
                    onClick={() => onSelect(mood)}
                    className={`flex flex-col items-center gap-1 py-3 rounded-xl border transition-colors
                        ${selected === mood.key
                            ? "bg-nest text-canvas border-nest"
                            : "bg-paper text-ink border-mist hover:bg-mist"}`}
                >
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-xs font-medium">{mood.label}</span>
                </button>
            ))}
        </div>
    );
}