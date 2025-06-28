import React from 'react'
import { FaEdit } from "react-icons/fa";
import {motion} from "motion/react"
import { RiEdit2Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { useNoteStore } from '../store/useNoteStore';

const colorSchemes = {
  blue: '#00d4ff',
  green: '#e3ef8f',
  orange: '#fe9b72',
  purple: '#b692fc',
  yellow: '#fec971'
}

const NoteCard = ({noteID,createdAt,updatedAt,title,content,subject,color}) => {

    // console.log(colorSchemes[color]);
    
    const navigate=useNavigate()
    const token=useAuthStore((state)=>state.token)
    const deleteNote=useNoteStore((state)=>state.deleteNote)

    const handleDelete=async ()=>{
        await axios.post(import.meta.env.VITE_BACKEND_URL+"/user/deleteNote",{
            noteID:noteID
        },
        {
            headers:{
                'authorization':`<Bearer> ${token}`
            }
        })
        deleteNote(noteID)
    }

  return (
    <motion.div
    className={`mb-4 break-inside-avoid relative font-poppins h-fit rounded-2xl pt-8 pb-5 px-5 bg-[${colorSchemes[color]}] `}
    >
        <div onClick={()=>{
            handleDelete()
        }} className='cursor-pointer h-3.5 w-3.5 rounded-full bg-red-500 absolute top-5 right-5'></div>
        <div className='text-xs text-gray-800'>{createdAt}</div>
        <div className='flex justify-between my-3 items-end'>
        <div className='font-medium text-2xl break-words w-7/10 '>
            {title} 
        </div>
        <div className='flex gap-3 px-3 justify-center items-center  rounded-full text-white bg-black p-1' >
        
        <div onClick={()=>{
            navigate(`/textEditor?noteID=${noteID}`)
        }}> <RiEdit2Line className={`h-6 w-6 rounded-3xl cursor-pointer `} /> </div>

        <div > <FaStar className={`h-5.5 w-5.5 rounded-3xl cursor-pointer `}/> </div>

        </div>
        </div>
        <hr />
        <div className='mt-5  font-light text-sm overflow-auto max-h-96 pr-3 break-words '>
            {content}
        </div>
        <div className='font-light mt-6 text-xs text-gray-800 flex flex-col gap-1'>
        <div> Subject : {subject}</div>
        <div> Updated at : {updatedAt}</div>
        </div>
        
    </motion.div>
  )
}

export default NoteCard