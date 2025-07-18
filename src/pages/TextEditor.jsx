import React, { useState } from 'react'
import MenuBar from '../components/MenuBar'
import Modal from '../components/ModalAI'
import ModalSave from '../components/ModalSave'
import ModalAskAI from '../components/ModalAskAI'

const TextEditor = () => {

  const [isOpenAI,setIsOpenAI]=useState(false)
  const [isOpenSave,setIsOpenSave]=useState(false)
  const [isOpenAskAI,setIsOpenAskAI]=useState(false)

  return (
    <div className='min-h-screen text-gray-300 w-full bg-textEditor-500 flex justify-center'>
    <Modal isOpen={isOpenAI} setIsOpen={setIsOpenAI}></Modal>
    <ModalSave isOpen={isOpenSave} setIsOpen={setIsOpenSave}></ModalSave>
    <ModalAskAI isOpen={isOpenAskAI} setIsOpen={setIsOpenAskAI}></ModalAskAI>
    <MenuBar 
    isOpenSave={isOpenSave} 
    setIsOpenSave={setIsOpenSave} 
    isOpenAI={isOpenAI} 
    setIsOpenAI={setIsOpenAI}
    isOpenAskAI={isOpenAskAI}
    setIsOpenAskAI={setIsOpenAskAI}
    ></MenuBar>
    </div>
  )
}

export default TextEditor