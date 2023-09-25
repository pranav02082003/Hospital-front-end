import React, { useState } from 'react'
import "./Login.css"
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import { baseUrl } from '../../url';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username,setUsername] = useState("")
    const [password,setPassword]  =useState("")
    const [error,setError] = useState("")

    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            username,
            password
        }
        axios.post(`${baseUrl}/login`,data).then((res) => {
            console.log(res)
            if (res.data.token) {
                const {token} = res.data
                Cookies.set("jwt_token",token,1)
                navigate('/',{replace:true})
            }
        }).catch((err) => {
            console.log(err)
            if (err.response.status === 404) {
                setError(err.response.data)
            }
        })
    }

    return (
        <div className='Login-edit'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h1>Admin Login</h1>
                <TextField type='text' id="Username" label="Username" variant="standard" value={username} required onChange={(e) => setUsername(e.target.value)} />
                <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <div>{error.length > 0 && <span>{error}</span>}</div>
                <button type="submit" className="btn btn-outline-success">Login</button>
            </form>
        </div>

    )
}
