import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movement Template App',
  description:
    'Start your Movement journey here, without unnecessary configuration and setup. Just clone it and code on top of it. Powered by Nightly Wallet.',
  twitter: {
    title: 'Movement Template App',
    description:
      'Start your Movement journey here, without unnecessary configuration and setup. Just clone it and code on top of it. Powered by Nightly Wallet.',
    images: 'https://movement-web3-template.nightly.app/metatag.png',
    card: 'summary_large_image',
    site: '@nightly_app',
  },
  openGraph: {
    title: 'Movement Template App',
    description:
      'Start your Movement journey here, without unnecessary configuration and setup. Just clone it and code on top of it. Powered by Nightly Wallet.',
    images: 'https://movement-web3-template.nightly.app/metatag.png',
    url: 'https://movement-web3-template.nightly.app',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
