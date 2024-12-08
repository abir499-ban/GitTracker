import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const getToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        if(token == "") return null
        const payload: UserJWTPayload = jwt.verify(token, process.env.TOKEN_SECRET!) as UserJWTPayload
        return payload
    } catch (error) {
        throw new Error("No request found")
    }
}