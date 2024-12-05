"use client"
import React,{useState} from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { defaultGitHubRepository } from '../../../constants/constant'
import axios from 'axios'


const Dashboard = () => {
    const [repoDetails, setrepoDetails] = useState<FetchRepo>(defaultGitHubRepository);
    const[repoPayload, setrepoPayload] = useState<RepoPayload>({
        ownerName : '',
        repoName : ''
    })

    const HandleSubmitRepoDetails = async(e : any)=>{
        e.preventDefault();
        try {
            if(repoPayload.ownerName === '' || repoPayload.repoName === ''){
                console.log("Cant Fetch with empty payload");
                return;
            }
            
            const result = await axios.get('/api/search/repositories',{
                params:{
                    owner : repoPayload.ownerName,
                    repo : repoPayload.repoName,
                }
            })
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
                        onChange={(e)=>
                            setrepoPayload((prev)=>({
                                ...prev,
                                ownerName : e.target.value,
                            }))
                        }/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="Repo">Repository Name</Label>
                        <Input className='placeholder:font-thin font-thin'
                        type="text" required id="repo" placeholder="Enter Repository Name" 
                        value={repoPayload.repoName}
                        onChange={(e)=>
                            setrepoPayload((prev) =>({
                                ...prev,
                                repoName : e.target.value
                            }))
                        }/>
                    </div>

                </div>
                <Button type='submit' variant='outline' onClick={HandleSubmitRepoDetails}>Search</Button>
            </form>
        </>
    )
}

export default Dashboard


