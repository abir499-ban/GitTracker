"use server"
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ResponseEmiiter } from "@/utils/responseEmitter";

dotenv.config()

export async function  GET(req: NextRequest) {
    try {
       const token = req.cookies.get('token')?.value;
        if(!token) return ResponseEmiiter.UnAuthenticatedReponse()

        const user = jwt.verify(token , process.env.TOKEN_SECRET!)
        if(!user) return ResponseEmiiter.UnAuthenticatedReponse()
        return ResponseEmiiter.AuthenticatedResponse(user)
    } catch (error) {
        console.error(error)
        return ResponseEmiiter.UnAuthenticatedReponse()
    }

}