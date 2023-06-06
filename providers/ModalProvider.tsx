'use client';

import AuthModal from '@/components/AuthModal';
import SubscribeModal from '@/components/SubscribeModal';
import UploadModal from '@/components/UploadModal';
import { ProductWithPrice } from '@/types';
import { FC, useEffect, useState } from 'react';

interface ModalProviderProps {
  products: ProductWithPrice[]
}

const ModalProvider: FC<ModalProviderProps> = ({ products }) => {
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
      <UploadModal />
      <SubscribeModal products={products} />
    </div>
  )
}

export default ModalProvider