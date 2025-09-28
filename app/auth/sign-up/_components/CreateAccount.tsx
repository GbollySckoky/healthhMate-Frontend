"use client"
import react, {useState} from 'react'
import AuthEmail from '@/components/Inputs/AuthEmail'
import AuthPassword from '@/components/Inputs/AuthPassword'
import AuthInput from '@/components/Inputs/AuthInput'
import AuthNumber from '@/components/Inputs/AuthNumber'
import Img from '@/components/ui/Image'
import { STEP } from '@/lib/step'

const CreateAccount = ({handleNextStep}: {handleNextStep: (value: number) => void}) => {
    const [inputValue, setInputValue] = useState({
        fullName:'',
        email: '',
        phoneNumber:'',
        password: '',
        confirmPassword: '',

    })
    const [isLoading, setIsLoading] = useState(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleNextStep(STEP.TWO)
        setIsLoading(true);
        
        try {
            // Add your authentication logic here
            console.log('Login attempt:', inputValue);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Handle successful login (redirect, etc.)
            
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error
        } finally {
            setIsLoading(false);
        }
    };

    const disabled = isLoading || !inputValue.email || !inputValue.password ||
    !inputValue.confirmPassword || !inputValue.fullName || !inputValue.phoneNumber
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

            <form onSubmit={handleSubmit} className='space-y-4'>
                <AuthInput
                    label='Full Name'
                    placeholder='Enter your name'
                    value={inputValue.fullName}
                    name='fullName'
                    onChange={handleChange}
                />
                <AuthEmail
                    label='Work Email'
                    placeholder='admin@example.com'
                    value={inputValue.email}
                    name='email'
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
                    label='Password'
                    placeholder='hswj****'
                    value={inputValue.password}
                    name='password'
                    onChange={handleChange}
                />
                <AuthPassword
                    label='Confirm Password'
                    placeholder='hswj****'
                    value={inputValue.confirmPassword}
                    name='confirmPassword'
                    onChange={handleChange}
                />

                {/* Login button - pink background */}
                <button 
                    type='submit'
                    disabled={disabled}
                    className='w-full bg-pink-600  disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-6 font-inter'
                >
                    {isLoading ? 'Creating....' : 'Create Account'}
                </button>
            </form>
        </div>
    )
}

export default CreateAccount
