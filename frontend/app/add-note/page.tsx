"use client"
import { API_URL } from '@/server';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { auth } from '@/app/lib/firebase';
import { useRequireAuth } from '@/app/hooks/useRequireAuth';

const AddNote = () => {
    const router = useRouter();
    useRequireAuth();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const addNoteHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = await auth.currentUser?.getIdToken();
            const newNote = { title, content };
            const response = await fetch(`${API_URL}/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newNote),
            });
            if (response.ok) {
                router.push("/");
            } else {
                console.error("Failed to add note");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-[90%] max-w-xl mx-auto mt-16">
            <h1 className="font-display text-3xl sm:text-4xl text-ink mb-10">New note</h1>
            <form onSubmit={addNoteHandler} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="block w-full px-4 py-3 bg-paper border border-mist rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-nest transition-shadow font-display text-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    rows={10}
                    placeholder="Write it down..."
                    className="block w-full px-4 py-3 bg-paper border border-mist rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-nest transition-shadow"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-nest text-canvas font-medium rounded-xl hover:bg-nest-deep transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nest"
                >
                    Save note
                </button>
            </form>
        </div>
    )
}

export default AddNote;