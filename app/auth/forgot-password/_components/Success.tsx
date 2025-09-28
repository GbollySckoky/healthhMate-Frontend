"use client"
import React from 'react'
import SuccessImage from '@/assets/success.png'
import Image from 'next/image'
import { ROUTES } from '@/lib/Routes'
import { useRouter } from 'next/navigation'

const Success = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="bg-red-50 p-4 rounded-full mb-6">
        <Image 
          src={SuccessImage} 
          alt="Success" 
          width={80} 
          height={80} 
        />
      </div>

      <div className="mb-4">
        <h1 className="font-semibold text-2xl text-[#1B1818] mb-2 font-lato">
          Password Reset Successful
        </h1>
        <p className="text-sm text-[#645D5D] font-normal font-lato">
          Your password has been updated. You can now log in securely.
        </p>
      </div>

      <button
        type="button"
        className="w-full bg-pink-600 hover:bg-pink-500 disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-4 font-inter max-w-sm"
        onClick={() => router.push(ROUTES.dashboard)}
      >
        Log In
      </button>
    </div>
  )
}

export default Success
