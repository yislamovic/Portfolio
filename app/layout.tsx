import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yahya Islamovic | Full Stack / Software Engineer',
  description: 'Portfolio of Yahya Islamovic - Full Stack / Software Engineer with 2.5 years of professional experience building enterprise software with the PERN stack.',
  keywords: ['Full Stack Developer', 'Software Engineer', 'Web Development', 'Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'PERN Stack'],
  authors: [{ name: 'Yahya Islamovic' }],
  creator: 'Yahya Islamovic',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yahyaislamovic.com',
    title: 'Yahya Islamovic | Full Stack / Software Engineer',
    description: 'Portfolio of Yahya Islamovic - Full Stack / Software Engineer with 2.5 years of professional experience.',
    siteName: 'Yahya Islamovic Portfolio',
  },
  twitter: {
    card: 'summary',
    title: 'Yahya Islamovic | Full Stack / Software Engineer',
    description: 'Portfolio of Yahya Islamovic - Full Stack / Software Engineer with 2.5 years of professional experience.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
