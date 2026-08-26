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

            const newNote = {
                title,
                content,
            };

            const response = await fetch(`${API_URL}/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                    Authorization : `Bearer ${token}`,
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
        <div className='w-[80%] mx-auto '>
            <h1 className='mt-20 text-2xl sm:text-4xl text-orange-800 font-bold'>Add New Note</h1>

            <div className='mt-12'>
                <form onSubmit={addNoteHandler} >
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
                    >Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote;
