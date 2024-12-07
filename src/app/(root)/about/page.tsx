import React from 'react'

const page = () => {
  return (
    <>
     <div className='px-12 py-14'>
        <h1 className='font-mono text-4xl font-bold text-center'>Git Tracker</h1>
        <p className='font-sans text-lg text-muted-foreground text-center'>A tool to view, organize and generate metrics for all your Github repositories at one place</p>
        <div className='text-left py-6 flex-1 flex-cols gap-2'>
            <h1 className='text-bold text-2xl font-bold underline py-1'>Overview</h1>
            <p className='text-lg'>In Beta Mode*</p>
        </div>

     </div>
    </>
  )
}

export default page