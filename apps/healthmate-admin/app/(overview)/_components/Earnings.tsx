"use client"

import React from 'react'
import {
  Eye,
  EyeClosed
} from 'lucide-react'

import {
  DisplayFlex,
} from '@/components/ui/Reusable'

import useToggle from '@/lib/hooks/useToggle'
import useGetEarningStats from '@/lib/hooks/useGetEarningStats'
import { ROUTES } from '@/lib/constant/Routes'
import { useRouter } from 'next/navigation'


const Earnings = () => {
  const router = useRouter()
  const { isToggle, handleToggle } = useToggle()

  const {
    earningStats,
    isLoading: earningLoading,
    isError,
    error,
  } = useGetEarningStats()


  // Loading Skeleton
  if (earningLoading) {
    return (
      <div className="bg-white rounded-lg p-4 w-[350px] h-[170px] border border-borderColor animate-pulse">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div className="h-5 w-40 bg-gray-200 rounded-md" />

          <div className="h-5 w-5 bg-gray-200 rounded-full" />

        </div>


        {/* Balance */}
        <div className="flex justify-center my-5">

          <div className="h-8 w-44 bg-gray-200 rounded-md" />

        </div>


        {/* Button */}
        <div className="flex justify-center">

          <div className="h-10 w-32 bg-gray-200 rounded-lg" />

        </div>

      </div>
    )
  }


  if (isError) {
    return (
      <div className="bg-white rounded-lg p-4 w-[350px] min-h-[170px] border border-borderColor flex items-center justify-center">
        <p className="text-center text-sm text-gray-500">
          {error instanceof Error ? error.message : 'Failed to load earnings. Please try again.'}
        </p>
      </div>
    )
  }


  return (
    <div className="bg-white rounded-lg p-4 w-[350px] h-[170px] border border-borderColor">

      <DisplayFlex>

        <p className="font-libre text-grey-200 font-medium text-[16px]">
          Available Balance
        </p>

        <button
          type="button"
          aria-label={isToggle ? 'Hide balance' : 'Show balance'}
          aria-pressed={isToggle}
          className="text-red-900 cursor-pointer"
          onClick={handleToggle}
        >
          {isToggle
            ? <Eye size={18} />
            : <EyeClosed size={18} />
          }
        </button>

      </DisplayFlex>


      <p className="font-lato text-[24px] font-bold text-red-900 my-3 text-center">

        {isToggle
          ? `₦${Number(
              earningStats?.successfulAmount ?? 0
            ).toLocaleString()}`
          : '******'
        }

      </p>


      <div className="flex justify-center">

        <button className="border border-borderColor rounded-lg px-3 py-2 text-sm" onClick={() => router.push(ROUTES.earnings)}>
          View Details
        </button>

      </div>

    </div>
  )
}

export default Earnings