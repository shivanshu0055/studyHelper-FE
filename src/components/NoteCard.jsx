import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import {AnimatePresence, motion} from "motion/react"
import { RiEdit2Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { useNoteStore } from '../store/useNoteStore';
import Loading from './Loading';
import dayjs from 'dayjs';

// import { editNote } from '../../../BE/dist/controllers/user.controller';

const colorSchemes = {
  blue: '#04d9ff',
  green: '#e3ef8f',
  orange: '#fe9b72',
  purple: '#b692fc',
  yellow: '#fec971'
}

// const colorSchemes = {
//   blue: '#4bcef2',
//   green: '#e3ef8f',
//   orange: '#fe9b72',
//   purple: '#b296fa',
//   yellow: '#fec971'
// }

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const NoteCard = ({noteID,createdAt,updatedAt,title,content,subject,color,fav}) => {

    // console.log(colorSchemes[color]);
    // console.log(fav);
    
    const [showDelete,setShowDelete]=useState(false)
    const navigate=useNavigate()
    const token=useAuthStore((state)=>state.token)
    const deleteNote=useNoteStore((state)=>state.deleteNote)
    const [loading,setLoading]=useState(false)
    const editNote=useNoteStore((state)=>state.editNote)
    const fetchNote=useNoteStore((state)=>state.fetchNote)

    const handleDelete=async ()=>{
        setLoading(true)

        await axios.post(import.meta.env.VITE_BACKEND_URL+"/user/deleteNote",{
            noteID:noteID
        },
        {
            headers:{
                'authorization':`<Bearer> ${token}`
            }
        })
        
        deleteNote(noteID)
        setLoading(false)
    }

    const handleFav=async ()=>{
        setLoading(true)

        const res=await axios.post(import.meta.env.VITE_BACKEND_URL+"/user/editNote",{
            fav:!fav,
            noteID:noteID
        },
        {
            headers:{
                'authorization':`<Bearer> ${token}`
            }
        })
        
        editNote(res.data.note)

        setLoading(false)
    }

  return (
    <motion.div
    // variants={cardVariants}
    // key={noteID}
    onMouseEnter={()=>{
        setShowDelete(true)
    }}  

    onMouseLeave={()=>{
        setShowDelete(false)
    }}

    className={` relative font-poppins md:h-[330px] w-[48%] lg:w-[32%] xl:w-[23.5%] h-[310px] rounded-2xl pt-6 pb-5 px-4 bg-[${colorSchemes[color]}] `}
    >
        { loading && <Loading/>}
        <AnimatePresence>
        {showDelete && <motion.div 
        onClick={()=>{
            handleDelete()
        }} 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.5}}
        className='cursor-pointer h-3.5 w-3.5 rounded-full bg-red-500 absolute top-5 right-5'></motion.div>}
        </AnimatePresence>

        <div className='text-xs text-gray-800'>{createdAt}</div>
        <div className='flex justify-between my-2 md:my-4 items-end h-9 '>
        <div className='font-medium text-lg md:text-2xl break-words w-6/10 md:w-7/10 overflow-scroll hide-scrollbar h-8'>
            {title} 
        </div>
        <div className='flex gap-3 px-2 mb-1 md:mb-0 justify-center items-center rounded-full text-white bg-black p-1' >
        
        <div onClick={()=>{
            navigate(`/textEditor?noteID=${noteID}`)
        }}> 
        
        <RiEdit2Line className={`h-4 w-4 md:h-5 md:w-5 rounded-3xl cursor-pointer `} /> 
        </div>

        <div 
        className={`${fav?"text-yellow-300":null}`}
        onClick={handleFav}> <FaStar className={`h-4 w-4 md:h-5 md:w-5 rounded-3xl cursor-pointer  `}/> </div>

        </div>
        </div>
        <hr />
        <div className='mt-5 text-sm font-light overflow-hidden h-30 pr-3 break-words '>
            {content}
        </div>
        <div className='font-light mt-6 text-xs text-gray-800 flex flex-col gap-1'>
        <div> Subject : {subject}</div>
        <div> Updated at : {updatedAt}</div>
        {fav && <div>FAV</div>}
        </div>
        
    </motion.div>
  )
}

export default NoteCard