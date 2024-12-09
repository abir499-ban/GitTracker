import { NextRequest, NextResponse } from "next/server";
import { GITHUB_API } from "../../../../../constants/constant";
import axios from "axios";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        let stars = Number(searchParams.get("stars"))
        const topic = searchParams.get("topic");
        const languages = searchParams.get("Languages")
        if (stars == 0) stars = 10000
        let request_uri;
        if (topic == "" && languages == "") {
            const request_uri = `${GITHUB_API}/search/repositories?q=stars:>${stars}&sort=stars&order=desc&per_page=15`;
            const response = await axios.get(request_uri);
            const result: FetchRepo[] = response.data.items;
            return NextResponse.json({ message: result, success: true }, { status: 201 })
        }
        if (topic == "") {
            request_uri = `${GITHUB_API}/search/repositories?q=stars:>${stars}+language:${languages}&sort=stars&order=desc&per_page=15`
            //https://api.github.com/search/repositories?q=stars:%3E=10000+language:Python&sort=stars&order=desc&per_page=10
            const response = await axios.get(request_uri)
            const result: FetchRepo[] = response.data.items
            return NextResponse.json({ message: result, success: true }, { status: 201 })
        }
        if (languages == "") {
            request_uri = `${GITHUB_API}/search/repositories?q=stars:>${stars}+topic:${topic}&sort=stars&order=desc&per_page=15`
            //https://api.github.com/search/repositories?q=stars:%3E=10000+topic:MachineLearning&sort=stars&order=desc&per_page=10
            const response = await axios.get(request_uri)
            const result: FetchRepo[] = response.data.items
            return NextResponse.json({ message: result, success: true }, { status: 201 })
        }
        request_uri = `${GITHUB_API}/search/repositories?q=topic:${topic}+stars:>=${stars}+language:${languages}&sort=stars&order=desc&per_page=15`

        //https://api.github.com/search/repositories?q=topic:<topic>+stars:>=<min_stars>+language:<language>&sort=stars&order=desc&per_page=<limit>
        const response = await axios.get(request_uri)
        const result: FetchRepo[] = response.data.items
        return NextResponse.json({ message: result, success: true }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: error, success: false }, { status: 500 })
    }
}