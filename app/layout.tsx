import Sidebar from '@/components/Sidebar';
import './globals.css';
import { Figtree } from 'next/font/google';
import SuperbaseProvider from '@/providers/SuperbaseProvider';
import UserProvides from '@/providers/UserProvides';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SuperbaseProvider>
          <UserProvides>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
          </UserProvides>
        </SuperbaseProvider>
      </body>
    </html>
  )
}
