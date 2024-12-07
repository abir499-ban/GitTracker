import Header from '@/components/shared/Header';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body className='px-10'>
        <div className='ml-[350px] mt-[-50px] top-0'>{children}</div>
      </body>

    </html>
  )
}

export default layout