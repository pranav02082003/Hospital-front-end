import React,{useEffect, useState} from 'react'
import './Home.css'
import { Link,useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Home() {

  const [token,setToken] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const jwttoken  = Cookies.get("jwt_token")
    setToken(jwttoken)
    console.log(jwttoken)
  },[])
  console.log("Token : "+token)

  return (
    <div className='homepage'>
        <div className='d-flex'>
            <span className='medical'>Medical</span>
            <span className='services'>Services</span>
        </div>
        <div className='heading'>Hospital Management</div>
        <b>To check the doctors availabilty and book <br></br> an appointment click below</b>
        <Link to={'/doctors'}><button id='hello' className='home-button'>View All Doctors</button></Link>
        {!token ? <button className='login-button' onClick={() => navigate('/login')}>Admin Login</button> : <div className='d-flex'><button className='login-button'>Admin Panel</button><button className='btn btn-danger'>Logout</button></div>}
    </div>
  )
}
