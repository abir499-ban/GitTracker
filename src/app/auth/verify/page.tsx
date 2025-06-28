"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const Page = () => {
    const [loading, setloading] = React.useState(false)
    const searchParams = useSearchParams();
    const token: string | null = searchParams.get('token');

    const sendVerifyreq = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setloading(true)
        try {
            const result = await axios.get('/api/users/verify', {
                params: {
                    token: token
                }
            })
            console.log(result.data.message)
            alert('Your Email is verified')
        } catch (err) {
            console.log(err)
            alert('Some Error occured')
        }
        finally {
            setloading(false)
        }
    }
    return (
        <>
            <div className='justify-center'>
                <Button className='bg-blue-600 hover:bg-blue-800 hover:shadow-xl'
                    onClick={sendVerifyreq}>
                    {loading ?
                        'Loading...' :
                        'Click here to verify'}
                </Button>

            </div>
        </>
    )
}

export default Page