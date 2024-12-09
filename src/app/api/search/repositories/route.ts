import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { GITHUB_API } from "../../../../../constants/constant";
import { addData } from "@/utils/firestore";
import 'dotenv/config'

export async function GET(req : NextRequest){
    try {
        const {searchParams} = new URL(req.url);
        const owner  = searchParams.get('owner');
        const repo = searchParams.get('repo');
        const token= process.env.GITHUB_ACCESS_TOKEN!;
        console.log(token)
        if(!owner || !repo) 
            return NextResponse.json({message:"Invalid request", success:false}, {status:401});
        if (!token) {
            return NextResponse.json({ message: "Token is required", success: false }, { status: 401 });
        }
        const request_uri = `${GITHUB_API}/repos/${owner}/${repo}`;
        const result = await axios.get(request_uri,{
            headers :{
                "Authorization" : `Bearer ${token}`
            }
        });
        const repoData : FetchRepo = result.data as FetchRepo;
        await addData(repoData);
        return NextResponse.json({message : result.data, success : true}, {status:200});
    } catch (error) {
        return NextResponse.json({message : "Not Done", success : false}, {status : 500})
    }
}