"use client"
import { API_URL } from '@/server';
import React, { useEffect, useState } from 'react'
import NoteCard from './noteCard';

type Notes = {
    _id: string;
    title: string;
    content: string;
    updatedAt: Date;
    createdAt: Date;
};

const Note = () => {

    const [notes, setNotes] = useState<Notes[]>([]);
    console.log(notes);

    //fetch our notes
    const fetchNotes = async () => {
        try {

            const response =  await fetch (`${API_URL}/notes`);
            const responseData = await response.json();
            setNotes(responseData.data.notes)
        } catch (error) {
            console.log(error);
        }

    };

    const handleDelete= async(id:string)=>{
        try {
            const response = await fetch(`${API_URL}/notes/${id}`,{
                method: "DELETE",

            })
            if(response.ok){
                    setNotes((prevNotes)=>prevNotes.filter((note)=>note._id !== id));
            }else{
                console.log("Failed to delete the note");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchNotes();
    }, []);


    return (
        <div className='w-[80%] mx-auto mt-16'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-medium'>
                Notes<span className='test-green-600'>({notes.length})</span>
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 mb-10'>
                {notes.map((note)=>{
                    //NoteCard
                    return(


                     <div key={note._id}>
                            <NoteCard note={note} onDelete={handleDelete}/>
                     </div>
                    );
                })
                }
            </div>
        </div>
    )
}

export default Note;
