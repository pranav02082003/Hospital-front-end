import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Doctor.css'

export default function Doctor() {

  const [data, setData] = useState([])
  const [timings, setTimings] = useState([])

  const { id } = useParams()
  console.log(id)

  const fetchData = () => {
    axios.get('http://localhost:4000/data').then((res) => {
      const filter = res.data.filter((each) => each._id === id)
      setData(filter[0])
      console.log(filter)
      setTimings(filter[0].DoctorTimings.sort((a, b) => a.id - b.id))


    }).catch((err) => console.log(err))
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
            {eachtime.status ? <button>{eachtime.time}</button> : <button disabled>{eachtime.time}</button>}
          </div>
        })}
      </div>
    </div>
  )
}
