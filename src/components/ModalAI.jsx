import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from 'framer-motion'

const ModalAI = ({ isOpen, setIsOpen }) => {
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
            <div onClick={() => setIsOpen(false)} className='absolute right-3 top-3 text-black/70 cursor-pointer'>
              <RxCross1 />
            </div>

            {/* Title */}
            <div className='text-black text-center text-lg '>
              AI to generate notes ✦
            </div>

            {/* Input */}
            <div>
              <textarea type="text" placeholder='eg. create short notes for magnetic field' className='text-black text-xs outline-1 outline-black/30 bg-gray-100/50 w-full my-3 rounded-sm px-2 py-1 max-h-40' />
            </div>

            {/* Generated Text Area */}
            <div className='text-xs text-black/80 min-h-72 bg-gray-100/50 mb-2 rounded-md py-1 px-2 outline-1 outline-black/30 overflow-scroll max-h-72'>
              {/* Placeholder text */}
              Lorem ipsum dolor sit amet...
            </div>

            {/* Generate Button */}
            <div className='cursor-pointer m-auto text-center text-white bg-black py-1 px-2 w-fit rounded-md mt-4 '>
              Generate
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ModalAI
