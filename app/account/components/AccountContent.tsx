'use client'

import Button from '@/components/Button';
import useSubscribeModal from '@/hooks/useSubscribeModal';
import { useUser } from '@/hooks/useUser';
import { postData } from '@/libs/helpers';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface AccountContentProps {

}

const AccountContent: FC<AccountContentProps> = ({ }) => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');

    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    try {
      setLoading(true);
      const { url, error } = await postData({
        url: '/api/create-portal-link'
      });
      window.location.assign(url);
      if (error) {
        toast.error(error.message);
      }
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false);
    }

  }
  return (
    <div className='mb-7 px-6'>
      {subscription ? (
        <div className="flex flex-col gap-y-4">
          <p> You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.</p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className='w-[300px]'
          >
            Open customer portal
          </Button>
        </div>
      ) : (
        <div className='flex flex-col gap-y-4'>
          <p>No active plan.</p>
          <Button
            onClick={subscribeModal.onOpen}
            className='w-[300px]'
          >
            Subscribe
          </Button>
        </div>
      )}
    </div>
  )
}

export default AccountContent