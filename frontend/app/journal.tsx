"use client"
import { API_URL } from '@/server';
import { useEffect, useState } from 'react'
import JournalCard from './journalCard';
import { auth } from "@/app/lib/firebase";
import { useRequireAuth } from '@/app/hooks/useRequireAuth';

type JournalEntry = { _id: string; mood: string; content: string; images: string[]; createdAt: Date };

const Journal = () => {
    const { user, loading } = useRequireAuth();
    const [journals, setJournals] = useState<JournalEntry[]>([]);

    const fetchJournals = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`${API_URL}/journals`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const responseData = await response.json();
            setJournals(responseData.data.journals);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const token = await auth.currentUser?.getIdToken();
            const response = await fetch(`${API_URL}/journals/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) setJournals((prev) => prev.filter((j) => j._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!loading && user) fetchJournals();
    }, [loading, user]);

    if (journals.length === 0) return null;

    return (
        <div className="w-[90%] max-w-6xl mx-auto mt-14">
            <h1 className="font-display text-3xl sm:text-4xl text-ink mb-6">Journal</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {journals.map((journal) => (
                    <JournalCard key={journal._id} journal={journal} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    )
}

export default Journal;