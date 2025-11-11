import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/common/Navbar/Navbar'
import Footer from './components/common/Footer/Footer'
import { ToastContainer } from 'react-toastify'

export default function Root() {
  return (
    <>
    <div className='bg-base-200'>
    <div className="max-w-7xl mx-auto min-h-screen bg-base-200">
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>
    <Footer></Footer>
    <ToastContainer />
    </div>
    </>
  )
}
