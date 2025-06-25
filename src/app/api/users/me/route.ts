"use server"
import { prismaClient } from "@/db";
import { NextRequest, NextResponse } from "next/server";


export async function  GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const userId: string | null = searchParams.get('id')
        if (!userId) return NextResponse.json({ message: "No id", success: false }, { status: 400 })

        const userIdNumber = Number(userId);

        const User = await prismaClient.users.findFirst({
            where:{
                id : userIdNumber
            }
        })
        return NextResponse.json({ message: User, success: true }, { status: 201 })


    } catch (error) {
        return NextResponse.json({ message: error, success: false }, { status: 400 })
    }

}