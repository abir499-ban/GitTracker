"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const page = () => {

    const searchParams = useSearchParams();
    const token: string | null = searchParams.get('token');

    const sendVerifyreq = async (e: any) => {
        e.preventDefault();
        try {
            const result = await axios.get('/api/users/verify', {
                params: {
                    token: token
                }
            })
            console.log(result.data.message)
        } catch (err : any) {
            console.log(err.message)
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

export default page