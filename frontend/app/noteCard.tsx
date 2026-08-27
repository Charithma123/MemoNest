import { BiCalendar, BiPencil, BiTrash } from 'react-icons/bi';
import Link from 'next/link';

type Props = {
    note: {
        _id: string;
        title: string;
        content: string;
        updatedAt: Date;
        createdAt: Date;
    };
    onDelete: (id: string) => void;
};

const formatDate = (date: Date) => {
    const dateValue = new Date(date);
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: 'numeric',
    }).format(dateValue);
};

const NoteCard = ({ note, onDelete }: Props) => {
    const createDate = formatDate(note.createdAt);
    const updateDate = note.updatedAt ? formatDate(note.updatedAt) : null;

    return (
        <div className="group bg-paper rounded-2xl border border-mist hover:border-nest/40 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1.5 font-mono text-xs text-ink-soft">
                    <BiCalendar className="w-3.5 h-3.5" />
                    {createDate}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                        href={`/update-note/${note._id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-nest hover:bg-mist transition-colors focus-visible:outline-2 focus-visible:outline-nest"
                    >
                        <BiPencil className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={() => onDelete(note._id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-clay hover:bg-clay/10 transition-colors focus-visible:outline-2 focus-visible:outline-clay"
                    >
                        <BiTrash className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <h2 className="font-display text-xl text-ink mb-2">{note.title}</h2>
            <p className="text-sm text-ink-soft line-clamp-3 flex-1">{note.content}</p>

            {updateDate && (
                <p className="mt-4 pt-4 border-t border-mist font-mono text-xs text-ink-soft">
                    Updated {updateDate}
                </p>
            )}
        </div>
    );
};

export default NoteCard;