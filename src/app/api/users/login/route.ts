"use server";
import { NextRequest, NextResponse } from "next/server";
import { usersTable } from "@/db/schema"
import { db } from '@/db/index'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data: UserLoginPayload = {
            email: body.email,
            password: body.password
        }

        const userexist = (await db.select()
            .from(usersTable).where(eq(usersTable.email, data.email)))[0] as UserFetched
        
        console.log(userexist)

        if (userexist === undefined) return NextResponse.json({ message: "Wrong email provided" ,success : false},
            { status: 401 })

        console.log(userexist)

        const validate = await bcrypt.compare(data.password, userexist.password)

        if (!validate) return NextResponse.json({ message: "Wrong Password" },
            { status: 401 })

        const payload: UserJWTPayload = {
            id: userexist.id,
            name: userexist.name,
            email: userexist.email
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
        console.log("BABU")
        return NextResponse.json({ message: "INternal server error", success: false }, { status: 500 })
    }
}