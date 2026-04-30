import type { Metadata } from 'next'
import { Geist, Geist_Mono, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { ThemeScript } from '@/components/theme-script'

const sourceSerif = Source_Serif_4({
  variable: '--font-serif-loaded',
  subsets: ['latin'],
  display: 'swap'
})

const geist = Geist({
  variable: '--font-sans-loaded',
  subsets: ['latin'],
  display: 'swap'
})

const geistMono = Geist_Mono({
  variable: '--font-mono-loaded',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Better Hacker News',
  description: 'A calmer, more readable front-end for Hacker News.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${sourceSerif.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <div className="mx-auto max-w-[720px] px-[22px] sm:px-7 md:px-8">
          {children}
        </div>
      </body>
    </html>
  )
}
