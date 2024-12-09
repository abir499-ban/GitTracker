"use client"
import React, { useEffect, useState } from 'react'
import { defaultGitHubRepository, defaultGitHubUser } from '../../../../constants/constant'
import axios from 'axios'
import 'dotenv/config'
import Image from 'next/image'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

const page = () => {
    const [repo, setrepo] = useState<FetchRepo>(defaultGitHubRepository)
    const [contributors, setcontributors] = useState<GitHubUser[]>([defaultGitHubUser])
    useEffect(() => {
        const fetchRepo = async () => {
            try {
                const result = await axios.get('/api/search/repositories', {
                    params: {
                        owner: 'abir499-ban',
                        repo: 'GitTracker'
                    }
                })
                setrepo(result.data.message as FetchRepo)

                const response = await axios.get('/api/search/contributors', {
                    params: {
                        owner: 'abir499-ban',
                        repo: 'GitTracker'
                    }
                })
                console.log(response.data.message)
                setcontributors(response.data.message)
            } catch (error) {
                console.log(error);
            }
        }
        fetchRepo();
    }, [])

    const StatCard = [
        {
            emoji: '🍴', label: 'Forks', value: repo.forks_count
        },
        {
            emoji: '⭐', label: 'Stars', value: repo.stargazers_count
        },
        {
            emoji: '💿', label: 'Issues', value: repo.open_issues_count
        },
        {
            emoji: '👥', label: 'Contributors', value: contributors.length
        }
    ]
    return (
        <>
            <div className='justify-center items-center text-center  '>
                <h1 className='font-mono text-4xl'>Welcome to the Contributors Page</h1>
                <h2 className='py-10 text-2xl text-black'>
                    Project Statistics:</h2>
                <div className='flex flex-wrap flex-row gap-12 justify-center'>
                    {StatCard.map((stat) => (
                        <div className='border-solid border-2 border-black rounded-lg shadow-lg p-10 text-xl'>
                            {stat.emoji} {stat.label} : {stat.value}</div>
                    ))}
                </div>
                <h2 className='py-10 text-2xl text-black'>
                    Our Contributors:</h2>
                <div className='px-4 py-6 grid grid-cols-4 justify-between gap-8'>
                    {contributors.map((contributors) => (
                        <div className='border-2 shadow-lg bg-blue-950 justify-center rounded-2xl h-28'>
                            <Avatar>
                                <a><AvatarImage className='mb-9' src={contributors.avatar_url} /></a>
                            </Avatar>
                            <a className='text-white underline underline-offset-1' 
                            href={contributors.html_url}>
                                {contributors.login}</a>
                            <p className='text-white text-sm mt-2'>Total Contributions : {contributors.contributions}</p>
                        </div>
                    ))}

                </div>
                

                <h2 className='py-10 text-2xl text-black'>
                    Contribute to Issues:</h2>


            </div>

        </>
    )
}

export default page