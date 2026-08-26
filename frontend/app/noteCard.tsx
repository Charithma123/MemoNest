import React from 'react'
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
    onDelete:(id:string)=>void;
};


const formateDate = (date: Date) => {
    const dateValue = new Date(date);
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: 'numeric',
    }).format(dateValue);
};
const NoteCard = ({ note, onDelete }: Props) => {
    const createDate = formateDate(note.createdAt);
    let updateDate
    if (note.updatedAt) {
        updateDate = formateDate(note.updatedAt);
    }
    return (
        <div className='p-8 overflow-hidden bg-blue-900 rounded-lg relative'>
            <p className='text-sm text-yellow-300 flex items-center space-x-2 mb-4 font-semibold'>
                <span>
                    <BiCalendar />
                </span>

                <span>
                    {createDate}
                </span>
            </p>

            <h1 className='text-white text-3xl mb-4 font-bold'>{note.title}</h1>
            <p className='text-base mb-4 w-[90%] text-white text-opacity-70'>{note.content}</p>

          {note.updatedAt && (
            <p className='text-sm text-white text-opacity-65 mb-4 font-semibold'>Last Updated:  {updateDate}</p>
          )}
          <Link href={`/update-note/${note._id}`}>
          <div className='w-8 h-8 bg-orange-700 hover:bg-orange-900 transition-all duration-150 rounded-full absolute
          top-4 cursor-pointer right-4 items-center justify-center flex-col'>
            <BiPencil className='text-white w-6 h-6'/>

          </div>
          </Link>

          
          <div onClick={()=>{onDelete(note._id);}}
           className='w-8 h-8 bg-rose-700 hover:bg-rose-900 transition-all duration-150 rounded-full absolute
          bottom-4 cursor-pointer right-4 items-center justify-center flex-col'>
            <BiTrash className='text-white w-6 h-6'/>

          </div>
          
        </div>
    );
};

export default NoteCard;
