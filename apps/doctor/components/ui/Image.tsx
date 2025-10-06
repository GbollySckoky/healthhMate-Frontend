import React from 'react'
import LoginImage from '@/assets/image 14.png'
import Image from 'next/image'

const Img = () => {
    return (
     <div className='w-full lg:w-1/2 h-64 sm:h-80 lg:h-screen relative hidden lg:block'>
        <Image 
            src={LoginImage} 
            alt='Hospital admin login illustration' 
            fill
            className='object-contain lg:object-cover'
            priority
        />
    </div>
  )
}

export default Img