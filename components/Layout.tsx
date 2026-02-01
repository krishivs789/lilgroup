import React from 'react'
import Nav from './Nav'
import Head from 'next/head'
import Link from 'next/link'

export default function Layout({children, title}:{children:React.ReactNode, title?: string}){
  const fullTitle = title ? `${title} — lil group` : 'lil group'
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content="lil group — vibrant, liquid-glass inspired learning resources about books and brain science." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            lil group
          </Link>
          <Nav />
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>

      <footer className="bg-muted text-muted-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm">
          <p>© {new Date().getFullYear()} lil group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
