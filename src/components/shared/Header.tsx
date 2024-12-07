"use client"
import { GitCompare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
    return (
        <>
            <header className="bg-white dark:bg-gray-900 mb-16  w-full">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                    <a className="block " href="/">
                    <GitCompare size={40} color="#1f1e1d" strokeWidth={2.75} absoluteStrokeWidth />
                    </a>

                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <a
                                        className="text-xl font-extralight  text-gray-500 hover:underline hover:text-black"
                                        href="/about"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="text-xl font-extralight  text-gray-500 hover:underline hover:text-black"
                                        href="/popular"
                                    >
                                        Popular
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <Link href='#'><Button>Log In</Button></Link>
                                <Link href='/auth/signup'><Button variant='secondary' className='border-2 border-solid border-black hover:bg-gray-400'>
                                    Regsiter</Button></Link>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header