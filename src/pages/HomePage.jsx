import React, { useEffect, useRef, useState } from 'react'
import NoteCard from '../components/NoteCard'
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useNoteStore } from '../store/useNoteStore';
import { FaFilePdf } from "react-icons/fa";
import LeftArrow from '../icons/LeftArrow';
import RightArrow from '../icons/RightArrow';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { useEditor, useEditorState } from '@tiptap/react';
import { useEditorStore } from '../store/useEditorStore';
import { marked } from 'marked';
import ModalSave from '../components/ModalSave';
import { generateJSON } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Loading from '../components/Loading';
import dayjs from 'dayjs'
import { FaChevronCircleLeft } from "react-icons/fa"
import { FaChevronCircleRight } from "react-icons/fa"
import { FaStar } from "react-icons/fa";

const extensions = [StarterKit]

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const HomePage = () => {

    const navigate=useNavigate()
    const inputRef=useRef()

    const notes=useNoteStore((state)=>state.notes)
    
    const fetchNote=useNoteStore((state)=>state.fetchNote)

    const setEditorText=useEditorStore((state)=>state.setEditorText)
    const setEditorJSON=useEditorStore((state)=>state.setEditorJSON)

    const [modalOpen,setModalOpen]=useState(false)
    const [currentMonth,setCurrentMonth]=useState(dayjs())

    useEffect(()=>{
        async function asyncFetch(){
        setLoading(true)
        await fetchNote(currentMonth)
        setLoading(false)
        }
        asyncFetch()
    },[currentMonth,modalOpen])
 
    const handleNextMonth = () => {
        if(dayjs().month()>currentMonth.month() && dayjs().year()<=currentMonth.year()){
        setCurrentMonth(prev => prev.add(1, 'month'))
        return
        }
        alert("You cant go to future")
    }

    const handlePrevMonth = () => {
    setCurrentMonth(prev => prev.subtract(1, 'month'))
    }

    const handleDivClick = () => {
        inputRef.current.click(); 
    };

    const [loading,setLoading]=useState(false)

    const token=useAuthStore((state)=>state.token)

    const handleFileChange =async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        const formData = new FormData();
        formData.append("pdf", file);
        setLoading(true)

        const res=await axios.post(import.meta.env.VITE_BACKEND_URL+"/user/readPDF",
            formData,
        {
            headers:{
                'authorization':`<Bearer> ${token}`
            }
        })

        // console.log(res.data.content);
        
        const summaryRes=await axios.post(import.meta.env.VITE_BACKEND_URL+"/user/getPlainResponse",{
            query:`Generate a very extensive summary of this provided content : ${res.data.content}`
        },{
            headers:{
                'authorization':`<Bearer> ${token}`
            }
        })

        // console.log(summaryRes.data.response)

        // setPDFText(summaryRes.data.response)
        // console.log();
        
        setEditorText(summaryRes.data.response)
        const htmlString=marked(summaryRes.data.response)
        console.log(htmlString);
        
        const jsonContent = generateJSON(htmlString, extensions)
        console.log(jsonContent);
        
        setEditorJSON(jsonContent)
        // console.log(jsonContent);
        setLoading(false)
        setModalOpen(true)

    //   console.log('PDF selected:', file.name);

    } else {
      alert('Please select a valid PDF file.');
    }
    };

    const [showFavs,setShowFavs]=useState(false)

  return (
    <div className='w-full border-t-2 pt-20'>
        <div className='flex my-8 mx-2 md:mx-6 md:gap-5 justify-center gap-3'>
            {loading && <Loading></Loading>}
            {modalOpen && <ModalSave isOpen={modalOpen} setIsOpen={setModalOpen}></ModalSave>}
            <div className='text-gray-600 font-scribble md:text-base text-xs text-center my-auto '>
                Click to open AI <br /> enriched
                text editor</div>
            <div className='md:h-20 md:w-20 text-gray-400 h-10 w-10 my-auto'>
            <RightArrow ></RightArrow>
            </div>
            
            <div onClick={()=>navigate("/textEditor")} className='cursor-pointer h-22 w-25 md:h-28 md:w-28 bg-gray-100/30 outline-dashed outline-2 outline-black/30 rounded-3xl flex justify-center items-center flex-col '>
            <div >
            <FaPencilAlt className='h-5 w-5 md:h-6 md:w-6'/>
            </div>
            <div className='text-center mt-2 text-xs md:text-sm'>
                New Note
            </div>
            </div>

            <div onClick={handleDivClick} className='cursor-pointer h-22 w-25 md:h-28 md:w-28 bg-gray-100/30 outline-dashed outline-2 outline-black/30 rounded-3xl flex justify-center items-center flex-col '>
            <div >
            <FaFilePdf className='h-5 w-5 md:h-6 md:w-6'/>
            </div>
            <div className='text-center mt-2 text-xs md:text-sm'>
                Upload PDF 
            </div>
            <input
                type="file"
                accept="application/pdf"
                ref={inputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                />
            </div>

            <div className='md:h-20 md:w-20 h-10 w-10 text-gray-400 my-auto'>
            <LeftArrow ></LeftArrow>
            </div>
            <div
            
             className='text-gray-600 font-scribble md:text-base text-xs  text-center my-auto'>
                Click to upload
                PDF <br /> and generate it's note
                </div>
        </div>
        <div className='flex justify-between mx-4 md:mx-6 items-center'>
            <div className='flex gap-3 items-center'>
                <div className='text-3xl md:text-4xl font-semibold font-poppins'>
                    My Notes
                </div>
                <div onClick={()=>setShowFavs(!showFavs)} className={`cursor-pointer p-1.5 bg-black rounded-full ${!showFavs?"text-white":"text-yellow-300"}`}>
                    <FaStar />

                </div>
            </div>
        <div className='flex gap-2 items-center sm:mr-4 xl:mr-5'>
        <div className='cursor-pointer' onClick={handlePrevMonth}><FaChevronCircleLeft className='h-6 w-6'/></div>
        <div className='text-lg'>{months[currentMonth.month()]+", "+currentMonth.year()}</div>
        <div className='cursor-pointer' onClick={handleNextMonth}><FaChevronCircleRight className='h-6 w-6'/></div>
        </div>
        </div>
        <div className='flex flex-wrap mx-4 md:mx-6 my-5 gap-4 xl:gap-6'>
        {
  notes.length === 0 && !showFavs ? (
    <div className='flex justify-center w-full h-70'>
      <div className='text-3xl my-auto font-semibold text-gray-700/50 md:text-6xl'>
        No note available for {months[currentMonth.month()] + ", " + currentMonth.year()}
      </div>
    </div>
  ) : showFavs ? (
    notes
      .filter(note => note.fav) 
      .map((note, index) => (
        <NoteCard
          key={index}
          noteID={note._id}
          title={note.title}
          content={note.content}
          createdAt={note.createdAt.slice(0, 10)}
          updatedAt={note.updatedAt.slice(0, 10)}
          color={note.color}
          subject={note.subject}
          fav={note.fav}
        />
      ))
  ) : (
    notes.map((note, index) => (
      <NoteCard
        key={index}
        noteID={note._id}
        title={note.title}
        content={note.content}
        createdAt={note.createdAt.slice(0, 10)}
        updatedAt={note.updatedAt.slice(0, 10)}
        color={note.color}
        subject={note.subject}
        fav={note.fav}
      />
    ))
  )
}

        </div>

        
        
    </div>
  )
}

export default HomePage