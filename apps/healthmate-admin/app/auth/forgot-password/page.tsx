"use client"
import React from 'react'
import Img from '@/components/ui/Image'
import ForgotPassword from './_components/ForgotPassword'
import useStep from '@/lib/hooks/useStep'
import { STEP } from '@/lib/interface/step'
import VerifyCode from './_components/VerifyCode'
import NewPassword from './_components/NewPassword'
import Success from '@/components/ui/Success'
import { ROUTES } from '@/lib/constant/Routes'
import { useRouter } from 'next/navigation'


const Page = () => {
   const {step, handleNextStep} = useStep()
   const router = useRouter()
    return (
        <div className='min-h-screen flex flex-col lg:flex-row bg-white'>
            {/* Left side - Form area */}
            <div className='w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6  h-screen'>
                {/* Form container - centered blue-bordered box */}
             {step === STEP.ZERO && <ForgotPassword handleNextStep={handleNextStep}/>} 
             {step === STEP.ONE && <VerifyCode handleNextStep={handleNextStep} />} 
             {step === STEP.TWO && <NewPassword handleNextStep={handleNextStep} />} 
             {step === STEP.THREE && 
             <Success text="Your password has been updated. You can now log in securely." 
             title="Password Reset Successful" btnText=" Log In" 
             onClick={() => router.push(ROUTES.dashboard)} />} 
            </div>

            {/* Right side - Image (exactly as shown in Figma) */}
           <Img />
        </div>
    )
}

export default Page