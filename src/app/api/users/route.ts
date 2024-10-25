"use server";
import { NextRequest, NextResponse } from "next/server";
import {usersTable} from "@/db/schema"
import {db} from '@/db/index'
import {eq} from 'drizzle-orm'
import bcrypt from 'bcrypt'
import { sendMail } from "@/utils/mailer";

export async function POST(req: NextRequest){
    const body :FormData = await req.formData();
    const data : UserCreationRequestPaylod = {
        name : body.get("name") as string,
        email : body.get("email") as string,
        password : body.get("password") as string
    }

    const doesUserexists = await db.select().from(usersTable).where(eq(usersTable.email, data.email))
    if(doesUserexists.length > 0){
        console.log("user exist")
        return NextResponse.json({message: "User with this email already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(data.password , salt)

    try {
        const user = await db.insert(usersTable).values({
            name : data.name,
            email : data.email,
            password : hashedPass
        }).returning({id : usersTable.id})
        console.log(user)

        const sendMailoptions : SendMailParams = {
            email  : data.email,
            emailType : "VERIFY",
            userId : user[0].id as number
        }
        
        await sendMail(sendMailoptions)
        return NextResponse.json({"message" : ` inserted in database`})
    } catch (error : any) {
        console.log(error);
        return NextResponse.json({message: "error"})
    }

}