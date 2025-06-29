import { useState, useEffect } from "react";
import { UserVerifyPayload } from "../../types/declarations";



type Status = 'loading' | 'unauthenticated' | 'authenticated'

export function useSession() {
    const [status, setstatus] = useState<Status>('loading')
    const [user, setuser] = useState<UserVerifyPayload | null>(null)

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch('/api/users/me', {
                    credentials: 'include'
                })
                const data = await res.json()

                if (data.status == 'authenticated') {
                    setstatus('authenticated')
                    setuser(data.user)
                } else {
                    setstatus('unauthenticated')
                    setuser(null)
                }
            } catch (error) {
                console.log('Session fetch error: ', error)
                setstatus('unauthenticated')
                setuser(null)
            }
        }
        fetchSession()
    }, [])

    return {status , user}
}