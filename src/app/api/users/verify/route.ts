"use server";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from '@/db/index'


export async function GET(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token") as string

        console.log(token)
        const result = await prismaClient.users.findFirst({
            where:{
                verifyToken: token,
                verifyTokenExpiry:{
                    gt: Date.now()
                }
            }
        })
        //console.log("user" , result)

        if (result) {
            await prismaClient.users.update({
                where:{
                    email : result.email
                },
                data:{
                    isVerified : true,
                    verifyToken : null,
                    verifyTokenExpiry: null
                }
            })
        } else {
            console.log("User not found")
            return NextResponse.json({ message: "User not found" }, { status: 400 })
        }
        console.log("verified")
        return NextResponse.json({ message: "Verified Successfully" }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}


