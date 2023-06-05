import getSongsByTitle from '@/actions/getSongsByTitle'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import { FC } from 'react'
import SearchContent from './components/SearchContent'

interface SearchPageProps {
  searchParams: {
    title: string
  }
}

const SearchPage = async ({searchParams}: SearchPageProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header className='from-bg-neutral-900'>
        <div className="mb-2 flex flex-col gap-y-6">
          <div className="text-white text-3xl font-semibold">
            <h1>Search</h1>
            <SearchInput />
          </div>
        </div>
      </Header>
      <SearchContent song={songs} />
    </div>
  )
}

export default SearchPage