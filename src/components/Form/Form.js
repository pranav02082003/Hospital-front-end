import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import './Form.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { baseUrl } from '../../url'

export default function Form() {

    const [name, setName] = useState("")
    const [age, setAge] = useState('')
    const [problem, setProblem] = useState('')
    const [mobile, setMobile] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { time, date } = useParams()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const activeDoctor = Cookies.get("active_doctor")

        const postData = {
            id: activeDoctor,
            data: {
                name,
                age,
                problem,
                mobile,
                time,
                date
            }

        }

        if (name === "" || age === "" || problem === "") {
            setError("All fields are required")
        } else {
            if (mobile.length > 10 || mobile.length < 10) {
                setError("enter valid mobile")
            } else {
                setError("")
                axios.post(`${baseUrl}/appointments`, postData).then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        alert("Booked Successfully")
                        navigate('/')
                    }
                })
                    .catch((err) => console.log(err))
            }
        }
    }


    return (
        <div className='form-container'>
            <form className='d-flex flex-column gap-3 form-card' onSubmit={handleSubmit}>
                <label>Date</label>
                <input value={date} disabled className='form-control' />
                <label>Time</label>
                <input value={time} disabled className='form-control' />
                <TextField type='text' onChange={(e) => setName(e.target.value)} id="standard-basic" label="Patient Name" variant="standard" />
                <TextField type='number' onChange={(e) => setAge(e.target.value)} id="standard-basic" label="Age" variant="standard" />
                <TextField type='text' onChange={(e) => setProblem(e.target.value)} id="standard-basic" label="Problem" variant="standard" />
                <TextField type='tel' onChange={(e) => setMobile(e.target.value)} id="standard-basic" label="Mobile Number" variant="standard" />
                <button type="Submit" className="btn btn-success">Submit</button>
                {error.length > 0 && <b className='text-danger'>{error}</b>}
                {success.length > 0 && <b className='text-success'>{success}</b>}
            </form>
        </div>
    )
}
