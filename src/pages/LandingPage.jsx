import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

    const navigate=useNavigate()

  return (
    <>
    <button onClick={()=>navigate('/signup')}>Signup</button>
    <button onClick={()=>navigate('/signin')}>Signin</button>
    </>
  )
}

export default LandingPage