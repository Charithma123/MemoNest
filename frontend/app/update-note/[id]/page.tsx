"use client"
import { API_URL } from '@/server';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

const UpdateNote = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const { id } = use(params);   

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    console.log({ title, content });

    useEffect(() => {
        if (id) {
            const fetchNote = async () => {
                try {
                    const response = await fetch(`${API_URL}/notes/${id}`);
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
    }, [id]);

    const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const noteData = { title, content };
            const response = await fetch(`${API_URL}/notes/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(noteData),
            });
            if (response.ok) router.push("/");
            else console.log("Failed to update note");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='w-[80%] mx-auto '>
            <h1 className='mt-20 text-2xl sm:text-4xl text-orange-800 font-bold'>Update Note</h1>
            <div className='mt-12'>
                <form onSubmit={updateHandler}>
                    <input type='text'
                        placeholder='Title'
                        className='block px-4 py-3 w-[70%] outline-none bg-gray-200 rounded-md'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        rows={10}
                        placeholder='Your Note...'
                        className='block mt-4 px-4 py-3 w-[70%] outline-none bg-gray-200 rounded-md'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type='submit'
                        className='text-white block mt-4 px-4 py-3 w-[70%] outline-none bg-blue-600 hover:bg-blue-800 rounded-md'
                    >Update Note</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateNote;