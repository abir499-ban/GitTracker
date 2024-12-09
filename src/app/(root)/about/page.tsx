import React from 'react'

const page = () => {
  return (
    <>
      <div className='px-12 py-14'>
        <h1 className='font-mono text-4xl font-bold text-center'>Git Tracker</h1>
        <p className='font-sans text-lg text-muted-foreground text-center'>A tool to view, organize and generate metrics for all your Github repositories at one place</p>
        <div className='text-left py-6 flex-1 flex-cols gap-2'>
          <h1 className='text-bold text-2xl font-bold underline py-1'>Overview</h1>
          <p>This is a modern web application built with Next.js, Tailwind CSS and TypeScript.
            It is designed to interact with the GitHub API. It
            fetches data directly from GitHub to provide insights into repositories, users,
            topics, and more, leveraging the power of the Github API.
          </p>
        </div>


        <div className='text-left py-6 flex-1 flex-cols gap-2'>
          <h1 className='text-bold text-2xl font-bold underline py-1'>Features</h1>
          <ul className="list-disc list-inside  text-gray-700 space-y-2">
            <li>Search for repositories by Owner Name and Repository Name.</li>
            <li>Explore detailed information about GitHub repositories.</li>
            <li>Bookmark and save your favorite repositories for later,and get personalized access to them.</li>
            <li>
              Browse popular repositories with advanced filtering options.
            </li>
            <li>
              Get a User friendly view of the open issues of a particular Repository.
            </li>
          </ul>
        </div>
        <div className='text-left py-6 flex-1 flex-cols gap-2'>
          <h1 className='text-bold text-2xl font-bold underline py-1'>Tech Stack</h1>
          <ul className='list-disc list-inside'>
            <li>
              <span className='font-bold underline underline-offset-2'>Backend</span> : Next.js,Typescript,Drizzle ORM
            </li>
            <li>
              <span className='font-bold underline underline-offset-2'>Frontend</span> : React.js, Tailwind CSS, Shdn UI 
            </li>
            <li>
              <span className='font-bold underline underline-offset-2'>Database</span> : Postgresql, NeonDB, Firebase
            </li>

          </ul>
        </div>

      </div>
    </>
  )
}

export default page