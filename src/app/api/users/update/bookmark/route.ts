import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const repoid = searchParams.get("repoid");
        const userid = searchParams.get("userid");

        if (!repoid || !userid) {
            return NextResponse.json(
                { message: "Invalid or missing repoid", success: false },
                { status: 400 }
            );
        }


        const User: UserFetched = (await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, Number(userid))))[0] as UserFetched;

        if (!User) {
            return NextResponse.json(
                { message: "No user found", success: false },
                { status: 404 }
            );
        }

        // Clean and update bookMarkedNumbers
        const validNumbers = User.bookMarkedNumbers?.filter((num) => num !== null) || [];
        const updatedNumbers = [...validNumbers, Number(repoid)];

        console.log(validNumbers);
        console.log(updatedNumbers);
        await db.update(usersTable).set({
            bookMarkedNumbers : updatedNumbers
        }).where(eq(usersTable.id, Number(userid)))

        return NextResponse.json({ message: "Bookmarked successfully", success: true });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
