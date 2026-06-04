"use client"
import VerifyInput from '@/components/ui/VerifyInput'
import React, { useState } from 'react'
import Link from 'next/link'
import { STEP } from '@/lib/interface/step'


const VerifyCode = () => {
  const [otp, setOtp] = useState(Array(6).fill(''))
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) { // only allow digits
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // handleNextStep(STEP.THREE)
    setIsLoading(true)

    // try {
    //   const code = otp.join('')
    //   console.log('Verification attempt:', code)

    //   // simulate API call
    //   await new Promise(resolve => setTimeout(resolve, 1000))

    //   // handle success (redirect, etc.)
    // } catch (error) {
    //   console.error('Verification error:', error)
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-6">
        <h1 className="font-semibold text-xl sm:text-2xl text-[#1B1818] mb-2 font-lato">
          Verify Reset Code
        </h1>
        <p className="text-sm text-[#645D5D] font-normal font-lato">
          Enter the 6-digit code we sent to your phone/email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-5">
          {otp.map((digit, index) => (
            <VerifyInput
              key={index}
              placeholder="•"
              value={digit}
              name={`digit-${index}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, index)
              }
            />
          ))}
        </div>
        <div className="flex items-center justify-between pb-2 pt-4">
            <div className="flex items-center text-[14px] font-medium font-lato">
                <p className=' text-[#717680]'>Didn’t receive OTP? </p>
                <Link href="#" className='text-red-800 pl-1'>Resend</Link>
            </div>
            <p className='text-red-800 text-[12px] font-lato font-medium'>00:30</p>
        </div>
        <button
          type="submit"
          disabled={isLoading || otp.some(d => d === '')}
          className="w-full bg-pink-600 disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-8 font-inter"
        >
          {isLoading ? 'Verifying…' : 'Verify Code'}
        </button>
      </form>
    </div>
  )
}

export default VerifyCode
