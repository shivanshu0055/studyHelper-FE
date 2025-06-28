import React, { useEffect, useState } from 'react'
import NoteCard from '../components/NoteCard'
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useNoteStore } from '../store/useNoteStore';
import { FaFilePdf } from "react-icons/fa";
import Loading from '../components/Loading';


const HomePage = () => {

    const navigate=useNavigate()

    const notes=useNoteStore((state)=>state.notes)
    const fetchNote=useNoteStore((state)=>state.fetchNote)

    useEffect(()=>{
        fetchNote()
    },[])

    const [loading,setLoading]=useState()

  return (
    <div className='w-full border-t-2 border-t-gray-300'>
        
        <div className='flex my-10 mx-8 gap-5'>
            <div onClick={()=>navigate("/textEditor")} className='cursor-pointer h-22 w-22 md:h-28 md:w-28 bg-gray-100/30 outline-dashed outline-2 outline-black/30 rounded-3xl flex justify-center items-center flex-col '>
            <div >
            <FaPencilAlt className='h-5 w-5 md:h-6 md:w-6'/>
            </div>
            <div className='mt-2 text-xs md:text-sm'>
                New Note
            </div>
            </div>

            <div onClick={()=>navigate("/textEditor")} className='cursor-pointer h-22 w-22 md:h-28 md:w-28 bg-gray-100/30 outline-dashed outline-2 outline-black/30 rounded-3xl flex justify-center items-center flex-col '>
            <div >
            <FaFilePdf className='h-5 w-5 md:h-6 md:w-6'/>
            </div>
            <div className='mt-2 text-xs md:text-sm'>
                Upload PDF
            </div>
            </div>
        </div>
        <div className='mx-8 text-3xl md:text-4xl font-semibold'>
            My Notes
        </div>
        <div className='columns-1 md:columns-2 xl:columns-3 gap-4 xl:gap-6 m-8 '>
        {
            notes.map((note,index)=>(
                <NoteCard
                    key={index}
                    noteID={note._id}
                    title={note.title}
                    content={note.content}
                    createdAt={note.createdAt.slice(0,10)}
                    updatedAt={note.updatedAt.slice(0,10)}
                    color={note.color}
                    subject={note.subject}
                ></NoteCard>
            ))
        }
        </div>

        
        
    </div>
  )
}

export default HomePage