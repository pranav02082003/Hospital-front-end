import {Routes,Route} from 'react-router-dom'
import Home from '../components/Home/Home'
import Doctors from '../components/Doctors/Doctors'

export default function Routing(){
    return (
        <>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/doctors' element={<Doctors/>}/>
        </Routes>
        </>
    )
}