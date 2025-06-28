import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ModalPDF = ({ isOpen,setIsOpen,PDFContent }) => {

    const [summary,setSummary]=useState('')

    useEffect(()=>{
        async function getSummary(){
            const res=await axios.post(import.meta.env.VITE_BACKEND_URL,'/user/getPlainResponse',{
                query:"Generate extensive Summary of the content provided "+PDFContent
            })
            setSummary(res.data.response)
        }
        getSummary()
    },[])

  return (
    <div className='fixed top-0 h-screen w-full bg-white/10 backdrop-blur-lg z-10' >
        {summary}
    </div>
  )
}

export default ModalPDF