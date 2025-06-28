import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const isAuthenticated=useAuthStore((state)=>state.isAuthenticated)
    const navigate=useNavigate()   
    const logout=useAuthStore((state)=>state.logout)

  return (
    <div className=' h-20 flex items-center px-4 md:px-8 justify-between'>
        <div className='h-10 w-fit flex'>
            <img src="https://static.vecteezy.com/system/resources/previews/009/665/468/non_2x/notes-illustration-3d-free-png.png" alt="" />
            <div className='flex items-center'>
            <div className='ml-3 text-xl md:text-2xl font-bold'>SuperMind</div>
            </div>
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