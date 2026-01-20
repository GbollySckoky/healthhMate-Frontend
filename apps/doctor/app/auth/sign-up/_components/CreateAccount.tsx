"use client"

import AuthEmail from '@/components/ui/AuthEmail'
import AuthPassword from '@/components/ui/AuthPassword'
import AuthInput from '@/components/ui/AuthInput'
import AuthNumber from '@/components/ui/AuthNumber'
import { STEP } from '@/lib/step'
import { useDoctorForm } from '@/lib/context/DoctorFormContext'

const CreateAccount = ({handleNextStep}: {handleNextStep: (value: number) => void}) => {
    const {updateDoctorData, doctorFormData} = useDoctorForm()

    const disabled =  !doctorFormData.signup.fullName || !doctorFormData.signup.workEmail || !doctorFormData.signup.gender
    !doctorFormData.signup.dob || !doctorFormData.signup.phoneNumber || !doctorFormData.signup.password || !doctorFormData.signup.confirmPassword
    
    return(
        <div className=' w-full max-w-md'>
            <h1 className='font-semibold text-2xl sm:text-2xl text-[#1B1818] mb-3 font-lato'>Personal Details</h1>
            <form className='space-y-4'>
                <AuthInput
                    label='Full Name'
                    placeholder='Enter your name'
                    value={doctorFormData.signup.fullName ? String(doctorFormData.signup.fullName) : ''}
                    name='fullName'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({fullName: e.target.value})}
                />
                <AuthEmail
                    label='Work Email'
                    placeholder='admin@example.com'
                    value={doctorFormData.signup.workEmail ? String(doctorFormData.signup.workEmail) : ""}
                    name='workEmail'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({workEmail: e.target.value})}
                />
                <div className='w-full'>
                    <p className={`font-medium text-[12px] font-inter text-[#414651] `}>Gender</p>
                    <select 
                        name="gender" 
                        id="gender" 
                        value={doctorFormData.signup.gender ? String(doctorFormData.signup.gender) : ""} 
                        onChange={(e: any) => updateDoctorData({gender: e.target.value})}
                        className={`outline-none border border-borderColor100 rounded-md p-[7px] text-[12px] w-full mt-1`} >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="dob" className={`font-medium text-[12px] font-inter text-[#414651] `}>Date of Birth</label>
                    <input 
                        type="date"
                        className={`outline-none border border-borderColor100 rounded-md p-[7px] text-[12px] w-full mt-1`} 
                        value={doctorFormData.signup.dob ? String(doctorFormData.signup.dob) : ''}
                        name='dob'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({dob: e.target.value})}
                        />
                </div>
                <AuthNumber
                    label='Phone Number (optional)'
                    placeholder='+234907833'
                    value={doctorFormData.signup.phoneNumber ? String(doctorFormData.signup.phoneNumber) : ""}
                    name='phoneNumber'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({phoneNumber: e.target.value})}
                />
                <AuthPassword
                    label='Password'
                    placeholder='hswj****'
                    value={doctorFormData.signup.password ? String(doctorFormData.signup.password) : ""}
                    name='password'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({password: e.target.value})}
                />
                <AuthPassword
                    label='Confirm Password'
                    placeholder='hswj****'
                    value={doctorFormData.signup.confirmPassword ?  String(doctorFormData.signup.confirmPassword) : ""}
                    name='confirmPassword'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({confirmPassword: e.target.value})}
                />

                {/* Login button - pink background */}
                <button 
                    type='button'
                    // disabled={!disabled}
                    className='w-full bg-pink-600  disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-6 font-inter'
                    onClick={() =>  handleNextStep(STEP.TWO)}
                >
                    Next
                </button>
            </form>
        </div>
    )
}

export default CreateAccount
