import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Doctor() {

    const [data,setData] = useState([])

    const {id} = useParams()
    console.log(id)

    const fetchData = () => {
        axios.get('http://localhost:4000/data').then((res) => {
          console.log(res.data)
          const filter = res.data.filter((each) => each._id === id)
          setData(filter)

        }).catch((err) => console.log(err))
      }

      useEffect(() => {
        fetchData()
      },[])

  return (
    <div>
        {data.map((each) => {
            return <div key={each._id}>
                <p>{each.name}</p>
            </div>
        })}
    </div>
  )
}
