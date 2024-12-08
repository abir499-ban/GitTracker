"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { defaultGitHubRepository, defaultUserFetched } from '../../../../constants/constant'
import { AtSign } from 'lucide-react'

const page = () => {
  const [User, setUser] = useState<UserFetched>(defaultUserFetched)
  const[bookMarkedRepos, setbookMarkedRepos] = useState<FetchRepo[]>([defaultGitHubRepository])
  useEffect(() => {
    const fetchUser = async () => {
      const result = await axios.get('/api/users/profile');
      const response = await axios.post(`/api/users/me?id=${result.data.message.id}`);
      setUser(result.data.message as UserFetched)
      

    }
    fetchUser();
  }, [])
  return (
    <>
    <div className='justify-center align-center '>
        <div className='flex flex-row gap-2 text-center justify-center item-center'>
        <p>{User.name}</p><AtSign color="#1e0ff5" strokeWidth={1} /><p>{User.email}</p>
        </div>

        <div className='py-20'>
          <h1 className='text-5xl text-center font-mono underline underline-offset-2'>My BookMarked Repositories:</h1>
        </div>
    </div>
    </>
  )
}

export default page