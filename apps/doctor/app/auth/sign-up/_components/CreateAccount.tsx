"use client"
import  {useState} from 'react'
import AuthEmail from '@/components/ui/AuthEmail'
import AuthPassword from '@/components/ui/AuthPassword'
import AuthInput from '@/components/ui/AuthInput'
import AuthNumber from '@/components/ui/AuthNumber'
import { STEP } from '@/lib/step'
import { Signup } from '@/interface/signup.schema'

const CreateAccount = ({handleNextStep}: {handleNextStep: (value: number) => void}) => {
    const [inputValue, setInputValue] = useState<Signup>({
        fullName:'',
        workEmail: '',
        phoneNumber:'',
        password: '',
        confirmPassword: '',
        dob: '',
        gender: ''
    })
    const [isLoading, setIsLoading] = useState(false)


    const handleChange = (e: any) => {
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

    const disabled = isLoading || !inputValue.workEmail || !inputValue.password || !inputValue.dob
    !inputValue.confirmPassword || !inputValue.fullName || !inputValue.phoneNumber || !inputValue.gender
    
    return(
        <div className=' w-full max-w-md'>
            <h1 className='font-semibold text-2xl sm:text-2xl text-[#1B1818] mb-3 font-lato'>Personal Details</h1>
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
                    value={inputValue.workEmail}
                    name='workEmail'
                    onChange={handleChange}
                />
                <div className='w-full'>
                    <p className={`font-medium text-[12px] font-inter text-[#414651] `}>Gender</p>
                    <select name="gender" id="gender" value={inputValue.gender} onChange={handleChange}  className={`outline-none border border-borderColor100 rounded-md p-[7px] text-[12px] w-full mt-1`} >
                        <option value="Male">Male</option>
                        <option value="FeMale">FeMale</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="dob" className={`font-medium text-[12px] font-inter text-[#414651] `}>Date of Birth</label>
                    <input 
                        type="date"
                        className={`outline-none border border-borderColor100 rounded-md p-[7px] text-[12px] w-full mt-1`} 
                        value={inputValue.dob}
                        name='dob'
                        onChange={handleChange} />
                </div>
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
                    {isLoading ? 'Creating....' : ' Next'}
                </button>
            </form>
        </div>
    )
}

export default CreateAccount
