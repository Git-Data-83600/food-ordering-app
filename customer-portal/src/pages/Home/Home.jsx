import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Navbar />
      <div className='container'>
        {/* placeholder to load the child components */}
        <Outlet />
      </div>
    </div>
  )
}

export default Home
