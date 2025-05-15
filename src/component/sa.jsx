
import { useState } from 'react';
import React from 'react'
import {  Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Sa = () => {
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
                const user = response.data.user;
                localStorage.setItem("user", JSON.stringify(user));

                // Check if the logged-in user is admin
                if (user.username && user.username.toLowerCase() === 'admin') {
                    navigate("/Addproducts"); // Redirect admin to Addproducts page
                } else {
                    navigate("/"); // Redirect other users to the homepage
                }
            } else {
                setError(response.data.error)
            }
            
            

        }
        catch(error){
            setLoading("")
            // It's generally better to display a generic error or a specific one from the server response
            setError(error.response?.data?.error || "Sign-in failed. Please try again.");
            
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
                    <Link className="m-4 mb-5 btn btn-dark shadow-lg" to="/">
                                <i className="fas fa-arrow-left"></i> Back to Products
                            </Link>
                    {/* Corrected Link: Points to the actual signup page */}
                    
                </div>

            </div>
    )
}
export default Sa;