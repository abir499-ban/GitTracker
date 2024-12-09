"use client"
import React, { useEffect, useState } from 'react'
import { defaultGitHubRepository, defaultGitHubUser, defaultIssue } from '../../../../constants/constant'
import axios from 'axios'
import 'dotenv/config'
import Image from 'next/image'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const page = () => {
    const [repo, setrepo] = useState<FetchRepo>(defaultGitHubRepository)
    const [contributors, setcontributors] = useState<GitHubUser[]>([defaultGitHubUser])
    const [issue, setissue] = useState<IssuesType[]>([defaultIssue])
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

    const generateIssues = async () => {
        
        const response = await axios.get('/api/search/repositories/issues', {
            params: {
                owner: repo.owner.login,
                repo: repo.name
            }
        })
        //reponse.data.message
        console.log(response.data.message)
        setissue(response.data.message as IssuesType[])
    }
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

                <div className='justify-center align-center items-center mt-10'>
                    {
                        issue[0] === defaultIssue ? (
                            <Button onClick={generateIssues}>View Issues</Button>
                        ) : (
                            <div className='p-20 justify-center items-center'>
                                <h2 className='text-center text-2xl font-bold font-mono'>Issues ({issue.length})</h2>
                                {
                                    issue.map((issue) => (
                                        <div className='flex-1 flex-wrap flex-cols w-full gap-5 border-2 border-solid border-blue rounded-lg box-border shadow-lg relative'>
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
                </div>

            </div>

        </>
    )
}

export default page