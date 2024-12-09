"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getData } from '@/utils/firestore';
import { colorMap, defaultGitHubRepository, defaultIssue } from '../../../../constants/constant';
import { GitFork, Star, CircleDot, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


const Page = () => {
  const [repoDetails, setRepoDetails] = useState<FetchRepo>(defaultGitHubRepository)
  const [langguageColor, setlangguageColor] = useState<string>('')
  const [issues, setissues] = useState<IssuesType[]>([defaultIssue])
  const searchParams = useSearchParams();
  const repoId: string = searchParams.get('repoid') as string

  useEffect(() => {

    const fetchRepo = async () => {
      try {
        const result: FetchRepo[] = await getData(repoId);
        console.log("inside useEffect ", result[0])
        setRepoDetails(result[0])
        //setting a color-code for a language
        const language: string = result[0].language;
        if (language in colorMap) {
          setlangguageColor(colorMap[language as keyof typeof colorMap])
        } else {
          setlangguageColor("white")
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchRepo()

  }, [])

  const generateIssues = async () => {
    const response = await axios.get('/api/search/repositories/issues', {
      params: {
        owner: repoDetails.owner.login,
        repo: repoDetails.name
      }
    })
    //reponse.data.message
    console.log(response.data.message)
    setissues(response.data.message as IssuesType[])
  }

  return (
    <>
        <div className='inline-flex text-center' style={{marginLeft: "300px"}}>
        <h1 className='text-center text-5xl font-bold font-mono'>{repoDetails.name}</h1>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link"><a href={repoDetails.owner.html_url}>{repoDetails.owner.login}</a></Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={repoDetails.owner.avatar_url} />
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{repoDetails.owner.login}</h4>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <p className='text-center text-lg font-extralight p-10'>{repoDetails.description}</p>
      <div className='flex flex-wrap flex-row gap-3 justify-center py-2 hover:cursor-pointer'>
        {repoDetails.topics.map((option) => (
          <Badge key={option}><a href={`https://www.github.com/topics/${option}`}>{option}</a></Badge>
        ))}
      </div>
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
          <p className='p-11 font-mono text-xl text-black'>Watchers : {repoDetails.subscribers_count}</p> </div>

      </div>
      <div className='flex flex-row gap-2'>
        <div className="w-1/2 h-32 border-2 border-solid border-blue rounded-lg box-border shadow-lg relative">
          <p className="p-11 ml-14 font-mono text-2xl font-bold text-center">{repoDetails.language}</p>
          <span
            className="absolute bottom-0 left-0 h-2 w-full " style={{ backgroundColor: langguageColor }}
          >
          </span>
        </div>

      </div>



      {issues[0] === defaultIssue ? (
        <div className='flex justify-center items-center pt-20'><Button onClick={generateIssues}>View Issues</Button></div>) :
        (
          <div className='p-20 justify-center items-center'>
            <h2 className='text-center text-2xl font-bold font-mono'>Issues ({issues.length})</h2>
            {
              issues.map((issue) => (
                <div key={issue.id} className='flex-1 flex-wrap flex-cols w-full gap-5 border-2 border-solid border-blue rounded-lg box-border shadow-lg relative'>
                  <div className='w-full h-34 flex flex-row gap-7 justify-evenly p-11 h-20'>
                    <p><Avatar>
                      <a href={`${issue.user.html_url}`}><AvatarImage className='mb-9' src={issue.user.avatar_url} /></a>
                    </Avatar>
                    </p>
                    <a href={`${issue.html_url}`}><p className='font-mono underline underline-offset-2 text-blue-500'>{issue.title}</p></a>
                    {issue.state == 'open' ? (
                      <p className='text-green-500'>{issue.state}</p>
                    ) : (
                      <p className='text-purple-500'>{issue.state}</p>
                    )}
                  </div>
                </div>
              ))
            }
          </div>
        )
      }

    </>
  )
}

export default Page