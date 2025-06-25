"use server";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from '@/db/index'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const UserLoginData: UserLoginPayload = {
            email: body.email,
            password: body.password
        }

        const userexist  = await prismaClient.users.findFirst({
            where:{
                email : UserLoginData.email
            }
        })
        
        console.log(userexist)

        if (!userexist) return NextResponse.json({ message: "Wrong email provided" ,success : false},
            { status: 401 })

        console.log(userexist)

        const validate = await bcrypt.compare(UserLoginData.password, userexist.password)

        if (!validate) return NextResponse.json({ message: "Wrong Password" , success : false},
            { status: 401 })

        const payload: UserJWTPayload = {
            id: userexist.id,
            name: userexist.name,
            email: userexist.email,
            bookMarkedNumbers : userexist.bookMarkedNumbers.map((n: bigint) => Number(n))
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        })

        console.log(token);

        const response = NextResponse.json({ message: "Login successfull", success: true }, { status: 201 });
        response.cookies.set("token", token, {
            httpOnly: true
        });
        return response;
    }
    catch (err) {
        return NextResponse.json({ message: err, success: false }, { status: 500 })
    }
}