"use client"
import AuthNumber from '@/components/Inputs/AuthNumber'
import AuthEmail from '@/components/Inputs/AuthEmail'
import AuthInput from '@/components/Inputs/AuthInput'
import { useHospitalForm } from '@/lib/context/HospitalContextForm'
import Image from './Image'



const Hospital = ({handleNextStep}: {handleNextStep: () => void}) => {
  const {hospitalFormData, updateHospitalData} = useHospitalForm()

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
          value={hospitalFormData.register.hospitalName ? String(hospitalFormData.register.hospitalName) : ''}
          name='hospitalName'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            updateHospitalData({ hospitalName: e.target.value })
          }
        />
        <AuthInput
          label='Registration/ Liscense number'
          placeholder='2571e'
          value={hospitalFormData.register.liscenseNumber ? String(hospitalFormData.register.liscenseNumber) : ''}
          name='liscenseNumber'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            updateHospitalData({ liscenseNumber: e.target.value })
          }
        />
        <div className="flex items-center gap-3">
          <AuthInput
            label='Address '
            placeholder='Enter address'
            value={hospitalFormData.register.address ? String(hospitalFormData.register.address) : ''}
            name='address'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              updateHospitalData({ address: e.target.value })
            }
          />
          <AuthInput
            label='State'
            placeholder='Enter Region'
            value={hospitalFormData.register.state ? String(hospitalFormData.register.state) : ''}
            name='state'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              updateHospitalData({ state: e.target.value })
            }
          />
        </div>
        <AuthEmail
          label='Email'
          placeholder='admin@example.com'
          value={hospitalFormData.register.email ? String(hospitalFormData.register.email) : ''}
          name='email'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            updateHospitalData({ email: e.target.value })
          }
        />
        <AuthNumber
          label='Phone Number (optional)'
          placeholder='+234907833'
          value={hospitalFormData?.register?.phoneNumber ? String(hospitalFormData.register.phoneNumber) : ''}
          name='phoneNumber'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            updateHospitalData({ phoneNumber: e.target.value })
          }
        />
        <Image />
        <button 
          type="button"
          className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg font-semibold w-full mt-5 text-[14px] font-inter" 
          onClick={() => handleNextStep()}
        >
          Continue
        </button>
      </form>
    </div>
  )
}

export default Hospital