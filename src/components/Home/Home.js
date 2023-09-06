import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='homepage'>
        <div className='d-flex'>
            <span className='medical'>Medical</span>
            <span className='services'>Services</span>
        </div>
        <h1>Hospital Management</h1>
        <Link to={'/doctors'}><button id='hello' className='home-button'>View All Doctors</button></Link>
        
    </div>
  )
}
