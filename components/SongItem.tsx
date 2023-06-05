'use client'

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import { FC } from 'react';
import liked from '@/public/images/liked.png';
import PlayButton from './PlayButton';

interface SongItemProps {
  song: Song
  onClick: (id: string) => void
}

const SongItem: FC<SongItemProps> = ({song, onClick}) => {
  const imagePath = useLoadImage(song);
  console.log('imagePath: ', imagePath)
  return (
    <div 
    className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400-5 cursor-pointer hover:bg-neutral-400/10 p-3'
    onClick={() => onClick(song.id)}
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image src={imagePath || liked} fill alt={`${song.title} picture`}/>
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className='font-semibold truncate w-full'>
          {song.title}
        </p>
        <p className='text-neutral-400 text-sm pb-4 w-full truncate'>
          By {song.author}
        </p>
      </div>
      <div className="absolute bottom-224 right-5">
        <PlayButton />
      </div>
    </div>
  )
}

export default SongItem