"use client"
import React from 'react'
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
//import { Label } from "@/components/ui/label"
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
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formSchema, formSchemaType } from '../../../../schemas/signUpform.schema'


const Page = () => {
    const Router = useRouter();
   
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })


    async function onSubmit(values: formSchemaType) {
        console.log(values)
        try {
            const result = await axios.post('/api/users',values);
            console.log(result);
            alert('Mail sent. Please verify your mail')
        } catch (error) {
            console.log(error);
            alert('Some error occured')
        }
    }

    return (
        <>
            <Card className="w-[400px]  shadow-lg` mt-0">
                <CardHeader>
                    <CardTitle className='text-3xl font-mono text-center'>Welcome to Git Tracker</CardTitle>
                    <CardDescription className='text-center'>Sign up to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                <Link href='/auth/login' className='font-thin text-blue-600 underline underline-offset-2'>
                Log In</Link>
                </CardFooter>
            </Card>
        </>
    )
}

export default Page