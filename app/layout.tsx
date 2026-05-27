import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'José Pablo Campos | UX/UI Designer',
  description: 'UX/UI Designer & Industrial Design Engineer from Costa Rica. Creating digital experiences that are intuitive, beautiful, and impactful.',
  keywords: ['UX Designer', 'UI Designer', 'Product Designer', 'Costa Rica', 'Portfolio'],
  authors: [{ name: 'José Pablo Campos Sequeira' }],
  openGraph: {
    title: 'José Pablo Campos | UX/UI Designer',
    description: 'UX/UI Designer & Industrial Design Engineer creating digital experiences that matter.',
    url: 'https://jp-campos-portfolio.com',
    siteName: 'JP Campos Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'José Pablo Campos | UX/UI Designer',
    description: 'UX/UI Designer & Industrial Design Engineer creating digital experiences that matter.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-[#0d0d0d] text-slate-100">
        {children}
      </body>
    </html>
  )
}
