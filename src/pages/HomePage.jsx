import React, { useEffect } from 'react'
import NoteCard from '../components/NoteCard'
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useNoteStore } from '../store/useNoteStore';

const HomePage = () => {

    const navigate=useNavigate()

    const notes=useNoteStore((state)=>state.notes)
    const fetchNote=useNoteStore((state)=>state.fetchNote)

    useEffect(()=>{
        fetchNote()
    },[])

  return (
    <div className='absolute w-full bg-[##f5f7fa]'>
        
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


        <NoteCard 
        date={"05/06/2025"} 

        title={"Intro to lorem ipsom"}

        content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium incidunt vel nemo, ab eligendi ut itaque expedita fugit voluptas saepe pariatur ipsam magnam dolor placeat cumque perspiciatis iusto. Quos qui, perferendis, id ea cumque eius ratione nesciunt ipsum odit, eum exercitationem. Ut quisquam atque doloribus, beatae eos provident veritatis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium incidunt vel nemo, ab eligendi ut itaque expedita fugit voluptas saepe pariatur ipsam magnam dolor placeat cumque perspiciatis iusto. Quos qui, perferendis, id ea cumque eius ratione nesciunt ipsum odit agnam dolor placeat cumque perspiciatis iusto. Quos qui, perferendis, id ea cumque eius ratione nesciunt ipsum odit agnam dolor placeat cumque perspiciatis iusto. Quos qui, perferendis, id ea cumque eius ratione nesciunt ipsum odit"}

        subject={"Operating System"}

        color="green"></NoteCard>

        <div onClick={()=>navigate("/textEditor")} className='cursor-pointer h-40 w-40 bg-gray-300/30 mx-8 outline-dashed outline-2 outline-black/30 rounded-3xl flex justify-center items-center flex-col'>
        <div >
        <FaPencilAlt className='h-6 w-6'/>
        </div>
        <div className='mt-2'>
            New Note
        </div>
        </div>
        
    </div>
  )
}

export default HomePage