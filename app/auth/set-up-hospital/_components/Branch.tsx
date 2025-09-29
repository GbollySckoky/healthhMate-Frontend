"use client"
import { useHospitalForm } from '@/context/Context'
import AuthNumber from '@/components/Inputs/AuthNumber'
import AuthInput from '@/components/Inputs/AuthInput'

const Doctor = ({handleNextStep}: {handleNextStep: () => void}) => {
    const {hospitalFormData, updateChecklistData} = useHospitalForm()
  return (
    <div>
        <p className="text-[30px] font-lato font-semibold text-[#1B1818] text-center  mb-3">
         Add Hospital Branch
        </p>
        <form action="">
        <AuthInput
            label='Branch Name'
            placeholder='Evercare Hospital Lekki'
            value={hospitalFormData.hospital.branchName ?? ''}
            name='branchName'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('branch','branchName',e.target.value)}
        />
        <AuthInput
            label='Branch Address '
            placeholder='Enter address'
            value={hospitalFormData.hospital.address ?? ''}
            name='address'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('branch','address',e.target.value)}
        />
         <AuthInput
            label='State'
            placeholder='Lagos'
            value={hospitalFormData.hospital.state ?? ''}
            name='state'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('branch','state',e.target.value)}
        />
        <AuthNumber
            label='Phone Number (optional)'
            placeholder='+234907833'
            value={hospitalFormData?.hospital?.phoneNumber ?? ''}
            name='phoneNumber'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('branch','phoneNumber',e.target.value)}
        />
        <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg font-semibold w-full mt-5 text-[14px] font-inter" onClick={() => handleNextStep()}>
          Next
        </button>
        </form>
        <p  className='font-inter text-[14px] font-semibold text-center cursor-pointer mt-4 text-[#535862]'>Skip for now </p>
    </div>

  )
}

export default Doctor
