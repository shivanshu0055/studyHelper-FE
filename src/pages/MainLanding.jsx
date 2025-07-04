import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLanding = () => {

    const navigate=useNavigate()

  return (
    <div className='font-poppins w-full bg-gray-100'>
        <Navbar></Navbar>
        <div className='h-[100vh] md:h-[107vh] xl:h-[130vh] overflow-hidden border-b-2 border-b-black/10'>
        <div className='px-4 mx-auto text-center pt-35 '>
            <div className='bg-gray-200 text-gray-700 mb-5 rounded-xl w-fit mx-auto px-3 py-1 inset-shadow-sm inset-shadow-blue-200 ring ring-blue-400/50'>
                Welcome to SmartNote ⟡
            </div>
        <div className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mx-auto'>    
        <span className='text-black/60'> Smarter </span>Notes. <br /> <span className='text-black/60'> Sharper </span> Minds.
        </div>
        <div className='text-base my-6 text-gray-600 w-[80%] md:w-[70%] lg:w-[65%] xl:w-[50%] mx-auto'>
            Take notes with an AI-powered editor and ask questions directly from them — your personal study assistant, reimagined.
        </div>
        <div onClick={()=>{
            navigate("/home")
        }} className='px-2 py-1.5 md:text-lg bg-black w-fit mx-auto text-white rounded-xl
         inset-shadow-sm inset-shadow-blue-200 cursor-pointer ring-2 ring-blue-400/50'>
            Get Started ✦
        </div>
        </div>
        <div className='mx-auto w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] border-4 md:border-8 border-gray-300 my-10 rounded-2xl'>
            <img className='rounded-2xl' src="Homepage.png" alt="" />
        </div>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default MainLanding