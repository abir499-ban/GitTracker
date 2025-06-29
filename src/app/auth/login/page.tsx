"use client"
import React, { useState } from 'react'
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formSchemaType } from '../../../../schemas/signUpform.schema'
import { formSchema } from '../../../../schemas/logInForm.schema'




const Page = () => {
    const Router = useRouter();
    const [loading, setloading] = useState(false)

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: formSchemaType) {
        console.log(values)
        try {
            setloading(true)
            const result = await axios.post('/api/users/login', values);
            console.log(result);
            alert(result.data.message)
            // if (result.data.success === true) Router.push('/profile')
        } catch (error) {
            alert('Some error occured')
            console.log(error);
        } finally {
            setloading(false)
        }
    }

    return (
        <>
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
                                    {loading ? "Loading..." : "LogIn"}

                                </Button></div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link href='/auth/signup' className='font-thin text-blue-600 underline underline-offset-2'>
                        Register here</Link>
                </CardFooter>
            </Card>


        </>
    )
}

export default Page