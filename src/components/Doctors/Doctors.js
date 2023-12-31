import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Doctors.css'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import { baseUrl } from '../../url'

export default function Doctors() {

  const [doctors,setDoctors]  =useState([])

  const navigate = useNavigate();

  const fetchData = () => {
    axios.get(`${baseUrl}/data`).then((res) => {
      setDoctors(res.data)
    }).catch((err) => console.log(err))
  }

  const changePage = (each) => {
    if (each.Available) {
      navigate(`/doctors/${each._id}`)
      Cookies.set("active_doctor",each._id)
    }else{
      alert("Doctor not available")
    }
   
  }
  
  useEffect(() => {
    fetchData()

  },[])

  return (
    <div className='doctor-home'>
      {doctors.map((each)=> {
        return <div className='doctor-card' key={each._id} >
          <img src={each.image} alt={each.name}/>
          <span>Name : {each.name}</span>
          <span>Desgnation : {each.Designation}</span>
          <span>Qualifications : MBBS</span>
          {each.Available ? <span className='green-dot'></span> : <span className='red-dot'></span>}
          <button className='Schedulestyle' onClick={() => changePage(each)}>View Schedules</button>
        </div>
      })}
    
    </div>
  )
}
