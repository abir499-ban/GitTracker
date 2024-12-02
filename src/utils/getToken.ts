import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export const getToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const payload: UserJWTPayload = jwt.verify(token, process.env.TOKEN_SECRET!) as UserJWTPayload
        return payload.id
    } catch (error) {
        throw new Error("No request found")
    }
}