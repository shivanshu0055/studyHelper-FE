import React, { useRef } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Note1 from '../icons/Note1'
import Pulley from '../icons/Pulley'
import Earth from '../icons/Earth'
import DNA from '../icons/DNA'
import Atom from '../icons/Atom'
import Books from '../icons/Books'
import ToolIcon from '../icons/ToolIcon'
import GridIcon from '../icons/GridIcon'
import { motion } from 'motion/react'
import {Bounce, toast,ToastContainer} from 'react-toastify'
const Signup = () => {

    const usernameRef1=useRef()
    const passwordRef1=useRef()
    const navigate=useNavigate()

    // console.log(import.meta.env.VITE_BACKEND_URL);
    
    async function handleSignup(){
        try {

            const res=await axios.post(import.meta.env.VITE_BACKEND_URL+"/auth/signup",{
            username:usernameRef1.current.value,
            password:passwordRef1.current.value
            })

            navigate("/signin")

        } catch (error) {
            // console.log(error.status);
            
            if(error.status==400){
                toast.warn('Username and password should be min 3 and 5 characters long respectively', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                theme: "light",
                transition: Bounce,
                });
                return  
            }


        }
        

        // if(res){
        // }

    }

   return (
    <div className='font-poppins h-screen w-full bg-[#d9d9d9] flex justify-center items-center'>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        />
        <motion.div animate={{x:[0,6,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='absolute h-18 w-18 top-14 left-12 lg:left-34 rotate-12 bg-[#f2cb77] rounded-2xl shadow-2xl md:h-20 md:w-20 xl:h-21 xl:w-21'> <Note1></Note1> </motion.div>
        <motion.div animate={{y:[0,8,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='absolute h-15 w-15 top-18 right-8 lg:right-34 -rotate-30 bg-[#ec75ec] p-2 rounded-2xl shadow-2xl md:h-20 md:w-20 xl:h-21 xl:w-21' > <Pulley></Pulley> </motion.div>
        <motion.div animate={{y:[0,10,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='absolute h-15 w-15 bottom-18 left-16 lg:left-34 bg-[#817ceb] rounded-2xl p-2 shadow-2xl md:h-20 md:w-20 xl:h-21 xl:w-21'> <Earth></Earth> </motion.div>
        <motion.div animate={{x:[0,10,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='absolute h-15 w-15 bottom-18 right-12 lg:right-34 bg-[#ec75ec] p-2 rounded-2xl shadow-2xl md:h-20 md:w-20 xl:h-21 xl:w-21'> <GridIcon></GridIcon> </motion.div>
        <motion.div animate={{x:[0,13,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='absolute h-15 w-15 top-9 bg-[#817ceb] rounded-2xl shadow-2xl md:h-20 md:w-20 xl:h-21 xl:w-21'> <Atom></Atom> </motion.div>
        <motion.div animate={{y:[0,14,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='absolute h-18 w-18 bottom-9  bg-[#f2cb77] rounded-2xl p-2 shadow-2xl md:h-20 md:w-20 xl:h-21 xl:w-21'> <Books></Books> </motion.div>
        <motion.div animate={{y:[0,14,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='absolute h-15 w-15 bottom-96 right-20 lg:right-44 xl:right-65 bg-[#817ceb] rounded-2xl p-2 hidden md:block shadow-2xl md:h-20 md:w-20 rotate-15 xl:h-21 xl:w-21'> <ToolIcon></ToolIcon> </motion.div>
        <motion.div animate={{y:[0,14,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='absolute h-15 w-15 bottom-99 left-20 lg:left-44 xl:left-65 bg-[#ec75ec] rounded-2xl p-2 hidden md:block shadow-2xl md:h-20 md:w-20 -rotate-10 xl:h-21 xl:w-21'> <DNA></DNA> </motion.div>
        <div className='h-fit lg:h- w-80 rounded-2xl bg-[#f0f0f0] px-3 shadow-2xl'> 
            <div className='h-11 flex justify-center my-5'>
                <img className='bg-transparent' src="https://static.vecteezy.com/system/resources/previews/009/665/468/non_2x/notes-illustration-3d-free-png.png" alt="" />
            </div>
            <div className='flex justify-center my-3 text-2xl font-semibold '>
                Signup
            </div>
            <div className='my-6'>
                <div className='text-sm'>
                    Username
                </div>
                <div>
                    <input ref={usernameRef1} placeholder='eg. Shivanshu' className='w-full mt-1 bg-gray-300 rounded-md text-xs p-1 focus:outline-1  focus:outline-gray-700 outline-1 outline-gray-400' type="text" />
                </div>
            </div>
            <div className='my-6'>
                <div className='text-sm'>
                    Password
                </div>
                <div>
                    <input ref={passwordRef1} placeholder='eg. password123' className='w-full mt-1 bg-gray-300 rounded-md text-xs p-1 focus:outline-1 focus:outline-gray-700 outline-1 outline-gray-400' type="text" />
                </div>
            </div>
            <div >
                <div onClick={handleSignup} className='w-fit cursor-pointer m-auto bg-[#f2cb77] px-7 py-1 mt-9 rounded-md '>
                    Signup
                </div>
            </div>
            <div>
                <div className='mt-6 mb-4 text-xs text-center'>
                    Already registered? <span onClick={()=>{navigate("/signin")}} className='underline cursor-pointer'>Signin</span>
                </div>
            </div>
        </div>

    </div>    
  )
}

export default Signup