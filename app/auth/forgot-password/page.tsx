"use client"
import React from 'react'
import Img from '@/components/ui/Image'
import ForgotPassword from './_components/ForgotPassword'
import useStep from '@/hooks/useStep'
import { STEP } from '@/lib/step'
import VerifyCode from './_components/VerifyCode'
import NewPassword from './_components/NewPassword'
import Success from './_components/Success'

const Page = () => {
   const {step, handleNextStep} = useStep()

    return (
        <div className='min-h-screen flex flex-col lg:flex-row bg-white'>
            {/* Left side - Form area */}
            <div className='w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6  h-screen'>
                {/* Form container - centered blue-bordered box */}
             {step === STEP.ZERO && <ForgotPassword handleNextStep={handleNextStep}/>} 
             {step === STEP.ONE && <VerifyCode handleNextStep={handleNextStep} />} 
             {step === STEP.TWO && <NewPassword handleNextStep={handleNextStep} />} 
             {step === STEP.THREE && <Success  />} 
            </div>

            {/* Right side - Image (exactly as shown in Figma) */}
           <Img />
        </div>
    )
}

export default Page