"use client"
import {useState} from 'react'
import AuthEmail from '@/components/Inputs/AuthEmail'
import AuthPassword from '@/components/Inputs/AuthPassword'
import AuthInput from '@/components/Inputs/AuthInput'
import AuthNumber from '@/components/Inputs/AuthNumber'
import { STEP } from '@/lib/interface/step'
import { Signup } from '@/types/signup.schema'
import { useMutation } from '@tanstack/react-query'
import { Hospital_Admin } from '@/lib/service/service'
import { Signup as SIGN_UP } from '@/lib/interface/signup-interface'
import { AxiosError } from 'axios'
import DateInput from '@/components/Inputs/Date'

const CreateAccount = ({handleNextStep}: {handleNextStep: (value: number) => void}) => {
    const [inputValue, setInputValue] = useState<Signup>({
        hospitalName:'',
        dateOfEstablishment:'',
        workEmail: '',
        phoneNumber:'',
        password: '',
        confirmPassword: '',

    })
    const [displayPassword, setDisplayPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const mutation = useMutation({
        mutationFn: (payload: SIGN_UP) => Hospital_Admin.signup(payload),
        onSuccess: (response) => {
            console.log("hello",response)
            localStorage.setItem('access_token', response.data.access_token);
            handleNextStep(STEP.TWO)

        },
        onError: (error: AxiosError) => {
            console.log(error)
          // Handle error
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const data = {
            email: inputValue.workEmail ?? '',
            hospitalName: inputValue.hospitalName ?? '',
            dateOfEstablishment: inputValue.dateOfEstablishment ?? '',
            phoneNumber: inputValue.phoneNumber ?? "",
            password: inputValue.password ?? '',
            confirmPassword: inputValue.confirmPassword ?? ''
        }
        console.log("Submitting data:", data);
        await mutation.mutate(data)
        //  handleNextStep(STEP.TWO)
    };

    const disabled = mutation.isPending || !inputValue.workEmail || !inputValue.password ||
    !inputValue.confirmPassword || !inputValue.hospitalName || !inputValue.dateOfEstablishment || !inputValue.phoneNumber

    
    return(
        <div className=' w-full max-w-md'>
            <div className='mb-6'>
                <h1 className='font-semibold text-xl sm:text-2xl text-[#1B1818] mb-2 font-lato'>
                    Create Admin Account
                </h1>
                <p className='text-sm text-[#645D5D] font-normal font-lato'>
                    Join our platform to manage your doctors digitally
                </p>
            </div>
            <form 
            onSubmit={handleSubmit} 
            className='space-y-4'>
                <AuthInput
                    label='Hospital Name'
                    placeholder='Enter your first name'
                    value={inputValue.hospitalName}
                    name='hospitalName'
                    onChange={handleChange}
                />
                {/* <AuthInput
                    label='Date Of Establishment'
                    placeholder='19/06/2026'
                    value={inputValue.dateOfEstablishment}
                    name='dateOfEstablishment'
                    onChange={handleChange}
                /> */}
                <DateInput 
                    label='Date Of Establishment'
                    placeholder='19/06/2026'
                    value={inputValue.dateOfEstablishment}
                    name='dateOfEstablishment'
                    onChange={handleChange}
                />
                <AuthEmail
                    label='Email'
                    placeholder='admin@example.com'
                    value={inputValue.workEmail}
                    name='workEmail'
                    onChange={handleChange}
                />
                <AuthNumber
                    label='Phone Number (optional)'
                    placeholder='+234907833'
                    value={inputValue.phoneNumber}
                    name='phoneNumber'
                    onChange={handleChange}
                />
               <AuthPassword
                    label="Password"
                    placeholder="hswj****"
                    value={inputValue.password}
                    name="password"
                    onChange={handleChange}
                    showPassword={displayPassword.password}
                    onClick={() =>
                        setDisplayPassword((prev) => ({
                        ...prev,
                        password: !prev.password,
                        }))
                    }
                />

                <AuthPassword
                    label="Confirm Password"
                    placeholder="hswj****"
                    value={inputValue.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                    showPassword={displayPassword.confirmPassword}
                    onClick={() =>
                        setDisplayPassword((prev) => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword,
                        }))
                    }
                />

                {/* Login button - pink background */}
                <button 
                    type='submit'
                    disabled={disabled}
                    className='w-full bg-pink-600  disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-6 font-inter'
                >
                    {mutation.isPending ? 'Creating....' : 'Create Account'}
                </button>
            </form>
        </div>
    )
}

export default CreateAccount
