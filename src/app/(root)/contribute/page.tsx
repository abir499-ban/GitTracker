"use client"
import React, { useEffect, useState } from 'react'
import { defaultGitHubRepository } from '../../../../constants/constant'
import axios from 'axios'
import 'dotenv/config'

const page = () => {
    const [repo, setrepo] = useState<FetchRepo>(defaultGitHubRepository)
    useEffect(()=>{
        const fetchRepo = async()=>{
            try {
                const result = await axios.get('/api/search/repositories', {
                    params : {
                        owner : 'abir499-ban',
                        repo : 'GitTracker'
                    }
                })
                console.log(result.data.message)
                setrepo(result.data.message as FetchRepo)
            } catch (error) {
                console.log(error);
            }
        }
        fetchRepo();
    },[])
    return (
        <>
            <div className='justify-center items-center text-center  '>
                <h1 className='font-mono text-4xl'>Welcome to the Contributors Page</h1>
                <h2 className='py-10 text-2xl text-black'>
                    Project Statistics:</h2>
                    <div className='flex flex-wrap flex-row gap-2'>
                        <div>🍴Forks : {repo.forks_count}</div>
                        <div>⭐Stars : {repo.forks_count}</div>
                        <div>💿Open Issues : {repo.open_issues_count}</div>
                        <div>Contri : {repo.contributors_url}</div>
                    </div>
            </div>

        </>
    )
}

export default page