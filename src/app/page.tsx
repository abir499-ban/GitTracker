"use client"

import React from 'react'
import Dashboard from '@/components/shared/Dashboard'
import {useSession} from '@/hooks/useSession'

const page = () => {
  const {status , user} = useSession()
  
  return (
    <>
      <p>Status : {status}</p>
      <p>User : {user?.name}</p>
      <Dashboard />

    </>
  )
}

export default page