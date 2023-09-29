import {Routes,Route} from 'react-router-dom'
import Home from '../components/Home/Home'
import Doctors from '../components/Doctors/Doctors'
import Doctor from '../components/Doctor/Doctor'
import Form from '../components/Form/Form'
import Login from '../components/Login/Login'
import Admin from '../components/AdminPanel/Admin'
import Adminschedules from '../components/AdminSchedules/Adminschedules'

export default function Routing(){
    return (
        <>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/doctors' element={<Doctors/>}/>
            <Route path='/doctors/:id' element={<Doctor/>}/>
            <Route path='/form/:date/:time' element={<Form/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/adminschedules/:id' element={<Adminschedules/>}/>
        </Routes>
        </>
    )
}