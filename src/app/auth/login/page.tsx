"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }),
});

const page = () => {
    const Router = useRouter();
    const searchParams = useSearchParams();

    const [signupPayload, setsignupPayload] = useState<UserLoginPayload>({
        email: "",
        password: ""
    })

    const [isVerified, setisVerified] = useState(true)

    useEffect(() => {
        const id = searchParams.get('id');
        console.log(id)
        if (id != '') {
            const fetchUser = async () => {
                try {
                    const result = await axios.post(`/api/users/me?id=${id}`);
                    const User: UserFetched = result.data.message;
                    setisVerified(User.isVerified)
                    console.log("Verified : ", User.isVerified)
                } catch (error) {
                    console.log("INTERNAL SERVER ERROR")
                }
            }
            fetchUser();
        }
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try {
            const result = await axios.post('/api/users/login', values);
            console.log(result.data.message);
            if(result.data.success === true) Router.push('/profile')
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <>{
            !isVerified ? (
                <Card className='justify-center items-center'>
                    <CardHeader>
                        <Label className='text-center font-bold text-red-400'>Verify Email to Login</Label>
                    </CardHeader>
                </Card>
            ) :
                (
                    <Card className="w-[400px]  shadow-lg mt-0">
                        <CardHeader>
                            <CardTitle className='text-3xl font-mono text-center'>Welcome to Git Tracker</CardTitle>
                            <CardDescription className='text-center'>Login to get personalized access to features</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type='password' placeholder="Enter Password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div>
                                        <Button type="submit" className='w-full bg-blue-600 hover:bg-blue-900 justify-center text-center'>
                                            Submit

                                        </Button></div>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link href='/auth/signup' className='font-thin text-blue-600 underline underline-offset-2'>
                                Register</Link>
                        </CardFooter>
                    </Card>
                )
        }

        </>
    )
}

export default page