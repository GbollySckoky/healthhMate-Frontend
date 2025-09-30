"use client"
import { useHospitalForm } from '@/context/Context'
import AuthNumber from '@/components/Inputs/AuthNumber'
import AuthEmail from '@/components/Inputs/AuthEmail'
import AuthInput from '@/components/Inputs/AuthInput'

const Hospital = ({handleNextStep}: {handleNextStep: () => void}) => {
    const {hospitalFormData, updateChecklistData} = useHospitalForm()

  return (
    <div>
    <p className="text-[30px] font-lato font-semibold text-[#1B1818] text-center ">
        Set Up Your Hospital
    </p>
    <p className="font-lato text-[13px] mt-1 mb-4 font-normal text-[#645D5D]  text-center ">
        Join our platform to manage your doctors digitally
    </p>
    <form action="">
    <AuthInput
        label='Hospital Name'
        placeholder='Enter your name'
        value={hospitalFormData.hospital.hospitalName ?? ''}
        name='hospitalName'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('hospital','hospitalName',e.target.value)}
    />
    <AuthInput
        label='Registration/ Liscense number'
        placeholder='2571e'
        value={hospitalFormData.hospital.liscenseNumber ?? ''}
        name='liscenseNumber'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('hospital','liscenseNumber',e.target.value)}
    />
    <div className="flex items-center gap-3">
    <AuthInput
        label='Address '
        placeholder='Enter address'
        value={hospitalFormData.hospital.address ?? ''}
        name='address'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('hospital','address',e.target.value)}
    />
        <AuthInput
        label='State'
        placeholder='Enter Region'
        value={hospitalFormData.hospital.state ?? ''}
        name='state'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('hospital','state',e.target.value)}
    />
    </div>
    <AuthEmail
        label='Email'
        placeholder='admin@example.com'
        value={hospitalFormData.hospital.email ?? ''}
        name='email'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('hospital','email',e.target.value)}
    />
    <AuthNumber
        label='Phone Number (optional)'
        placeholder='+234907833'
        value={hospitalFormData?.hospital?.phoneNumber ?? ''}
        name='phoneNumber'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChecklistData('hospital','phoneNumber',e.target.value)}
    />
    <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg font-semibold w-full mt-5 text-[14px] font-inter" onClick={() => handleNextStep()}>
        Continue
    </button>
    </form>
    </div>
  )
}

export default Hospital
