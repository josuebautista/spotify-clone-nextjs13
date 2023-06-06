'use client'

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import { FC } from 'react';
import liked from '@/public/images/liked.png';
import usePlayer from '@/hooks/usePlayer';

interface MediaItemProps {
  onClick?: (id: string) => void
  item: Song
}

const MediaItem: FC<MediaItemProps> = ({ item, onClick }) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(item);
  const handleClick = () => {
    if (onClick) {
      return onClick(item.id)
    }
    return player.setId(item.id)
  }
  return (
    <div onClick={() => handleClick()} className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md'>
      <div className='relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'>
        <Image
          fill
          src={imageUrl || liked}
          alt={`${item.title} picture`}
          className='object-cover'
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">
          {item.title}
        </p>
        <p className="text-neutral-400 text-sm truncate">
          {item.author}
        </p>
      </div>
    </div>
  )
}

export default MediaItem;