import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import bycrypt, { genSalt } from 'bcrypt'

export async function POST(req: NextRequest) {
    try {
        const body: FormData = await req.formData();
        const data: UserSignUpPayload = {
            name: body.get("name") as string,
            email: body.get("email") as string,
            password: body.get("password") as string
        }

        const salt = await bycrypt.genSalt(10);
        const hashedPassword : string = await bycrypt.hash(data.password, salt) 
        await db.insert(usersTable).values({
            name : data.name,
            email : data.email,
            password : hashedPassword
        })
        return NextResponse.json({message : "Sign up done sucessfully", success : true}, {status : 201});
    } catch (error) {
        return NextResponse.json({ message: "Error occured", success: false }, { status: 500 })
    }



}