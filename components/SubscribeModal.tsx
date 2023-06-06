'use client'

import { FC, useState } from 'react'
import Modal from './Modal'
import { Price, ProductWithPrice } from '@/types'
import Button from './Button'
import { useUser } from '@/hooks/useUser'
import { toast } from 'react-hot-toast'
import { postData } from '@/libs/helpers'
import { getStripe } from '@/libs/stripeClient'
import useSubscribeModal from '@/hooks/useSubscribeModal'

interface SubscribeModalProps {
  products: ProductWithPrice[]
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);
  return priceString
}

const SubscribeModal: FC<SubscribeModalProps> = ({ products }) => {
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();
  const [priceIdLoading, setPriceIdLoading] = useState<string | null>(null);
  const onChange = (open: boolean) => {
    if(!open){
      subscribeModal.onClose()
    }
  }
  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(null);
      return toast.error('Must be logged in');
    }
    if (subscription) {
      setPriceIdLoading(null);
      return toast('Already subscribed');
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      })
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch(error: any) {
      toast.error(error.message)
    } finally {
      setPriceIdLoading(null)
    }
  }
  let content = (
    <div className='text-center'>
      No Products available.
    </div>
  );
  if (products.length) {
    content = (
      <div>
        {products.map(product => {
          if (!product.prices?.length) {
            return (
              <div key={product.id}>
                No Prices available
              </div>
            )
          } else {
            return product.prices.map(price => (
              <Button
                key={price.id}
                onClick={() => handleCheckout(price)}
                disabled={isLoading || price.id === priceIdLoading}
                className='mb-4'
              >
                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
              </Button>
            ))
          }
        })}
      </div>
    )
  }
  if(subscription) {
    content = (
      <div className='text-center'>
        Already subscribe
      </div>
    )
  }

  return (
    <Modal
      title='Only for premium users'
      description='Listen to music with Spotify Premium'
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  )
}

export default SubscribeModal