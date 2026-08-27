"use client"
import { API_URL } from '@/server';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import { auth } from '@/app/lib/firebase';
import { useRequireAuth } from '@/app/hooks/useRequireAuth';

const UpdateNote = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const { id } = use(params);
    const { user, loading } = useRequireAuth();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (id && !loading && user) {
            const fetchNote = async () => {
                try {
                    const token = await auth.currentUser?.getIdToken();
                    const response = await fetch(`${API_URL}/notes/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const responseData = await response.json();
                    const note = responseData.data.note;
                    setTitle(note.title);
                    setContent(note.content);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchNote();
        }
    }, [id, loading, user]);

    const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = await auth.currentUser?.getIdToken();
            const noteData = { title, content };
            const response = await fetch(`${API_URL}/notes/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(noteData),
            });
            if (response.ok) router.push("/");
            else console.log("Failed to update note");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-[90%] max-w-xl mx-auto mt-16">
            <h1 className="font-display text-3xl sm:text-4xl text-ink mb-10">Update note</h1>
            <form onSubmit={updateHandler} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="block w-full px-4 py-3 bg-paper border border-mist rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-nest transition-shadow font-display text-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    rows={10}
                    placeholder="Your note..."
                    className="block w-full px-4 py-3 bg-paper border border-mist rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-nest transition-shadow"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-nest text-canvas font-medium rounded-xl hover:bg-nest-deep transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nest"
                >
                    Save changes
                </button>
            </form>
        </div>
    )
}

export default UpdateNote;