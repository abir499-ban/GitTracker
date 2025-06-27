"use client"
import { GitCompare, Github } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { defaultUserJWTPayload, navigationItems } from '../../../constants/constant'
import axios from 'axios'
import { Badge } from '../ui/badge'

const Header = () => {
    const [user, setuser] = useState<UserJWTPayload>(defaultUserJWTPayload)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get('/api/users/profile');
                setuser(result.data.message)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [])

    

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Link href='/'><span className="font-bold text-xl text-foreground"><GitCompare/></span></Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        <Button variant="ghost" size="sm" className="font-medium">
                            <Link href='/auth/login'>Login</Link>
                        </Button>
                        <Button size="sm" className="font-medium">
                            <Link href='/auth/signup'>Register</Link>
                        </Button>
                    </div>


                </div>
            </header>
        </>
    )
}

export default Header