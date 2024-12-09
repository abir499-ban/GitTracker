import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { GITHUB_API } from "../../../../../../constants/constant";
import 'dotenv/config'

export async function GET(req: NextRequest) {
    const token= process.env.GITHUB_ACCESS_TOKEN
    const { searchParams } = new URL(req.url)
    const owner = searchParams.get("owner");
    const repoName = searchParams.get("repo");
    if (!owner || !repoName) return NextResponse.json({ message: "Invalid Response", success: false }, { status: 401 })
    try {
        const issues_uri = `${GITHUB_API}/repos/${owner}/${repoName}/issues`
        const response = await axios.get(issues_uri,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
        const result : GitHubIssue[] = response.data;
        const issuesData: IssuesType[] = result.map((issue) => ({
            url: issue.url,
            id: issue.id,
            title: issue.title,
            html_url: issue.html_url,
            user: {
                login: issue.user?.login || "",
                id: issue.user?.id || 0,
                avatar_url: issue.user?.avatar_url || "",
                html_url: issue.user?.html_url || "",
                type: issue.user?.type || "",
            },
            state: issue.state || "unknown",

        }))
        console.log(issuesData)
        return NextResponse.json({ message: issuesData, success: true }, { status: 201 })
    } catch (err) {
        return NextResponse.json({ message: err, success: false }, { status: 501 })
    }
}