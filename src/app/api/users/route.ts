"use server";
import { NextRequest, NextResponse } from "next/server";
import {prismaClient} from '@/db/index'
import bcrypt from 'bcrypt'
import { sendMail } from "@/utils/mailer";

export async function POST(req: NextRequest){
    const body = await req.json();
    const userCreationdata : UserCreationRequestPaylod = {
        name : body.name,
        email : body.email,
        password : body.password
    }

    const doesUserexists = await prismaClient.users.findUnique({
        where:{
            email: userCreationdata.email
        }
    })

    if(doesUserexists){
        console.log("user exist")
        return NextResponse.json({message: "User with this email already exists", success: false})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(userCreationdata.password , salt)

    try {
        const user = await prismaClient.users.create({
            data:{
                name : userCreationdata.name,
                email : userCreationdata.email,
                password : hashedPass
            }
        })
        console.log(user.id)

        const sendMailoptions : SendMailParams = {
            email  : userCreationdata.email,
            emailType : "VERIFY",
            userId : user.id     
        }
        
        await sendMail(sendMailoptions)
        return NextResponse.json({message : user.id, success:true})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: error})
    }

}