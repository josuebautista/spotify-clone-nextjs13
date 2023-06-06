import Header from '@/components/Header'
import { FC } from 'react'
import AccountContent from './components/AccountContent'

interface AccountPageProps {
  
}

const AccountPage: FC<AccountPageProps> = ({}) => {
  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header className='from-bg-neutral-900'>
        <div className='mb-2 flex flex-col gap-y-6'>
          <div className="text-white text-3xl font-semibold">
            Account Settings
          </div>
        </div>
      </Header>
      <AccountContent />
    </div>
  )
}

export default AccountPage