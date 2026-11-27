import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
  metadataBase: new URL('https://jp-campos-portfolio.com'),
  title: 'José Pablo Campos | Senior Product Designer',
  description: 'Senior Product Designer specializing in enterprise products, complex workflows, analytics dashboards and scalable design systems.',
  keywords: ['Senior Product Designer', 'Enterprise UX', 'B2B SaaS', 'Analytics Dashboards', 'UX Research', 'Design Systems', 'Costa Rica'],
  authors: [{ name: 'José Pablo Campos Sequeira' }],
  openGraph: {
    title: 'José Pablo Campos | Senior Product Designer',
    description: 'Turning complex business problems into intuitive digital products.',
    url: 'https://jp-campos-portfolio.com',
    siteName: 'JP Campos Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'José Pablo Campos | Senior Product Designer',
    description: 'Turning complex business problems into intuitive digital products.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-[#080808] text-[#efefef]">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
