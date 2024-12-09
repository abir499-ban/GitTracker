"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Page = () => {
    const [repo, setRepo] = useState<FetchRepo | null>(null);
    const [contributors, setContributors] = useState<GitHubUser[]>([]);
    const [issues, setIssues] = useState<IssuesType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                const repoResponse = await axios.get("/api/search/repositories", {
                    params: { owner: "abir499-ban", repo: "GitTracker" },
                });
                setRepo(repoResponse.data.message);

                const contributorsResponse = await axios.get("/api/search/contributors", {
                    params: { owner: "abir499-ban", repo: "GitTracker" },
                });
                setContributors(contributorsResponse.data.message);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRepoData();
    }, []);

    const generateIssues = async () => {
        try {
            const issuesResponse = await axios.get("/api/search/repositories/issues", {
                params: { owner: repo?.owner.login, repo: repo?.name },
            });
            setIssues(issuesResponse.data.message);
        } catch (error) {
            console.error("Failed to fetch issues:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="text-center">
            <h1 className="font-mono text-4xl">Welcome to the Contributors Page</h1>
            {repo && (
                <>
                    <h2 className="py-10 text-2xl text-black">Project Statistics:</h2>
                    <div className="flex flex-wrap justify-center gap-12">
                        {[
                            { emoji: "🍴", label: "Forks", value: repo.forks_count },
                            { emoji: "⭐", label: "Stars", value: repo.stargazers_count },
                            { emoji: "💿", label: "Issues", value: repo.open_issues_count },
                            { emoji: "👥", label: "Contributors", value: contributors.length },
                        ].map((stat, index) => (
                            <div key={index} className="border-2 rounded-lg p-10 text-xl">
                                {stat.emoji} {stat.label}: {stat.value}
                            </div>
                        ))}
                    </div>
                </>
            )}

            <h2 className="py-10 text-2xl">Our Contributors:</h2>
            {contributors.length === 0 ? (
                <p>No contributors found.</p>
            ) : (
                <div className="grid grid-cols-4 gap-8">
                    {contributors.map((contributor) => (
                        <div key={contributor.id} className="border-2 shadow-lg bg-blue-950 rounded-2xl h-28">
                            <Avatar>
                                <AvatarImage src={contributor.avatar_url} />
                            </Avatar>
                            <a className="text-white underline" href={contributor.html_url}>
                                {contributor.login}
                            </a>
                            <p className="text-white text-sm mt-2">Contributions: {contributor.contributions}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-10">
                {issues.length === 0 ? (
                    <Button onClick={generateIssues}>View Issues</Button>
                ) : (
                    <div className="p-20">
                        <h2 className="text-2xl font-bold font-mono">Issues ({issues.length})</h2>
                        {issues.map((issue) => (
                            <div className='flex-1 flex-wrap flex-cols w-full gap-5 border-2 border-solid border-blue rounded-lg box-border shadow-lg relative'>
                            <div className='w-full h-34 flex flex-row gap-7 justify-evenly p-11 h-20'>
                              <p><Avatar>
                                <a href={`${issue.user.html_url}`}><AvatarImage className='mb-9' src={issue.user.avatar_url} /></a>
                              </Avatar>
                              </p>
                              <a href={`${issue.html_url}`}><p className='font-mono underline underline-offset-2 text-blue-500'>{issue.title}</p></a>
                              {issue.state == 'open' ? (
                                <p className='text-green-500'>{issue.state}</p>
                              ) : (
                                <p className='text-purple-500'>{issue.state}</p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
