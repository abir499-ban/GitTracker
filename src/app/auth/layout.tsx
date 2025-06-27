import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className=
          "mx-auto px-4 py-8 max-w-screen-2xl">
          {children}
        </div>
      </main>
    </div>
  )
}

export default layout
