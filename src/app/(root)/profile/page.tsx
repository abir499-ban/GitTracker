"use client"
import React, { useEffect } from 'react'
import axios from 'axios'

const page = () => {
    
    useEffect(()=>{
        const fetchUser = async() =>{
            const result = await axios.get('/api/users/profile');
            console.log(result.data.message);
        }
        fetchUser();
    }, [])
  return (
    <div>Profile</div>
  )
}

export default page