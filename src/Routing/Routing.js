import {Routes,Route} from 'react-router-dom'
import Home from '../components/Home/Home'
import Doctors from '../components/Doctors/Doctors'
import Doctor from '../components/Doctor/Doctor'

export default function Routing(){
    return (
        <>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/doctors' element={<Doctors/>}/>
            <Route exact path='/doctors/:id' element={<Doctor/>}/>
        </Routes>
        </>
    )
}