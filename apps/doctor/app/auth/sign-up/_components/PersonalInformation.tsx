"use client"
import  {useState} from 'react'
import AuthEmail from '@/components/ui/AuthEmail'
import AuthInput from '@/components/ui/AuthInput'
import { STEP } from '@/lib/step'
import { PersonalInformation } from '@/interface/personalInfo.schema'
import TextArea from '@/components/ui/TextArea'
import { ArrowLeft } from 'lucide-react'
import AuthNumber from '@/components/ui/AuthNumber'


const PersonalInformation = ({handleNextStep, handlePreviousStep}: {handleNextStep: (value: number) => void, handlePreviousStep: () => void}) => {
    const [inputValue, setInputValue] = useState<PersonalInformation>({
        bio:'',
        specialization: '',
        experience:'',
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

    const disabled = isLoading || !inputValue.experience || !inputValue.bio || !inputValue.specialization
    
    return(
        <div className=' w-full max-w-md'>
          <div className="flex items-center space-x-2 mb-4">
            <span onClick={handlePreviousStep} className='cursor-pointer'> <ArrowLeft size={15} /> </span>
            <p className='text-[11px] font-normal text-[#535862]'>Back</p>
          </div>
            <h1 className='font-semibold text-2xl sm:text-2xl text-[#1B1818] mb-3 font-lato'>Professional Information</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <AuthInput
                    label='Specialization'
                    placeholder='Dermatologist'
                    value={inputValue.specialization}
                    name='specialization'
                    onChange={handleChange}
                />
                <AuthNumber
                    label='Years of Experience'
                    placeholder='7years'
                    value={inputValue.experience}
                    name='experience'
                    onChange={handleChange}
                />
                <TextArea 
                  placeholder='Short description for patients'
                  label='Bio'
                  value={inputValue.bio}
                  onChange={handleChange}
                  name='bio'
                />

                {/* Login button - pink background */}
                <button 
                    type='submit'
                    disabled={disabled}
                    className='w-full bg-pink-600  disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-6 font-inter'
                >
                    {isLoading ? 'Creating....' : ' Next'}
                </button>
                <p  className='font-inter text-[14px] font-semibold text-center cursor-pointer mt-4 text-[#535862]'>Skip for now </p>
            </form>
        </div>
    )
}

export default PersonalInformation
