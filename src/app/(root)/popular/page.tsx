"use client"
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { defaultGitHubRepository, defaultPopularRepoPayload } from '../../../../constants/constant'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Badge } from '@/components/ui/badge'
import { addData } from '@/utils/firestore'
import {useRouter} from 'next/navigation'

const page = () => {
    const Router = useRouter();
    const [popularRepoPayoad, setpopularRepoPayoad] = useState<PopularRepoPayloadType>(defaultPopularRepoPayload)
    const [popularRepos, setpopularRepos] = useState<FetchRepo[]>([defaultGitHubRepository])
    const generatePopularRepo = async () => {
        const response = await axios.get('/api/search/popular', {
            params: {
                topic : popularRepoPayoad.topic,
                Languages : popularRepoPayoad.language,
                stars : popularRepoPayoad.startCount
            }
        })
        response.data.message.map((repo : FetchRepo)=>(
            console.log(repo.name)
        ))
        setpopularRepos(response.data.message as FetchRepo[])
    }
    useEffect(() => {
        const fetchPopularRepo = async () => {
            const response = await axios.get('/api/search/repositories/popular', {
                params: {
                    stars: 10000
                }
            })
            setpopularRepos(response.data.message as FetchRepo[])
        }
        fetchPopularRepo();
    }, [])


    const seeDetails = async(repo : FetchRepo) =>{
        console.log(repo);
        await addData(repo)
        Router.push(`/repository?repoid=${repo.id}`);
        
    }
    return (
        <>
            <h1 className='text-center text-4xl font-bold font-mono mb-6'>Popular Repositories</h1>
            <div className='flex flex-row gap-5 font-mono text-black'>
                <Input placeholder='Filter by Language'
                    value={popularRepoPayoad.language}
                    onChange={(e) => setpopularRepoPayoad((prev) => ({
                        ...prev,
                        language: e.target.value
                    }))}>
                </Input>
                <Input placeholder='Filter by Topics'
                    value={popularRepoPayoad.topic}
                    onChange={(e) => setpopularRepoPayoad((prev) => ({
                        ...prev,
                        topic: e.target.value
                    }))}
                ></Input>
                <Input type='number' placeholder='Filter by start count'
                    value={popularRepoPayoad.startCount}
                    onChange={(e) => setpopularRepoPayoad((prev) => ({
                        ...prev,
                        startCount: Number(e.target.value)
                    }))}
                ></Input>
            </div>
            <div><Button onClick={generatePopularRepo} className='justify-between text-center mt-10'>Generate List</Button></div>

            {popularRepos[0] === defaultGitHubRepository ? (
                <h1 className='text-gray-600 italic text-muted-foreground'>Loading ...</h1>

            ) : (
                <div className='p-20 justify-center items-center flex flex-col gap-10'>
                    {popularRepos.map((repo) => (
                        <div className='bg-gradient-to-b from-pink-100 to-white flex flex-row gap-2  border-2 border-solid border-blue rounded-lg box-border shadow-lg justify-evenly p-2 w-full'>
                            <div><Badge className='bg-white text-lg h-10 text-black hover:bg-white'>⭐{repo.stargazers_count}</Badge></div>
                            <a href={`${repo.html_url}`}><p className='font-mono text-blue-500 text-lg underline'>{repo.name}</p></a>
                            <div><Button onClick={()=> seeDetails(repo)}>See Details</Button></div>
                        </div>
                    ))}

                </div>
            )
            }
        </>
    )
}

export default page