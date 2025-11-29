"use client"
import React from 'react'
import Hospital from './_components/Hospital'
import useStep from '@/hooks/useStep'
import { STEP } from '@/lib/step'
import Branch from './_components/Branch'
import Doctor from './_components/Doctor'
import Success from './_components/Success'
import { HospitalFormProvider } from '@/lib/context/HospitalContextForm'


// Separate component that uses the context
const HospitalSetupContent = () => {
  const {step, handleNextStep} = useStep()
  

  return (
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
  )
}

const Page = () => {
  return (
    <HospitalFormProvider>
      <HospitalSetupContent />
    </HospitalFormProvider>
  )
}

export default Page