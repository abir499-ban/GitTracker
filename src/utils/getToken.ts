import { NextRequest } from "next/server"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const getToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || undefined;
        if(token == undefined) return null
        const payload: UserJWTPayload = jwt.verify(token, process.env.TOKEN_SECRET!) as UserJWTPayload
        return payload
    } catch (error) {
        console.log(error)
        return undefined
    }
}