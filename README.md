# Welcome to GitTracker   
A feature-rich application for exploring GitHub repositories, viewing detailed metrics, filtering by language, topics, or stars, and bookmarking repositories for easy access. Ideal for developers and open-source enthusiasts looking to simplify repository discovery and insights.



---

## Features

- **Search Repositories:** Search repositories by owner and name.
- **Detailed Metrics:** View metrics such as stars, forks, watchers, and issues.
- **Explore Popular Repositories:** Discover trending repositories with filtering options.
- **Advanced Filtering:** Filter repositories by language, topics, and star count.
- **Bookmark Repositories:** Save your favorite repositories for quick access.
- **User Profiles:** View user details and tags related to repositories.
- **Personalized Experience:** Log in to  bookmark your favourtie repositories and view them for tlater purposes.

  ---

# Installation Guide to run it locally

  Before you begin, ensure you have the following prerequisites installed on your local machine:

1.  **Node.js: and npm (Node Package Manager**
2. **git**

## Follow these steps to run it locally:
1. Star and Fork the repository.

2. Run the command
   
   ```sh
      git clone https://github.com/abir499-ban/GitTracker.git
      cd GitTracker
   ```
4. Install dependencies
   
    ```sh
      npm install
   ```
5. Set Environment Variables
    ```sh
        DATABASE_URL=URL_TO_POSTGRESQLdB_NEONDB
        DOMAIN=DOMAIN_URL
        TOKEN_SECRET=JWT_TOKEN_SECRET
        FIREBASE_APIKEY=FIREBASE_CONFIG
        FIREBASE_AUTH_DOMAIn=FIREBASE_CONFIG
        FIREBASE_PROJECT_ID=FIREBASE_CONFIG
        FIREBAE_STORAGE_BUCKET=FIREBASE_CONFIG
        FIREBASE_MESSAGING_SENDER_ID=FIREBASE_CONFIG
        FIREBASE_API_ID=FIREBASE_CONFIG
        GITHUB_ACCESS_TOKEN=ACCESS_TOKEN_FROM_GITHUB_FOR_DEVELOPERS
    ```

6. Set the two commands in package.json under scripts:
   ```sh
     "db:studio" : "npx drizzle-kit studio",
     "db:push" : "npx drizzle-kit push"
   ```

7.Visit the PostgresQl database hosted by NeonDB:
  ```sh
     npm run db:push
     npm run db:studio
  ```

8. All ready.......Now lets go!!
   ```sh
       npm run dev
   ```




