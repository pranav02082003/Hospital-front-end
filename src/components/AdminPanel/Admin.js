import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Admin.css'
import { baseUrl } from '../../url'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export default function Admin() {

    const [doctors, setDoctors] = useState([])
    const [status, setStatus] = useState(false)
    const [appointment, setAppointment] = useState([])

    const navigate = useNavigate();

    const handleStatus = (id) => {
        setDoctors(doctors.map((each) => {
            if (each._id === id) {
                // console.log(each.Available) //api call
                const data = {
                    availability: !each.Available,
                    id: id
                }
                axios.put(`${baseUrl}/change_availability`, data).then((res) => {
                    alert(res.data)
                }).catch((err) => console.log(err))
                return { ...each, Available: !each.Available }
            } else {
                return each
            }
        }))
    }


    const fetchData = () => {
        axios.get(`${baseUrl}/data`).then((res) => {
            setDoctors(res.data)
            // console.log(res.data)
            setAppointment(res.data.map((each) => {
                return { doctor: each.name, appointments: [...appointment, ...each.appointments] }
            }))

        }).catch((err) => console.log(err))
    }
    useEffect(() => {
        const token = Cookies.get("jwt_token")
        if (!token) {
            navigate('/')
        }
        fetchData()
    }, [])

    console.log(appointment)

    return (
        <div>


            <div className='d-flex justify-content-center flex-wrap gap-5'>
                {doctors.map((each) => {
                    return <div className='doctor-card1' key={each._id} >
                        <img src={each.image} alt={each.name} />
                        <span>Name : {each.name}</span>
                        <span>Desgnation : {each.Designation}</span>
                        <span>Fee : 100/-</span>
                        <span>Qualifications :
                        </span>
                        <span className='d-flex gap-3'>Change availability :  <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={each.Available} onChange={() => handleStatus(each._id)} />
                        </div></span>
                        {each.Available ? <span className='green-dot1'></span> : <span className='red-dot1'></span>}
                        <button className='Schedulestyle1'>View Schedules</button>
                    </div>
                })}

            </div>
            <div className='d-flex justify-content-center mt-5 mb-5'>
                {status ? <button className='btn btn-danger' onClick={() => setStatus(false)}>Close Appointments</button> : <button className='btn btn-success' onClick={() => setStatus(true)}>View Appointments</button>}
            </div>
            {status &&<div className='d-flex flex-column align-items-center flex-wrap gap-3 text-center'>
                {appointment.map((each) => {
                    return <div className='doctors-cards'>
                        <h1> Doctor name : {each.doctor}</h1>
                        {console.log(each)}
                        {each.appointments.length > 0 ? 
                            <div className='d-flex justify-content-center gap-5'>
                                {each.appointments.map((eachtime) => {
                                    return <div className='appointemnt-card'>
                                        <p><b>Patient name :</b> {eachtime.name}</p>
                                        <p><b>Patient age :</b> {eachtime.age}</p>
                                        <p><b>Patient problem :</b>{eachtime.problem}</p>
                                        <p><b>Patient mobile :</b> {eachtime.mobile}</p>
                                        <p><b>Time :</b> {eachtime.time}</p>
                                        <div><button className='btn btn-success'>completed</button></div>
                                    </div>
                                })}
                            </div> : <div>No Appointments...</div>
                        }
                    </div>
                })}
            </div>}
        </div>
    )
}
