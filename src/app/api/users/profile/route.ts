import { getToken } from "@/utils/getToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    try{
        const userPayload : UserJWTPayload = await getToken(req);
        return NextResponse.json({message : userPayload, success : true}, {status : 201})

    }catch(err : any){
        return NextResponse.json({message : "Internl Server Error", success : false}, {status : 500})
    }
    
}