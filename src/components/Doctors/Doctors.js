import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Doctors() {

  const [doctors,setDoctors]  =useState([])

  const fetchData = () => {
    axios.get('http://localhost:4000/data').then((res) => {
      console.log(res.data)
      setDoctors(res.data)
    }).catch((err) => console.log(err))
  }
  
  useEffect(() => {
    fetchData()

  },[])

  return (
    <div>
      {doctors.map((each)=> {
        return <div>
          <img src={each.image} alt={each.name}/>
          <p>{each.name}</p>
          <span>{each.Designation}</span>
        </div>
      })}
    </div>
  )
}
