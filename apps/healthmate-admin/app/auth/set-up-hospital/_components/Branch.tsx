"use client"
import { useHospitalForm } from '@/lib/context/HospitalContextForm'
import AuthNumber from '@/components/Inputs/AuthNumber'
import AuthInput from '@/components/Inputs/AuthInput'

const Branch = ({handleNextStep}: {handleNextStep: () => void}) => {
  const {hospitalFormData, updateHospitalData} = useHospitalForm()
  
  return (
    <div>
      <p className="text-[30px] font-lato font-semibold text-[#1B1818] text-center mb-3">
        Add Hospital Branch
      </p>
      <form action="">
        <AuthInput
          label='Branch Name'
          placeholder='Evercare Hospital Lekki'
          value={hospitalFormData.register.branchName ? String(hospitalFormData.register.branchName) : ''}
          name='branchName'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            updateHospitalData({ branchName: e.target.value })
          }
        />
        <AuthInput
          label='Branch Address'
          placeholder='Enter address'
          value={hospitalFormData.register.branchAddress ? String(hospitalFormData.register.branchAddress) : ''}
          name='branchAddress'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            updateHospitalData({ branchAddress: e.target.value })
          }
        />
        <AuthInput
          label='State'
          placeholder='Lagos'
          value={hospitalFormData.register.branchState ? String(hospitalFormData.register.branchState) : ''}
          name='branchState'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            updateHospitalData({ branchState: e.target.value })
          }
        />
        <AuthNumber
          label='Phone Number (optional)'
          placeholder='+234907833'
          value={hospitalFormData.register.branchPhoneNumber ? String(hospitalFormData.register.branchPhoneNumber) : ''}
          name='branchPhoneNumber'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            updateHospitalData({ branchPhoneNumber: e.target.value })
          }
        />
        <button 
          type="button"
          className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg font-semibold w-full mt-5 text-[14px] font-inter" 
          onClick={() => handleNextStep()}
        >
          Next
        </button>
      </form>
      <p className='font-inter text-[14px] font-semibold text-center cursor-pointer mt-4 text-[#535862]'>
        Skip for now 
      </p>
    </div>
  )
}

export default Branch