import React from 'react'
import { useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
function Signup() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const response=await axios.post('http://localhost:5000/api/auth/register',{name,email,password});
            if(response.data.success){
               toast.success("🎉 Signup successful! Please login.");
              navigate("/login")
            }
          }catch (error) {
  console.log("Full error response:", error.response); // debug

  const data = error.response?.data;

  if (data?.alreadyExist) {
    // User already exists
    toast.info("⚠️ User already exists. Please login.");
    navigate("/login"); // redirect to login page
  } else {
    // Any other error
    toast.error(data?.message || "Signup failed");
  }
}


    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="border border-gray-300 shadow-md p-6 w-80 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor='name' className='block text-gray-700'>Name</label>
            <input type="text" placeholder='Enter Name'
     value={name}
     onChange={(e)=>(setName(e.target.value))}
     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"/>
        </div>

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
            <button type="submit" className='w-full bg-teal-600 text-white py-2 rounded-lg'>Signup</button>
            <p className='text-center'>Already Have Account? <Link className='text-blue-500' to="/login">Login</Link>
            </p> 
        </div>
      </form>
      </div>
    </div>
  )
}

export default Signup;
