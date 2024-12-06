"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getData } from '@/utils/firestore';
import { defaultGitHubRepository } from '../../../../constants/constant';


const page = () => {
  const [repoDetails, setRepoDetails] = useState<FetchRepo>(defaultGitHubRepository)
  const searchParams = useSearchParams();
  const repoId: string = searchParams.get('repoid') as string

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const result : FetchRepo[] = await getData(repoId);
        console.log(result[0].createdAt)
        setRepoDetails(result[0])
      } catch (error: any) {
        console.log(error.message)
      }
    }
    fetchRepo()
  }, [])
  return (
    <>
      <h1>Repo Analytics</h1>
    </>
  )
}

export default page