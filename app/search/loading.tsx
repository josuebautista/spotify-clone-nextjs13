'use client'

import Box from '@/components/Box';
import { FC } from 'react';
import { Waveform } from '@uiball/loaders'

interface loadingProps {
  
}

const Loading: FC<loadingProps> = ({}) => {
  return (
    <Box className='h-full flex items-center justify-center text-neutral-400'>
      <Waveform size={40} color='#22c55e' />
    </Box>
  )
}

export default Loading