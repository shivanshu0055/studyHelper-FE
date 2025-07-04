import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import Underline from '../icons/Underline'

const Navbar = () => {

    const isAuthenticated=useAuthStore((state)=>state.isAuthenticated)
    const navigate=useNavigate()   
    const logout=useAuthStore((state)=>state.logout)

  return (
    <div className='absolute w-full h-20 flex items-center px-4 md:px-8 justify-between border-b border-b-gray-500/50'>
        <div className='text-2xl md:text-3xl'>
        <span className='font-bold'>Smart</span><span className='font-bold text-gray-400'> Note</span>
        <Underline></Underline>
        </div>
        <div className='flex gap-2'>
            {!isAuthenticated && <div onClick={()=>navigate("/signup")} className='inset-shadow-sm inset-shadow-white ring-2 ring-white font-semibold cursor-pointer px-3 py-2 md:px-5   rounded-4xl w-fit bg-black text-white'>
                Signup
            </div>}
            {!isAuthenticated && <div onClick={()=>navigate("/signin")} className='inset-shadow-sm inset-shadow-white ring-2 ring-white font-semibold  cursor-pointer px-4 py-2 md:px-5 rounded-4xl w-fit bg-black text-white'>
                Signin
            </div>}
            {isAuthenticated && <div onClick={()=>{
                localStorage.removeItem('auth-storage')
                logout()
                navigate("/")
            }} className='inset-shadow-sm inset-shadow-white ring-2 ring-white font-semibold cursor-pointer px-3 py-2 md:px-5 rounded-4xl  w-fit bg-black text-white'>
                Logout
            </div>}
        </div>
    </div>
  )
}

export default Navbar