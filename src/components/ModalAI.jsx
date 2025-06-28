import React, { useEffect, useRef, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import {marked} from 'marked'
import { ScaleLoader } from 'react-spinners';
// import {motion} from 'motion/react'

const ModalAI = ({ isOpen, setIsOpen }) => {

  const [content,setContent]=useState("Your AI Genetrated content will appear here ...")
  const queryRef=useRef()
  const token=useAuthStore((state)=>state.token)
  const responseRef=useRef()

  const handleGPTResponse=async () => {
    setIsLoading(true)
    const query=queryRef.current.value
    const res=await axios.post(import.meta.env.VITE_BACKEND_URL+"/user/getPlainResponse",{
      query:query
    },{
      headers:{
        'authorization':`<Bearer> ${token}`
      }
    })
    setIsLoading(false)
    setContent(marked(res.data.response));
    
  }

  const variants={
    initial:{opacity:0},
    visible:{
      opacity:1,
      transition:{
        duration:4
      }
    }
  }

  const childVariants={
    initial:{opacity:0},
    visible:{
      opacity:1,
      transition:{
        duration:0.5
      }
    }
  }

  const [isLoading,setIsLoading]=useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed top-0 left-0 h-screen w-full bg-black/50 z-10 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{duration:0.7}}
            exit={{ opacity: 0 }}
          />

          {/* Modal content */}
          <motion.div
            className='bg-white h-fit w-[80%] sm:w-[60%] md:w-[50%] lg:w-[45%] xl:w-[40%] fixed z-10 top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2 rounded-lg py-4 px-4 font-poppins'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {/* Close button */}
            <div onClick={() => {
              setContent("Your AI Genetrated content will appear here ...")
              setIsOpen(false)
              } } className='absolute right-3 top-3 text-black/70 cursor-pointer'>
              <RxCross1 />
            </div>

            {/* Title */}
            <div className='text-black text-center text-lg '>
              AI to generate notes ✦
            </div>

            {/* Input */}
            <div>
              <textarea ref={queryRef} type="text" placeholder='eg. create short notes for magnetic field' className='text-black text-xs outline-1 outline-black/30 bg-gray-100/50 w-full my-3 rounded-sm px-2 py-1 max-h-40' />
            </div>

            {/* Generated Text Area */}

          <AnimatePresence mode="wait">
          <motion.div
            key={content} // re-triggers animation when content changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            dangerouslySetInnerHTML={{ __html: content }}
            ref={responseRef}
            className='text-xs text-black/80 min-h-72 bg-gray-100/50 mb-2 rounded-md py-1 px-2 outline-1 outline-black/30 overflow-scroll max-h-72'
          />
          </AnimatePresence>

            {/* Generate Button */}
           <div className='flex justify-center items-center'>
              <div
                onClick={handleGPTResponse}
                className="cursor-pointer text-center text-white bg-black px-2 py-1 md:py-2 md:px-4 w-fit rounded-md mt-4 h-fit"
              >
                Generate
              </div>
            {isLoading &&  <div className='px-2 py-1 md:py-2 md:px-4 w-fit rounded-md mt-4'>
              <ScaleLoader height={24} width={3} margin={1} />
              </div>
            }
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ModalAI
