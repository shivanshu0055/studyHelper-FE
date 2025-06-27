import React from 'react'
import { FaEdit } from "react-icons/fa";
import {motion} from "motion/react"
import { RiEdit2Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const colorSchemes={
    "blue":"bg-blue-200",
    "green":"bg-green-200",
    "pink":"bg-pink-200",
    "purple":"bg-purple-200",
    "yellow":"bg-yellow-200"
}

const NoteCard = ({noteID,createdAt,updatedAt,title,content,subject,color}) => {
const navigate=useNavigate()

  return (
    <motion.div
    className={`font-poppins h-fit ${colorSchemes[color]} m-8 rounded-2xl pt-8 pb-5 px-5`} >

        <div className='flex justify-between my-4 '>
        <div className='font-medium text-2xl break-words w-8/10  '>
            {title}
        </div>
        <div onClick={()=>{
            navigate(`/textEditor?noteID=${noteID}`)
        }} className='flex justify-center items-center mr-3 cursor-pointer' >
        <RiEdit2Line className='h-7 w-7' />

        </div>
        </div>
        <hr />
        <div className='mt-5  font-light text-sm overflow-auto max-h-96 pr-3 break-words '>
            {content}
        </div>
        <div className='font-light mt-6 text-xs text-gray-600 flex flex-col gap-1'>
        <div> Subject : {subject}</div>
        <div> Created at : {createdAt}</div>
        <div> Updated at : {updatedAt}</div>
        </div>
        
    </motion.div>
  )
}

export default NoteCard