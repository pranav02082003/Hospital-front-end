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
        <div className='heading'>Hospital Management</div>
        <b>To check the doctors availabilty and book <br></br> an appointment click below</b>
        <Link to={'/doctors'}><button id='hello' className='home-button'>View All Doctors</button></Link>
        
    </div>
  )
}
