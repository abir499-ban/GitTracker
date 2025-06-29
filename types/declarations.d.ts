import { number } from "zod"

declare type UserCreationRequestPaylod = {
    name: string,
    email: string,
    password: string
}
declare type SendMailParams = {
    email: string,
    emailType: string,
    userId: number
}

declare type UserLoginPayload = {
    email: string,
    password: string
}

declare type UserFetched = {
    id: number,
    name: string,
    email: string,
    password: string,
    isVerified: boolean,
    isAdmin: boolean,
    verifyPasswordToken: string,
    verfiyPasswordTokenExpiry: any,
    verifyToken: string,
    verifyTokenExpiry: any
    bookMarkedNumbers : number[]
}

declare type UserJWTPayload = {
    id: number,
    name: string,
    email: string,
}
declare type UserSignUpPayload = {
    name: string,
    email: string,
    password: string
}
declare type FetchRepo = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        user_view_type: string;
        site_admin: boolean;
    };
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: {
        key: string;
        name: string;
        spdx_id: string;
        url: string;
        node_id: string;
    } | null;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    temp_clone_token: string | null;
    network_count: number;
    subscribers_count: number;
    createdAt: ?number
}
declare type RepoPayload = {
    ownerName: string,
    repoName: string
}

declare type IssuesType = {
    url: string,
    id: number,
    title: string,
    html_url : string,
    user: {
        login: string;
        id: number;
        avatar_url: string;
        html_url: string;
        type: string;
    },
    state : string,

}

declare type PopularRepoPayloadType = {
    language : string,
    topic : string,
    startCount : number,
}
declare type GitHubUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
    contributions: number;
  };
declare type  GitHubIssue = {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      user_view_type: string;
      site_admin: boolean;
    };
    labels: any[]; // Adjust this if you know the exact structure of labels
    state: string;
    locked: boolean;
    assignee: null | any; // Adjust if assignee has a defined structure
    assignees: any[]; // Adjust if assignees have a defined structure
    milestone: null | any; // Adjust if milestone has a defined structure
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: null | string;
    author_association: string;
    active_lock_reason: null | string;
    draft: boolean;
    pull_request: {
      url: string;
      html_url: string;
      diff_url: string;
      patch_url: string;
      merged_at: null | string;
    };
    body: string;
    closed_by: null | any; // Adjust if closed_by has a defined structure
    reactions: {
      url: string;
      total_count: number;
      "+1": number;
      "-1": number;
      laugh: number;
      hooray: number;
      confused: number;
      heart: number;
      rocket: number;
      eyes: number;
    };
    timeline_url: string;
    performed_via_github_app: null | any; // Adjust if performed_via_github_app has a defined structure
    state_reason: null | string;
  };

declare type UserVerifyPayload = UserJWTPayload & {
    iat? : number,
    exp? : nummber
}