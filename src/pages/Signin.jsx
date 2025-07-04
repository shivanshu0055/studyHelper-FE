import React, { useRef, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {motion} from "motion/react"
import Note1 from '../icons/Note1'
import Books from '../icons/Books'
import Earth from '../icons/Earth'
import DNA from '../icons/DNA'
import Pulley from '../icons/Pulley'
import Atom from '../icons/Atom'
import Plane from '../icons/ToolIcon'
import ToolIcon from '../icons/ToolIcon'
import GridIcon from '../icons/GridIcon'
import {Bounce, toast,ToastContainer} from 'react-toastify'
import { useAuthStore } from '../store/useAuthStore'
import Loading from '../components/Loading'


const Signin = () => {

    const usernameRef1=useRef()
    const passwordRef1=useRef()
    const navigate=useNavigate()
    const login=useAuthStore((state)=>state.login)
    const [loading,setIsLoading]=useState(false)

    async function handleSignin(){

        try{
        setIsLoading(true)
        const res=await axios.post(import.meta.env.VITE_BACKEND_URL+"/auth/signin",{
            username:usernameRef1.current.value,
            password:passwordRef1.current.value
        })

        login(res.data.token,res.data.userID)

        navigate('/home')
        setIsLoading(false)
    }
    catch(e){
        setIsLoading(false)
        // console.log(e.status);
        // console.log(e.status)
        if(e.status==400){
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

        if(e.status==401){
            // console.log("Wrong Creds");
            toast.warn('Wrong Credentials', {
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

    }


  return (
    <div className='font-poppins h-screen w-full bg-[#d9d9d9] flex justify-center items-center'>
        {loading && <Loading></Loading>}
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
        <motion.div animate={{x:[0,6,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='inset-shadow-sm inset-shadow-white ring ring-white absolute h-18 w-18 top-[15%] left-[3%] sm:left-[10%]  rotate-12 bg-[#f2cb77] rounded-2xl shadow-2xl md:h-20 md:w-20 xl:h-21 xl:w-21'> <Note1></Note1> </motion.div>
        <motion.div animate={{y:[0,8,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='inset-shadow-sm inset-shadow-white ring ring-white absolute h-15 w-15 top-[15%] right-[4%] sm:right-[10%] -rotate-30 bg-[#ec75ec] p-2 rounded-2xl shadow-2xl md:h-20 md:w-20 xl:h-21 xl:w-21' > <Pulley></Pulley> </motion.div>
        <motion.div animate={{y:[0,10,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='inset-shadow-sm inset-shadow-white ring ring-white absolute h-15 w-15 bottom-[15%] left-[4%] sm:left-[10%] bg-[#817ceb] rounded-2xl p-2 shadow-2xl md:h-20 md:w-20 xl:h-21 xl:w-21'> <Earth></Earth> </motion.div>
        <motion.div animate={{x:[0,10,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='inset-shadow-sm inset-shadow-white ring ring-white absolute h-15 w-15 bottom-[15%] right-[4%] sm:right-[10%] bg-[#ec75ec] p-2 rounded-2xl shadow-2xl md:h-20 md:w-20 xl:h-21 xl:w-21'> <GridIcon></GridIcon> </motion.div>
        <motion.div animate={{x:[0,13,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='inset-shadow-sm inset-shadow-white ring ring-white absolute h-15 w-15 top-[7%] left-[50%] -translate-x-1/2 bg-[#817ceb] rounded-2xl shadow-2xl md:h-20 md:w-20 xl:h-21 xl:w-21'> <Atom></Atom> </motion.div>
        <motion.div animate={{y:[0,14,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='inset-shadow-sm inset-shadow-white ring ring-white absolute h-18 w-18 bottom-[7%] left-[50%] -translate-x-1/2 bg-[#f2cb77] rounded-2xl p-2 shadow-2xl md:h-20 md:w-20 xl:h-21 xl:w-21'> <Books></Books> </motion.div>
        <motion.div animate={{y:[0,14,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='inset-shadow-sm inset-shadow-white ring ring-white absolute h-15 w-15 bottom-[50%] right-[15%] bg-[#817ceb] rounded-2xl p-2 hidden md:block shadow-2xl md:h-20 md:w-20 rotate-15 xl:h-21 xl:w-21'> <ToolIcon></ToolIcon> </motion.div>
        <motion.div animate={{y:[0,14,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}} className='inset-shadow-sm inset-shadow-white ring ring-white absolute h-15 w-15 bottom-[50%] left-[15%] bg-[#ec75ec] rounded-2xl p-2 hidden md:block shadow-2xl md:h-20 md:w-20 -rotate-10 xl:h-21 xl:w-21'> <DNA></DNA> </motion.div>
        <div 
        style={{ boxShadow: '2px 3px 4px 1px gray' }}
        className='h-fit w-80 rounded-2xl bg-[#f0f0f0] px-3 shadow-2xl'> 
            <div className='h-11 flex justify-center my-5'>
                <img className='bg-transparent' src="https://static.vecteezy.com/system/resources/previews/009/665/468/non_2x/notes-illustration-3d-free-png.png" alt="" />
            </div>
            <div className='flex justify-center my-3 text-2xl font-semibold '>
                Signin
            </div>
            <div className='my-6'>
                <div className='text-sm'>
                    Username
                </div>
                <div>
                    <input ref={usernameRef1} placeholder='eg. Shivanshu' className='text-gray-600 w-full mt-1 bg-gray-300 rounded-md text-xs p-1 focus:outline-1  focus:outline-gray-700 outline-1 outline-gray-400' type="text" />
                </div>
            </div>
            <div className='my-6'>
                <div className='text-sm'>
                    Password
                </div>
                <div>
                    <input ref={passwordRef1} placeholder='eg. password123' className='text-gray-600 w-full mt-1 bg-gray-300 rounded-md text-xs p-1 focus:outline-1 focus:outline-gray-700 outline-1 outline-gray-400' type="text" />
                </div>
            </div>
            <div >
                <div onClick={handleSignin} className='w-fit cursor-pointer m-auto bg-[#f2cb77] px-7 py-1 mt-9 rounded-md '>
                    Signin
                </div>
            </div>
            <div>
            <div>
                <div className='mt-6 mb-4 text-xs text-center'>
                    Haven't registered yet? <span onClick={()=>{navigate("/signup")}} className='underline cursor-pointer'>Signup</span>
                </div>
            </div>
            </div>
        </div>

    </div>    
  )
}

export default Signin