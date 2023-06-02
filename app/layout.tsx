import Sidebar from '@/components/Sidebar';
import './globals.css';
import { Figtree } from 'next/font/google';
import SuperbaseProvider from '@/providers/SuperbaseProvider';
import UserProvides from '@/providers/UserProvides';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SuperbaseProvider>
          <UserProvides>
            <ModalProvider />
            <Sidebar>
              {children}
            </Sidebar>
          </UserProvides>
        </SuperbaseProvider>
      </body>
    </html>
  )
}
