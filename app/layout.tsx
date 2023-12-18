import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'movement Template App',
  description:
    'Start your movement journey here, without unnecessary configuration and setup. Just clone it and code on top of it. Powered by Nightly Wallet.',
  twitter: {
    title: 'movement Template App',
    description:
      'Start your movement journey here, without unnecessary configuration and setup. Just clone it and code on top of it. Powered by Nightly Wallet.',
    images: 'https://movement-web3-template.nightly.app/preview.png',
    card: 'summary_large_image',
    site: '@nightly_app',
  },
  openGraph: {
    title: 'movement Template App',
    description:
      'Start your movement journey here, without unnecessary configuration and setup. Just clone it and code on top of it. Powered by Nightly Wallet.',
    images: 'https://movement-web3-template.nightly.app/preview.png',
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
