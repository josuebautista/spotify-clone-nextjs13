'use client';

import AuthModal from '@/components/AuthModal';
import { FC, useEffect, useState } from 'react';

interface ModalProviderProps {

}

const ModalProvider: FC<ModalProviderProps> = ({ }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if(!isMounted) {
    return null;
  }
  
  return (
    <div>
      <AuthModal />
    </div>
  )
}

export default ModalProvider