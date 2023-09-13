import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Doctors.css'
import {useNavigate} from 'react-router-dom'

export default function Doctors() {

  const [doctors,setDoctors]  =useState([])

  const navigate = useNavigate();

  const fetchData = () => {
    axios.get('http://localhost:4000/data').then((res) => {
      console.log(res.data)
      setDoctors(res.data)
    }).catch((err) => console.log(err))
  }

  const changePage = (each) => {
    navigate(`/doctors/${each._id}`)
  }
  
  useEffect(() => {
    fetchData()

  },[])

  return (
    <div className='doctor-home'>
      {doctors.map((each)=> {
        return <div className='doctor-card' key={each._id} onClick={() => changePage(each)}>
          <img src={each.image} alt={each.name}/>
          <span>Name : {each.name}</span>
          <span>Desgnation : {each.Designation}</span>
        </div>
      })}
    
    </div>
  )
}
