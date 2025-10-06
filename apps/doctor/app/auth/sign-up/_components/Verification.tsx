"use client"
import  {useState} from 'react'
import { STEP } from '@/lib/step'
import { ArrowLeft } from 'lucide-react'
import AuthNumber from '@/components/ui/AuthNumber'
import UploadLogo from '@/components/ui/UploadLogo'


const Verification = ({handleNextStep, handlePreviousStep}: 
    {handleNextStep: (value: number) => void, handlePreviousStep: () => void}) => {
    const [inputValue, setInputValue] = useState({
        license:'',
        types: [],
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

    const disabled = isLoading || !inputValue.license 


    return(
        <div className=' w-full max-w-md'>
          <div className="flex items-center space-x-2 mb-4">
            <span onClick={handlePreviousStep} className='cursor-pointer'> <ArrowLeft size={15} /> </span>
            <p className='text-[11px] font-normal text-[#535862]'>Back</p>
          </div>
            <h1 className='font-semibold text-2xl sm:text-2xl text-[#1B1818] mb-3 font-lato'>Verification Documents</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <AuthNumber
                    label='Verification Documents'
                    placeholder='MDC1334667CVF'
                    value={inputValue.license}
                    name='license'
                    onChange={handleChange}
                />
                <div className='pt-2'>
                    <p className='font-inter font-medium text-[14px] mb-2 text-[#414651]'>Upload License Document</p>
                    <UploadLogo />
                </div>
                <div>
                    <p className='font-inter font-medium text-[14px] mb-2 text-[#414651]'>Upload Medical Degree Certificate</p>
                    <UploadLogo />
                </div>
                <div className='pb-5'>
                    <p className='font-inter font-medium text-[14px] mb-2 text-[#414651]'>Upload Board Certificate</p>
                    <UploadLogo />
                </div>
                {/* Login button - pink background */}
                <button 
                    type='submit'
                    disabled={disabled}
                    className='w-full bg-pink-600  disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-8 font-inter'
                >
                    {isLoading ? 'Creating....' : ' Next'}
                </button>
            </form>
        </div>
    )
}

export default Verification
