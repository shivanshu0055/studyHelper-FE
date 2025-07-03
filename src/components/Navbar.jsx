import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const isAuthenticated=useAuthStore((state)=>state.isAuthenticated)
    const navigate=useNavigate()   
    const logout=useAuthStore((state)=>state.logout)

  return (
    <div className=' h-20 flex items-center px-4 md:px-8 justify-between'>
        <div className=' w-32 lg:w-36 rounded-xl border border-black/40 '>
        <img className='rounded-xl h-[100%] w-[100%]' src="image.png" alt="" />
        </div>
        <div className='flex gap-2'>
            {!isAuthenticated && <div onClick={()=>navigate("/signup")} className='font-semibold cursor-pointer px-3 py-2 md:px-5   rounded-4xl w-fit bg-black text-white'>
                Signup
            </div>}
            {!isAuthenticated && <div onClick={()=>navigate("/signin")} className='font-semibold  cursor-pointer px-4 py-2 md:px-5 rounded-4xl w-fit bg-black text-white'>
                Signin
            </div>}
            {isAuthenticated && <div onClick={()=>{
                localStorage.removeItem('auth-storage')
                logout()
                navigate("/")
            }} className='font-semibold cursor-pointer px-3 py-2 md:px-5 rounded-4xl  w-fit bg-black text-white'>
                Logout
            </div>}
        </div>
    </div>
  )
}

export default Navbar