import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Doctor.css'
import { Modal } from 'antd'
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie'

export default function Doctor() {

  const [data, setData] = useState([])
  const [timings, setTimings] = useState([])
  const [date, setDate] = useState("")
  const [select,setSelect] = useState("")

  const { id } = useParams()
  const navigate = useNavigate()

  const fetchData = () => {
    axios.get('https://hospitalmanagement-zkc1.onrender.com/data').then((res) => {
      const filter = res.data.filter((each) => each._id === id)
      setData(filter[0])
      setTimings(filter[0].DoctorTimings.sort((a, b) => a.id - b.id))
      const currentDate = new Date().getDate() + 1
      const month = new Date().getMonth() + 1
      const year = new Date().getFullYear()
      setDate(currentDate + "-" + month + "-" + year)
    }).catch((err) => console.log(err))
  }
  console.log(date)

  const handleModal = (time) => {
    navigate(`/form/${date}/${time}`)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='doctor-sch'>
      <div>
        <h1>Schedule your appointment</h1>
        <select onChange={(e) => setSelect(e.target.value)}>
          <option value={""}>Select</option>
          <option value={"tomorrow"}>Tomorrow</option>
        </select>
      </div>
    {select !== "" && <div className='d-flex gap-3 button-group'>
        {timings.map((eachtime) => {
          return <div key={eachtime.id}>
            {eachtime.status ? <button className='button-active' onClick={() => handleModal(eachtime.time)}>{eachtime.time}</button> : <button className='button-disabled' disabled>{eachtime.time}</button>}
          </div>
        })}
      </div>}
    </div>
  )
}
