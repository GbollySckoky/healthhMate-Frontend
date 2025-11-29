"use client"
import react from 'react'
import CreateAccount from './_components/CreateAccount'
import { STEP } from '@/lib/step'
import useStep from '@/hooks/useStep'
import VerifyCode from './_components/VerifyCode'
import GetStarted from './_components/GetStarted'
import Success from '@/components/ui/Success'
import {useRouter } from 'next/navigation'
import Img from '@/components/ui/Image'
import { ROUTES } from '@/lib/Routes'

const Page = () => {
    const {step, handleNextStep} = useStep()
    const router = useRouter()
    return(
        <div>
            {step === STEP.ZERO && <GetStarted handleNextStep={handleNextStep} /> }
            <div className='min-h-screen flex flex-col lg:flex-row bg-white'>
            <div className='w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6  h-screen'>
                {step === STEP.ONE && <CreateAccount handleNextStep={handleNextStep} /> }
                {/* {step === STEP.TWO && <VerifyCode handleNextStep={handleNextStep}/> } */}
                {step === STEP.TWO &&
                <Success text="You're just a few steps away from setting up your complete hospital management system." 
                title="Welcome to HealthMate" btnText="Get Started" 
                onClick={() => router.push(ROUTES.setUpHospital)} /> }
                </div>
                <Img />
            </div>
        </div>
    )
}

export default Page
