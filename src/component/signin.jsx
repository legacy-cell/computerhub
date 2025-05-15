
import { useState } from 'react';
import React from 'react'
import {  Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading,setLoading] = useState("")
    const [error, setError] = useState("")
    const navigate= useNavigate()

    
    const submit = async (e) => {
        e.preventDefault()
        setLoading("please wait as we log you in")
        try{
            const data = new FormData();
            data.append('email', email);
            data.append('password', password);
            
            const response = await axios.post(
                "https://kangethevictor.pythonanywhere.com/api/signin",
                data
            )
            setLoading("")
            
            if(response.data.user){
                localStorage.setItem("user",JSON.stringify(response.data.user))
                navigate("/")
            }
            else{
                setError(response.data.error)
            }
            
            

        }
        catch(error){
            setLoading("")
            setError(error.error)
            
        }
    }

    return(
            <div className="row justify-content-center mt-5" >
                <div className="col-md-6 card shadow p-4">
                    <h2>signin</h2>
                    {loading}
                    {error}
                    <form onSubmit={submit}>
                        <input
                        type='email'
                        className='form-control'
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        <br />
                        <input
                        type='password'
                        className='form-control'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <br />
                        <button type='submit' className='btn btn-primary'>Sign in</button>
                    </form>
                    <p>Don't have an account?</p>
                    <Link  to="/signup">Signup</Link>

                </div>

            </div>
    )
}
export default Signin;