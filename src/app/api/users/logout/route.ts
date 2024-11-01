"use server"

import { NextRequest, NextResponse } from "next/server";


export async function POST(req : NextRequest){
   const response = NextResponse.json({message : "Logout successfull"});
   response.cookies.delete("token")
   return response
}