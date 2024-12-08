"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { defaultGitHubRepository, defaultUserJWTPayload } from '../../../constants/constant'
import axios from 'axios'
import Link from 'next/link'
import { Heart } from 'lucide-react'


const Dashboard = () => {
    const [repoDetails, setrepoDetails] = useState<FetchRepo>(defaultGitHubRepository);
    const [repoPayload, setrepoPayload] = useState<RepoPayload>({
        ownerName: '',
        repoName: ''
    })

    const [user, setuser] = useState<UserJWTPayload>(defaultUserJWTPayload)
    const [bookMarked, setbookmarked] = useState<boolean>(false)
    const handleBookMark = (repoid : any) => {
        setbookmarked(true)
        const update = async() =>{
            try {
                const result = await axios.post(`/api/users/update/bookmark?repoid=${repoid}&userid=${user.id}`)

            } catch (error) {
                console.log(error)
            }
        }
        update()
    }

    useEffect(() => {
        console.log("hi from Dashboard")
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

    const HandleSubmitRepoDetails = async (e: any) => {
        e.preventDefault();
        try {
            if (repoPayload.ownerName === '' || repoPayload.repoName === '') {
                console.log("Cant Fetch with empty payload");
                return;
            }

            const result = await axios.get('/api/search/repositories', {
                params: {
                    owner: repoPayload.ownerName,
                    repo: repoPayload.repoName,
                }
            })
            setrepoDetails(result.data.message as FetchRepo)
        } catch (error) {

        }
    }

    return (
        <>
            <form>
                <strong className='text-bold text-xl'>Search a Repository</strong>
                <div className='py-10 flex flex-row gap-5'>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="Owner">Owner Name</Label>
                        <Input className='placeholder:font-thin font-thin'
                            type="text" required id="owner" placeholder="Enter Name of Owner"
                            value={repoPayload.ownerName}
                            onChange={(e) =>
                                setrepoPayload((prev) => ({
                                    ...prev,
                                    ownerName: e.target.value,
                                }))
                            } />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="Repo">Repository Name</Label>
                        <Input className='placeholder:font-thin font-thin'
                            type="text" required id="repo" placeholder="Enter Repository Name"
                            value={repoPayload.repoName}
                            onChange={(e) =>
                                setrepoPayload((prev) => ({
                                    ...prev,
                                    repoName: e.target.value
                                }))
                            } />
                    </div>

                </div>
                <Button type='submit' variant='outline' onClick={HandleSubmitRepoDetails}>Search</Button>
            </form>

            <hr className='mt-11 shadow-xl'>
            </hr>

            <div className='flex flex-wrap flex-col gap-3 mt-11'>
                <strong className='font-bold text-xl'>Result</strong>
                <div>
                    {repoDetails === defaultGitHubRepository ? <p className='text-center italic font-semibold text-muted-foreground'>Your search result will appear here</p> :
                        <div className='w-full flex flex-row gap- justify-between'>
                            <p><a href={repoDetails.owner.html_url} className='text-blue-500 underline underline-offset-2' target='_blank'>
                                {repoDetails.owner.login}</a></p>
                            <p><a href={repoDetails.html_url} className='text-blue-500 underline underline-offset-2' target='_blank'>
                                {repoDetails.name}</a></p>
                            {user !== defaultUserJWTPayload && user !== null && (
                                <p>{bookMarked ? (<p>💖</p>) : (<Heart color="#f50f8a" strokeWidth={1} className='hover:cursor-pointer' onClick={()=>handleBookMark(repoDetails.id)} />)}</p>
                            )}
                            <Button><Link href={
                                {
                                    pathname: '/repository',
                                    query: {
                                        repoid: repoDetails.id
                                    }
                                }
                            }>See Details</Link></Button>
                        </div>}
                </div>
            </div>
        </>
    )
}

export default Dashboard


