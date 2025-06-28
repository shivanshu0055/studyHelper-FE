import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MenuBar from './components/MenuBar'
import TextEditor from './pages/TextEditor'
import NoteCard from './components/NoteCard'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Layout from './components/Layout'
import Loading from './components/Loading'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>

        <Route path='/' element={<Layout/>}>
          <Route path="" element={<LandingPage/>}></Route>
          <Route path="home" element={<ProtectedRoute><HomePage/></ProtectedRoute> }></Route>
        </Route>
          <Route path="textEditor" element={<ProtectedRoute><TextEditor/></ProtectedRoute> }></Route>
      </Routes>
    </BrowserRouter> 
    
    {/* <Loading></Loading> */}
    {/* <HomePage></HomePage>
    {/* <Navbar></Navbar> */}
    </>
  )
}

export default App
