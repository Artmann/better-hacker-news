import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { ThemeScript } from '@/components/theme-script'

const sourceSerif = Source_Serif_4({
  variable: '--font-serif-loaded',
  subsets: ['latin'],
  display: 'swap'
})

const inter = Inter({
  variable: '--font-sans-loaded',
  subsets: ['latin'],
  display: 'swap'
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-mono-loaded',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Ember — a reader for hackers',
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
      className={`${sourceSerif.variable} ${inter.variable} ${jetBrainsMono.variable}`}
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
