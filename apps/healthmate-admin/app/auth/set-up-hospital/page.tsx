"use client"
import { HospitalFormProvider } from '@/context/Context'
import React from 'react'
import Hospital from './_components/Hospital'
import useStep from '@/hooks/useStep'
import { STEP } from '@/lib/step'
import Branch from './_components/Branch'
import Doctor from './_components/Doctor'
import Success from './_components/Success'

const page = () => {
  const {step, handleNextStep} = useStep()
  return (
    <HospitalFormProvider>
      <div 
      className="h-screen relative flex items-center justify-center img" 
    >
      {/* Overlay */}
      <div className="bg-[#a3a7ad] opacity-40 absolute inset-0"></div>

      {/* Card */}
        <div className="relative bg-white rounded-2xl p-8 shadow-lg max-w-lg w-full">
          {step === STEP.ZERO && <Hospital handleNextStep={handleNextStep}/> }
          {step === STEP.ONE && <Branch handleNextStep={handleNextStep}/> }
          {step === STEP.TWO && <Doctor handleNextStep={handleNextStep}/> }
          {step === STEP.THREE && <Success handleNextStep={handleNextStep}/> }
        </div>
      </div>
    </HospitalFormProvider>
  )
}

export default page