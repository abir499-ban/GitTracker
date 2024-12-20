"use server"
import { getToken } from "@/utils/getToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    try{
        const userPayload : UserJWTPayload | undefined | null= await getToken(req);
        return NextResponse.json({message : userPayload, success : true}, {status : 201})

    }catch(err){
        return NextResponse.json({message : err, success : false}, {status : 500})
    }
    
}