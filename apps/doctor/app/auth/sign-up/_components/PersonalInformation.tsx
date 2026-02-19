"use client"
import AuthInput from '@/components/ui/AuthInput'
import { STEP } from '@/lib/step'
import TextArea from '@/components/ui/TextArea'
import { ArrowLeft } from 'lucide-react'
import AuthNumber from '@/components/ui/AuthNumber'
import { useDoctorForm } from '@/lib/context/DoctorFormContext'


const PersonalInformation = ({handleNextStep, handlePreviousStep}: {handleNextStep: (value: number) => void, handlePreviousStep: () => void}) => {
   
    const {doctorFormData, updateDoctorData} = useDoctorForm() 

    const disabled = !doctorFormData.signup.specialization || !doctorFormData.signup.experience || !doctorFormData.signup.bio
    
    return(
        <div className=' w-full max-w-md'>
          <div className="flex items-center space-x-2 mb-4">
            <span onClick={handlePreviousStep} className='cursor-pointer'> <ArrowLeft size={15} /> </span>
            <p className='text-[11px] font-normal text-[#535862]'>Back</p>
          </div>
            <h1 className='font-semibold text-2xl sm:text-2xl text-[#1B1818] mb-3 font-lato'>Professional Information</h1>
            <form  className='space-y-4'>
                <AuthInput
                    label='Specialization'
                    placeholder='Dermatologist'
                    value={doctorFormData.signup.specialization ? String(doctorFormData.signup.specialization) : ""}
                    name='specialization'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({specialization: e.target.value})}
                />
                <AuthNumber
                    label='Years of Experience'
                    placeholder='7years'
                    value={doctorFormData.signup.experience ? String(doctorFormData.signup.experience) : ""}
                    name='experience'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({experience: e.target.value})}
                />
                <TextArea 
                  placeholder='Short description for patients'
                  label='Bio'
                  value={doctorFormData.signup.bio ? String(doctorFormData.signup.bio) : ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({bio: e.target.value})}
                  name='bio'
                />

                {/* Login button - pink background */}
                <button 
                    type='submit'
                    disabled={disabled}
                    className='w-full bg-pink-600  disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-6 font-inter'
                    onClick={() => handleNextStep(STEP.THREE)}
                >
                    Next
                </button>
                <p  className='font-inter text-[14px] font-semibold text-center cursor-pointer mt-4 text-[#535862]'>Skip for now </p>
            </form>
        </div>
    )
}

export default PersonalInformation
