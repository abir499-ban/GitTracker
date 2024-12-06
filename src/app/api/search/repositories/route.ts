import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { GITHUB_API } from "../../../../../constants/constant";
import { addData } from "@/utils/firestore";

export async function GET(req : NextRequest){
    try {
        const {searchParams} = new URL(req.url);
        const owner  = searchParams.get('owner');
        const repo = searchParams.get('repo');
        if(!owner || !repo) return NextResponse.json({message:"Invalid request", success:false}, {status:401});
        const request_uri = `${GITHUB_API}/repos/${owner}/${repo}`;
        console.log(request_uri)
        const result = await axios.get(request_uri);
        console.log(result.data);
        const repoData : FetchRepo = result.data as FetchRepo;
        await addData(repoData);
        return NextResponse.json({message : result.data, success : true}, {status:200});
    } catch (error) {
        return NextResponse.json({message : "Not Done", success : false}, {status : 500})
    }
}