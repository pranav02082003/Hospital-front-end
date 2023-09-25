import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Admin.css'

export default function Admin() {

    const [doctors, setDoctors] = useState([])

    const handleStatus = (id) => {
        setDoctors(doctors.map((each) => {
            if (each._id === id) {
                // console.log(each.Available) //api call
                const data = {
                    availability:!each.Available,
                    id:id
                }
                axios.put('https://hospitalmanagement-zkc1.onrender.com/change_availability',data).then((res) => {
                    alert(res.data)
                }).catch((err) => console.log(err))
                return { ...each, Available: !each.Available }
            } else {
                return each
            }
        }))
    }


    const fetchData = () => {
        axios.get('https://hospitalmanagement-zkc1.onrender.com/data').then((res) => {
            setDoctors(res.data)
            console.log(res.data)
        }).catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchData()

    }, [])
    return (
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
    )
}
