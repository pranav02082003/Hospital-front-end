import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../url'
import { useParams } from 'react-router-dom'

export default function Adminschedules() {


    const [timings, setTimings] = useState([])

    const params = useParams()
    const { id } = params

    const fetchData = () => {
        axios.get(`${baseUrl}/data`).then((res) => {
            // console.log(res)
            const filter = res.data.filter((each) => each._id === id)
            //   console.log(filter)
            setTimings(filter[0].DoctorTimings.sort((a, b) => a.id - b.id).filter((each) => each.status === false))
        }).catch((err) => console.log(err))
    }


    const handleStatus = (obj) => {
        setTimings(timings.map((each) => {
            if (each.id === obj.id) {
                return { ...each, status: true }
            } else {
                return each
            }
        }))
        obj.status = true
        const data = {
            obj,
            id
        }
        console.log(data)

        axios.post(`${baseUrl}/update`, data).then(res => {
            console.log(res)
            alert("changed")
        })
            .catch((err) => console.log(err))
    }

    console.log(timings)
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            {timings.map((each) => {
                return <div key={each.id}>
                    <b>Time : </b><span>{each.time}</span>
                    <span className='d-flex gap-3'>status :  <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={each.status === false} onChange={() => handleStatus(each)} />
                    </div></span>
                </div>
            })}
        </div>
    )
}
