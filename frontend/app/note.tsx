"use client"
import { API_URL } from '@/server';
import { useEffect, useState } from 'react'
import NoteCard from './noteCard';
import { auth } from "@/app/lib/firebase";
import { useRequireAuth } from '@/app/hooks/useRequireAuth';
import { NestRings } from './nestRings';

type Notes = {
    _id: string;
    title: string;
    content: string;
    updatedAt: Date;
    createdAt: Date;
};

const Note = () => {
    const { user, loading } = useRequireAuth();
    const [notes, setNotes] = useState<Notes[]>([]);

    const fetchNotes = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`${API_URL}/notes`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const responseData = await response.json();
            setNotes(responseData.data.notes);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`${API_URL}/notes/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
            } else {
                console.log("Failed to delete the note");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!loading && user) {
            fetchNotes();
        }
    }, [loading, user]);

    return (
        <div className="w-[90%] max-w-6xl mx-auto mt-14 mb-20">
            <div className="flex items-baseline gap-3 mb-10">
                <h1 className="font-display text-4xl sm:text-5xl text-ink">Your notes</h1>
                <span className="font-mono text-sm text-ink-soft">({notes.length})</span>
            </div>

            {notes.length === 0 ? (
                <div className="relative flex flex-col items-center text-center py-24 rounded-2xl border border-dashed border-mist overflow-hidden">
                    <NestRings className="absolute w-72 h-72 text-mist -z-0" />
                    <p className="relative font-display text-2xl text-ink mb-2">Your nest is empty</p>
                    <p className="relative text-ink-soft text-sm">Add your first note to see it here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                        <NoteCard key={note._id} note={note} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Note;