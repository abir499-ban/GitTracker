"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { defaultGitHubRepository, defaultUserFetched } from '../../../../constants/constant'
import { AtSign } from 'lucide-react'
import { getData } from '@/utils/firestore'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  const [User, setUser] = useState<UserFetched>(defaultUserFetched)
  const [bookMarkedRepos, setbookMarkedRepos] = useState<FetchRepo[]>([])
  useEffect(() => {
    const fetchUser = async () => {
      const result = await axios.get('/api/users/profile');
      const response = await axios.post(`/api/users/me?id=${result.data.message.id}`);
      const user: UserFetched = response.data.message
      setUser(user)

      // Fetch all bookmarked repositories in parallel
      const reposPromises = user.bookMarkedNumbers.map((repoid) =>
        getData(String(repoid))
      );
      const fetchedRepos = await Promise.all(reposPromises);

      // Extract the first repository from each fetch result
      const repos = fetchedRepos.map((repo) => repo[0]); // Assuming `repo` is an array and you need the first item

      setbookMarkedRepos(repos);
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
          {bookMarkedRepos.length == 0 ? (
            <p className='py-20 text-bold italic text-muted-foreground justify-center items-center text-center'>No BookMarked Repos</p>
          ) : (
            <div className='p-20 justify-center items-center flex flex-col gap-10'>
            {bookMarkedRepos.map((repo) => (
                <div className='bg-gradient-to-b from-pink-100 to-white flex flex-row gap-2  border-2 border-solid border-blue rounded-lg box-border shadow-lg justify-evenly p-2 w-full'>
                    <div><Badge className='bg-white text-lg h-10 text-black hover:bg-white'>⭐{repo.stargazers_count}</Badge></div>
                    <a href={`${repo.html_url}`}><p className='font-mono text-blue-500 text-lg underline'>{repo.name}</p></a>
                    <div><Button><Link href={
                                {
                                    pathname: '/repository',
                                    query: {
                                        repoid: repo.id
                                    }
                                }
                            }
                    >See Details</Link></Button></div>
                </div>
            ))}

        </div>
          )}
        </div>
      </div>
    </>
  )
}

export default page