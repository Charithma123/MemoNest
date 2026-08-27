import Link from "next/link";
import { BiTrash } from "react-icons/bi";
import { moods } from "./moods";

type Props = {
    journal: { _id: string; mood: string; content: string; images: string[]; createdAt: Date };
    onDelete: (id: string) => void;
};

const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));

const JournalCard = ({ journal, onDelete }: Props) => {
    const mood = moods.find((m) => m.key === journal.mood);
    return (
        <div className="group relative bg-paper rounded-2xl border border-mist hover:border-nest/40 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <Link href={`/update-journal/${journal._id}`} className="block p-6">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-ink-soft">{formatDate(journal.createdAt)}</span>
                    <span className="text-2xl">{mood?.emoji ?? "📝"}</span>
                </div>
                {journal.images?.[0] && (
                    <img src={journal.images[0]} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />
                )}
                <p className="text-sm text-ink-soft line-clamp-3">{journal.content}</p>
            </Link>
            <button
                onClick={() => onDelete(journal._id)}
                className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-clay hover:bg-clay/10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <BiTrash className="w-4 h-4" />
            </button>
        </div>
    );
};

export default JournalCard;