import React from 'react'
import image from '@/assets/Image.png'
import Image from 'next/image'
import { messages } from '@/components/ui/data'

const Closed = () => {
  return (
    <div className="w-full border-y border-borderColor py-5 space-y-4">
      {messages.map((message, index) => (
        <div key={index} className="flex w-full">
          <Image
            src={image}
            alt={`${message.name}'s profile picture`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col ml-2 w-full">
            <div className="flex items-center justify-between">
              <p className="text-sm font-inter text-grey-900 font-semibold text-[14px]">
                {message.name}
              </p>
              <p className="font-inter text-[12px] font-medium text-red-800">
                {message.time}
              </p>
            </div>
            <div className="flex items-center justify-between pt-[1px]">
              <p className="font-inter text-[#667185] font-medium text-[14px] flex-1 truncate">
                {message.text}
              </p>
              <p
                className="bg-red-800 rounded-full text-white font-inter text-[12px] h-fit px-2 py-[1.5px]"
                aria-label={`${message.count} new messages`}
              >
                {message.count}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Closed
