"use client"
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { defaultGitHubRepository, defaultPopularRepoPayload, defaultUserJWTPayload } from '../../../../constants/constant'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Badge } from '@/components/ui/badge'
import { addData } from '@/utils/firestore'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'

const Page = () => {
    const Router = useRouter();
    const [popularRepoPayoad, setpopularRepoPayoad] = useState<PopularRepoPayloadType>(defaultPopularRepoPayload)
    const [popularRepos, setpopularRepos] = useState<FetchRepo[]>([defaultGitHubRepository])
    const [user, setuser] = useState<UserJWTPayload>(defaultUserJWTPayload)
    const [bookMarked, setbookmarked] = useState<string[]>([])
    const generatePopularRepo = async () => {
        const response = await axios.get('/api/search/popular', {
            params: {
                topic: popularRepoPayoad.topic,
                Languages: popularRepoPayoad.language,
                stars: popularRepoPayoad.startCount
            }
        })
        response.data.message.map((repo: FetchRepo) => (
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

        const fetchUser = async () => {
            try {
                const result = await axios.get('/api/users/profile');
                console.log(result.data.message)
                setuser(result.data.message)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [])


    const seeDetails = async (repo: FetchRepo) => {
        console.log(repo);
        await addData(repo)
        Router.push(`/repository?repoid=${repo.id}`);

    }

    const handleBookMark = (repoid: number) => {
        const Arr = [...bookMarked, String(repoid)]
        console.log(Arr)
        setbookmarked(Arr)
        const update = async () => {
            try {
                const result = await axios.post(`/api/users/update/bookmark?repoid=${repoid}&userid=${user.id}`)
                console.log(result.data.message)
            } catch (error) {
                console.log(error)
            }
        }
        update()
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
                        <div key={repo.id} className='bg-gradient-to-b from-pink-100 to-white flex flex-row gap-2  border-2 border-solid border-blue rounded-lg box-border shadow-lg justify-evenly p-2 w-full'>
                            <div><Badge className='bg-white text-lg h-10 text-black hover:bg-white'>⭐{repo.stargazers_count}</Badge></div>
                            <a href={`${repo.html_url}`}><p className='font-mono text-blue-500 text-lg underline'>{repo.name}</p></a>

                            {user !== defaultUserJWTPayload && user !== null && (
                                <p>{bookMarked.includes(String(repo.id)) ? (<p>💖</p>) : (<Heart color="#f50f8a" strokeWidth={1} className='hover:cursor-pointer' onClick={() => handleBookMark(repo.id)} />)}</p>
                            )}



                            <div><Button onClick={() => seeDetails(repo)}>See Details</Button></div>
                        </div>
                    ))}

                </div>
            )
            }
        </>
    )
}

export default Page