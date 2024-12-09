import { NextRequest, NextResponse } from "next/server";
import { GITHUB_API } from "../../../../../../constants/constant";
import axios from 'axios'

export async function GET(req : NextRequest){
    try{
        const {searchParams} = new URL(req.url);
        const stars = searchParams.get("stars");
        const request_uri = `${GITHUB_API}/search/repositories?q=stars:>${stars}&sort=stars&order=desc&per_page=15`;
        const response = await axios.get(request_uri);
        const result : FetchRepo[] = response.data.items;
        return NextResponse.json({message : result, success:true},{status : 201})
    }catch(err){
        return NextResponse.json({message : err, success : false}, {status : 501})
    }
}