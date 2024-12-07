"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getData } from '@/utils/firestore';
import { colorMap, defaultGitHubRepository } from '../../../../constants/constant';
import { GitFork, Star, CircleDot, Cpu, Eye, Languages } from 'lucide-react'


const page = () => {
  const [repoDetails, setRepoDetails] = useState<FetchRepo>(defaultGitHubRepository)
  const[langguageColor, setlangguageColor] = useState<string>('')
  const searchParams = useSearchParams();
  const repoId: string = searchParams.get('repoid') as string

  useEffect(() => {

    const fetchRepo = async () => {
      try {
        const result: FetchRepo[] = await getData(repoId);
        console.log("inside useEffect ", result[0])
        setRepoDetails(result[0])
        //setting a color-code for a language
        const language : string = result[0].language ;
        if(language in colorMap){
          setlangguageColor(colorMap[language as keyof typeof colorMap])
        }else{
          setlangguageColor("white")
        }
      } catch (error: any) {
        console.log(error.message)
      }
    }
    fetchRepo()
  }, [])

  return (
    <>
      <h1 className='text-center text-5xl font-bold font-mono'>{repoDetails.name}</h1>
      <p className='mt-9 text-muted-foreground font-mono'>General Information</p>
      <div className='px-4 py-6 grid grid-cols-2 justify-between gap-8'>
        <div className='h-32 border-2 border-solid border-blue rounded-lg box-border shadow-lg flex flex-row gap-10'>
          <GitFork color="#ec36d4" className='w-20 h-20 ml-10 mt-4' />
          <p className='p-11 font-mono text-xl'>Forks : {repoDetails.forks}</p> </div>


        <div className='h-32 border-2 border-solid border-blue rounded-lg box-border shadow-lg flex flex-row gap-10'>
          <Star color="#ecce36" className='w-20 h-20 ml-10 mt-4' />
          <p className='p-11 font-mono text-xl'>Stars : {repoDetails.stargazers_count}</p> </div>


        <div className='h-32 border-2 border-solid border-blue rounded-lg box-border shadow-lg flex flex-row gap-10'>
          <CircleDot color="#6586ec" className='w-20 h-20 ml-10 mt-4' />
          <p className='p-11 font-mono text-xl'>Open Issues : {repoDetails.open_issues_count}</p> </div>

        <div className='h-32 border-2 border-solid border-blue rounded-lg box-border shadow-lg flex flex-row gap-10'>
          <Eye color="#25bcd0" className='w-20 h-20 ml-10 mt-4' />
          <p className='p-11 font-mono text-xl'>Watchers : {repoDetails.subscribers_count}</p> </div>

      </div>
      <div className="w-1/2 h-32 border-2 border-solid border-blue rounded-lg box-border shadow-lg relative">
        <p className="p-11 ml-14 font-mono text-2xl font-bold text-center">{repoDetails.language}</p>
        <span
          className="absolute bottom-0 left-0 h-2 w-full " style={{backgroundColor : langguageColor}}
        >
        </span>
      </div>
      
    </>
  )
}

export default page