import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Doctor.css'
import { Modal } from 'antd'
import TextField from '@mui/material/TextField';

export default function Doctor() {

  const [data, setData] = useState([])
  const [timings, setTimings] = useState([])
  const [name, setName] = useState("")
  const [age, setAge] = useState('')
  const [problem, setProblem] = useState('')
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')

  const { id } = useParams()

  const fetchData = () => {
    axios.get('http://localhost:4000/data').then((res) => {
      const filter = res.data.filter((each) => each._id === id)
      setData(filter[0])
      console.log(filter)
      setTimings(filter[0].DoctorTimings.sort((a, b) => a.id - b.id))


    }).catch((err) => console.log(err))
  }

  const handleMobile = (e) => {
    setMobile(e.target.value)
    if (e.target.value.length > 10 || e.target.value.length < 10) {
      console.log("entter valid")
      setError("Enter valid number")
    } else {
      setError("")
    }
  }
  // console.log("mobile: " + mobile)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mobile.length > 10 || mobile.length < 10) {
      alert("enter valid mobile")
    }
  }

  const handleModal = (time) => {
    Modal.success({
      content: <div>
        <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
          <label>Time</label>
          <input value={time} disabled className='form-control'/>
          <TextField type='text' id="standard-basic" label="Patient Name" variant="standard" />
          <TextField type='number' id="standard-basic" label="Age" variant="standard" />
          <TextField type='text' id="standard-basic" label="Problem" variant="standard" />
          <TextField type='tel' onChange={handleMobile} id="standard-basic" label="Mobile Number" variant="standard" />
          <button type="Submit" className="btn btn-success">Submit</button>
        </form>
      </div>,
      centered: true,
      maskClosable: true,
      footer: null
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='doctor-sch'>
      <div>
        <h1>Schedule your appointment</h1>
        <select>
          <option disabled>Select</option>
          <option>Tomorrow</option>
        </select>
      </div>
      <div className='d-flex gap-3 button-group'>
        {timings.map((eachtime) => {
          return <div key={eachtime.id}>
            {eachtime.status ? <button onClick={() => handleModal(eachtime.time)}>{eachtime.time}</button> : <button disabled>{eachtime.time}</button>}
          </div>
        })}
      </div>
    </div>
  )
}
