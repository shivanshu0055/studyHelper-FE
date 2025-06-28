import React, { useEffect, useState } from 'react'
import NoteCard from '../components/NoteCard'
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useNoteStore } from '../store/useNoteStore';
import { FaFilePdf } from "react-icons/fa";
import Loading from '../components/Loading';
import LeftArrow from '../icons/LeftArrow';
import RightArrow from '../icons/RightArrow';


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
        
        <div className='flex my-8 mx-2 md:mx-6 md:gap-5 justify-center gap-3'>

            <div className='text-gray-600 font-scribble md:text-base text-xs text-center my-auto '>
                Click to open <br /> rich
                text editor</div>
            <div className='md:h-20 md:w-20 text-gray-400 h-10 w-10 my-auto'>
            <RightArrow ></RightArrow>
            </div>
            
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

            <div className='md:h-20 md:w-20 h-10 w-10 text-gray-400 my-auto'>
            <LeftArrow ></LeftArrow>
            </div>
            <div className='text-gray-600 font-scribble md:text-base text-xs  text-center my-auto'>
                Click to upload <br />
                PDF and more</div>
        </div>
        <div className='mx-4 md:mx-6 text-3xl md:text-4xl font-semibold font-poppins'>
            My Notes
        </div>
        <div className='flex flex-wrap mx-4 md:mx-6 my-5 gap-4 xl:gap-6'>
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