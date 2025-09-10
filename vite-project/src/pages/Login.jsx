import React from 'react'
import { useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/ContextProvider';
import { toast } from "react-toastify";
function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const {login}=useAuth()
    const navigate=useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const response=await axios.post('https://pocket-notes-2ia2.onrender.com/api/auth/login',{email,password});
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token",response.data.token)
                 toast.success("✅ You have successfully logged in!");
                navigate("/")
            }
        }catch(error){
          toast.error("❌ Login failed, please check your credentials");
            console.log(error.message);
        }
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="border border-gray-300 shadow-md p-6 w-80 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        
        {/*focus:outline-none → removes ugly default blue outline

focus:ring-2 focus:ring-teal-400 → adds a nice teal glow when focused

focus:border-transparent → hides the border when ring is active*/}
        <div className="mb-4">
            <label htmlFor='email'className='block text-gray-700'>Email</label>
            <input type="email" placeholder='Enter Email'
            value={email}
     onChange={(e)=>(setEmail(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"/>
        </div>
        <div className="mb-4">
            <label htmlFor='password'className='block text-gray-700'>Password</label>
            <input type="password" placeholder='Enter the password'
            value={password}
     onChange={(e)=>(setPassword(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"/>
        </div>
        < div className="mb-4">
            <button type="submit" className='w-full bg-teal-600 text-white py-2 rounded-lg'>Login</button>
            <p className='text-center'>New User? <Link className='text-blue-500' to="/register">Signup</Link>
            </p> 
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login;

