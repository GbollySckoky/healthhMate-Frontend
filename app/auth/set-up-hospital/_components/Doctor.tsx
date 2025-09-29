"use client"
import { useHospitalForm } from '@/context/Context'
import AuthNumber from '@/components/Inputs/AuthNumber'
import AuthEmail from '@/components/Inputs/AuthEmail'
import AuthInput from '@/components/Inputs/AuthInput'
import DateInput from '@/components/Inputs/Date'
import { DisplayFlex } from '@/components/ui/Reusable'

const Doctor = ({handleNextStep}: {handleNextStep: () => void}) => {
    const {hospitalFormData, updateChecklistData} = useHospitalForm()
  return (
    <div>
        <p className="text-[30px] font-lato font-semibold text-[#1B1818] text-center  mb-3">
         Add your first doctor
        </p>
        <form action="">
        <DisplayFlex>
            <AuthInput
                label='Branch Name'
                placeholder='Evercare Hospital Lekki'
                value={hospitalFormData.hospital.branchName ?? ''}
                name='branchName'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('doctor','branchName',e.target.value)}
            />
            <AuthEmail
                label='Email'
                placeholder='admin@example.com'
                value={hospitalFormData.hospital.email ?? ''}
                name='email'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('doctor','email',e.target.value)}
            />
        </DisplayFlex>
        <DisplayFlex>
            <DateInput 
                label='Date of birth'
                placeholder='17/09/2007'
                value={hospitalFormData.hospital.dob ?? ''}
                name='dob'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('doctor','bob',e.target.value)}
            />
            <AuthInput
                label='Gender'
                placeholder='Male/Female'
                value={hospitalFormData.hospital.gender ?? ''}
                name='gender'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('doctor','gender',e.target.value)}
            />
        </DisplayFlex>
        <DisplayFlex>
            <AuthNumber
                label='Phone Number (optional)'
                placeholder='+234907833'
                value={hospitalFormData?.hospital?.phoneNumber ?? ''}
                name='phoneNumber'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('doctor','phoneNumber',e.target.value)}
            />
            <AuthInput
                label='Specialty'
                placeholder='Dermatologist'
                value={hospitalFormData.hospital.specialty ?? ''}
                name='specialty'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('doctor','specialty',e.target.value)}
             />
        </DisplayFlex>
        <DisplayFlex>
            <AuthInput
                label='Branch Assignment (optional)'
                placeholder='Lagos'
                value={hospitalFormData.hospital.branchAssignment ?? ''}
                name='branchAssignment'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('doctor','branchAssignment',e.target.value)}
            />
            <AuthInput
                label='Liscense number'
                placeholder='2571exxxx92'
                value={hospitalFormData.hospital.liscenseNumber ?? ''}
                name='liscenseNumber'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('doctor','liscenseNumber',e.target.value)}
            />
        </DisplayFlex>
            <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg font-semibold w-full mt-5 text-[14px] font-inter" onClick={() => handleNextStep()}>
                Finish Set Up
            </button>
            </form>
            <p  className='font-inter text-[14px] font-semibold text-center cursor-pointer mt-4 text-[#535862]'>Skip for now </p>
    </div>

  )
}

export default Doctor


