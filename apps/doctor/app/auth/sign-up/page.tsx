"use client"
import CreateAccount from './_components/CreateAccount'
import { STEP } from '@/lib/step'
import useStep from '@/hooks/useStep'
import GetStarted from './_components/GetStarted'
import Success from './_components/Success'
import {useRouter } from 'next/navigation'
import Img from '@/components/ui/Image'
import PersonalInformation from './_components/PersonalInformation'
import Consultation from './_components/Consultation'
import Verification from './_components/Verification'

const Page = () => {
    const {step, handleNextStep, handlePreviousStep} = useStep()
    const router = useRouter()
    return(
        <div>
            {step === STEP.ZERO && <GetStarted handleNextStep={handleNextStep} /> }
            <div className='min-h-screen flex flex-col lg:flex-row bg-white'>
            <div className='w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6  h-screen'>
                {step === STEP.ONE && <CreateAccount handleNextStep={handleNextStep} /> }
                {step === STEP.TWO && <PersonalInformation handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep}/> }
                {step === STEP.THREE && <Consultation handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep}/> }
                {step === STEP.FOUR && <Verification handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep}/> }
                {step === STEP.FIVE && <Success /> }
                </div>
               <Img />
            </div>
        </div>
    )
}

export default Page
