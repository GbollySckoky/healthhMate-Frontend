"use client"
import VerifyInput from '@/components/ui/VerifyInput'
import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Hospital_Admin } from '@/lib/service/service'
import { setAuthSession } from '@/lib/service/auth-session'
import { ROUTES } from '@/lib/constant/Routes'
import Link from 'next/link'


const VerifyCode = () => {
  const [otp, setOtp] = useState(Array(6).fill(''))
  const email = useSearchParams().get('email') || ''
  const router = useRouter()
  const [resendTimer, setResendTimer] = useState(60)
  useEffect(() => {
    if (resendTimer <= 0) return
    const timer = setTimeout(() => setResendTimer(value => value - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendTimer])
  const onError = (error: AxiosError<{ message: string }>) => {
    toast.error(error.response?.data?.message || error.message || 'Please try again.')
  }
  const verification = useMutation({
    mutationFn: (verificationCode: string) => Hospital_Admin.verifyHospitalCode(email, { verificationCode }),
    onSuccess: (response) => {
      setAuthSession(response.data.access_token)
      toast.success(response.data.message || 'Email verified successfully')
      router.replace(ROUTES.dashboard)
    },
    onError,
  })
  const resend = useMutation({
    mutationFn: () => Hospital_Admin.resendHospitalCode(email),
    onSuccess: (response) => {
      setResendTimer(60)
      setOtp(Array(6).fill(''))
      toast.success(response.data.message || 'A new verification code has been sent to your email.')
    },
    onError,
  })
  const isLoading = verification.isPending || resend.isPending

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) { // only allow digits
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || isLoading) return
    const code = otp.join('')
    if (!/^\d{6}$/.test(code)) return
    verification.mutate(code)
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-6">
        <h1 className="font-semibold text-xl sm:text-2xl text-[#1B1818] mb-2 font-lato">
          Verify Your Account
        </h1>
        <p className="text-sm text-[#645D5D] font-normal font-lato">
          Enter the 6-digit code we sent to {email || 'your email'}.
        </p>
      </div>

      {!email && <Link href={ROUTES.signUp} className="text-pink-600">Return to sign up</Link>}
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
                <button type="button" disabled={!email || resendTimer > 0 || isLoading}
                  onClick={() => resend.mutate()} className="text-red-800 pl-1 disabled:opacity-50 disabled:cursor-not-allowed">
                  {resend.isPending ? 'Sending…' : 'Resend'}
                </button>
            </div>
            <p className='text-red-800 text-[12px] font-lato font-medium'>{`${Math.floor(resendTimer / 60).toString().padStart(2, '0')}:${(resendTimer % 60).toString().padStart(2, '0')}`}</p>
        </div>
        <button
          type="submit"
          disabled={!email || isLoading || otp.some(d => d === '')}
          className="w-full bg-pink-600 disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-8 font-inter"
        >
          {verification.isPending ? 'Verifying…' : 'Verify Code'}
        </button>
      </form>
    </div>
  )
}

export default function VerifyCodePage() {
  return <Suspense fallback={<p>Loading verification…</p>}><VerifyCode /></Suspense>
}
