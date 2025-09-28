"use client"
import Image from 'next/image'
import image from '@/assets/Group 19156.png'
import { STEP } from '@/lib/step'

const GetStarted = ({handleNextStep}: {handleNextStep: (value: number) => void}) => {
  return (
    <div 
      className="h-screen relative flex items-center justify-center img" 
    >
      {/* Overlay */}
      <div className="bg-[#a3a7ad] opacity-40 absolute inset-0"></div>

      {/* Card */}
      <div className="relative bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center ">
        <Image src={image} alt="Health-Image" className="mx-auto mb-4 " />
        <h1 className="text-[20px] font-lato font-semibold text-[#1B1818]">
          Register Your Hospital
        </h1>
        <p className="font-lato text-[16px] font-normal text-[#645D5D] mb-6">
          Join our platform to manage your doctors digitally
        </p>

        <ul className="text-left text-[14px] space-y-3 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-pink-600">✔</span> Offer remote consultations to patients across within the country.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-600">✔</span> Stay compliant with each country’s telehealth regulations.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-600">✔</span> Get paid seamlessly from global patients in one secure transfer.
          </li>
        </ul>

        <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg font-semibold w-full" onClick={() => handleNextStep(STEP.ONE)}>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default GetStarted
