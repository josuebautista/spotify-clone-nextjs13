'use client'

import { MyUserContextProvider } from '@/hooks/useUser';
import { FC, ReactNode } from 'react';

interface UserProvidesProps {
  children: ReactNode
}

const UserProvides: FC<UserProvidesProps> = ({ children }) => {
  return (
    <MyUserContextProvider>
      {children}
    </MyUserContextProvider>
  )
}

export default UserProvides;