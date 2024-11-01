"use server";
import { NextRequest, NextResponse } from "next/server";
import {usersTable} from "@/db/schema"
import {db} from '@/db/index'
import {eq} from 'drizzle-orm'
import bcrypt from 'bcrypt'
import { sendMail } from "@/utils/mailer";

export async function POST(req : NextRequest){
    const body : FormData = await req.formData();
    const data : UserLoginPayload = {
        email : body.get("email") as string,
        password : body.get("password") as string
    }
    
    const userexist = (await db.select()
    .from(usersTable).where(eq(usersTable.email, data.email)))[0]

    if(!userexist) return NextResponse.json({message : "Wrong email provided"}, 
        {status: 401})

    console.log(userexist)

    const validate = await bcrypt.compare(data.password, userexist.password)

    if(!validate) return NextResponse.json({message : "Wrong Password"}, 
        {status: 401})


   return NextResponse.json({message : "Log in sucessfull"})
}