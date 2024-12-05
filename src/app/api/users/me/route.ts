"use server"
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { getToken } from "@/utils/getToken";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {

        const userId: number = await getToken(req);
        const User: UserFetched = (await db.select().from(usersTable).where(eq(usersTable.id, userId)))[0] as UserFetched
        return NextResponse.json({message : User, success : true}, {status : 201})


    } catch (error) {
        return NextResponse.json({ message: "Error occured in fetching user", success: false }, { status: 400 })
    }

}