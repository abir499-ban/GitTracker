"use server"
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const userId: string | null = searchParams.get('id')
        if (!userId) return NextResponse.json({ message: "No id", success: false }, { status: 400 })

        const userIdNumber = Number(userId);

        const User: UserFetched = (await db.select().from(usersTable).where(eq(usersTable.id, userIdNumber)))[0] as UserFetched
        return NextResponse.json({ message: User, success: true }, { status: 201 })


    } catch (error) {
        return NextResponse.json({ message: error, success: false }, { status: 400 })
    }

}