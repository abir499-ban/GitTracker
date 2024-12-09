"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const Page = () => {

    const searchParams = useSearchParams();
    const token: string | null = searchParams.get('token');

    const sendVerifyreq = async (e : React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const result = await axios.get('/api/users/verify', {
                params: {
                    token: token
                }
            })
            console.log(result.data.message)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className='justify-center'>
                <Button className='bg-blue-600 hover:bg-blue-800 hover:shadow-xl'
                    onClick={sendVerifyreq}>
                    Click here to verify</Button>

            </div>
        </>
    )
}

export default Page