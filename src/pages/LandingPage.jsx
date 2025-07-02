import React from 'react'
import { useNavigate } from 'react-router-dom'
import {motion} from 'motion/react'

const LandingPage = () => {

    const navigate=useNavigate()

  return (
    <>
    <div
      className="min-h-screen bg-gray-100 border-gray-300 border-t-2 font-poppins"
      style={{
        backgroundImage: "radial-gradient(#d1d5db 1.2px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <motion.div animate={{y:[0,4,0],x:[0,4,0]}} transition={{repeat:Infinity,ease:"easeInOut",duration:2}} className='absolute w-24 top-30 left-6 rounded-xl rotate-6 border border-gray-500/70'><img className='rounded-xl' src="pngtree-school-note-doodle-png-image_6384461-removebg-preview.png" alt="" /></motion.div>
      <motion.div animate={{y:[0,4,0],x:[0,4,0]}} transition={{repeat:Infinity,ease:"easeInOut",duration:2}} className='absolute w-38 bottom-12 left-8 rounded-xl rotate-8 border border-gray-500/70'><img className='rounded-xl' src="physics-removebg-preview.png" alt="" /></motion.div>
      <motion.div animate={{y:[0,4,0],x:[0,4,0]}} transition={{repeat:Infinity,ease:"easeInOut",duration:2}} className='absolute w-23 top-30 right-8 rounded-xl -rotate-8 border border-gray-500/70'><img className='rounded-xl' src="chemistry.png" alt="" /></motion.div>
      <motion.div animate={{y:[0,4,0],x:[0,4,0]}} transition={{repeat:Infinity,ease:"easeInOut",duration:2}} className='absolute w-23 bottom-12 right-8 rounded-xl -rotate-8 border border-gray-500/70'><img className='rounded-xl' src="sports-removebg-preview.png" alt="" /></motion.div>      
    <div className='w-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
    <div className=' w-46 mx-auto rounded-xl border-2 border-black/50 shadow-black/60 shadow-lg'>
      <img className='rounded-xl h-[100%] w-[100%]' src="image.png" alt="" />
    </div>
      <div className='text-3xl text-center font-medium my-8'>
      Your intelligent study workspace — write, ask, and understand your notes like never before.
      </div>
      <div className='text-lg text-center font-medium text-gray-500'>
        AI-powered rich text editor with instant Q&A on your content. All in one beautiful interface
      </div>
    </div>

</div>
    </>
  )
}

export default LandingPage