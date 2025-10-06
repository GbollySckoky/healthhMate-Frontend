"use client"
import  {useState} from 'react'
import { STEP } from '@/lib/step'
import { ArrowLeft } from 'lucide-react'
import AuthNumber from '@/components/ui/AuthNumber'


const Consultation = ({handleNextStep, handlePreviousStep}: 
    {handleNextStep: (value: number) => void, handlePreviousStep: () => void}) => {
    const [inputValue, setInputValue] = useState({
        fee:'',
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

    const disabled = isLoading || !inputValue.fee 
    
    const availableDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    const timeSlots = ['8:00am','9:00am','10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm']
    const consultationType = ['Video', 'Audio', 'In Person']

    return(
        <div className=' w-full max-w-md'>
          <div className="flex items-center space-x-2 mb-4">
            <span onClick={handlePreviousStep} className='cursor-pointer'> <ArrowLeft size={15} /> </span>
            <p className='text-[11px] font-normal text-[#535862]'>Back</p>
          </div>
            <h1 className='font-semibold text-2xl sm:text-2xl text-[#1B1818] mb-3 font-lato'>Consultation Setup</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <AuthNumber
                    label='Consultation Fee'
                    placeholder='15,000'
                    value={inputValue.fee}
                    name='fee'
                    onChange={handleChange}
                />
                <div>
                    <p className='text-[#414651] font-inter font-medium text-[12px] mb-2'>Consultation Types</p>
                        {consultationType.map((type, index) => (
                            <div className="flex" key={index}>
                                <input type="checkbox" />
                                <p className='text-[14px] text-grey-50 cursor-pointer bg-red-50 rounded-lg p-2 w-fit font-normal'>{type}</p>
                            </div>
                        ))}
                </div>
                <div>
                    <p className='text-[#414651] font-inter font-medium text-[12px] mb-2'>Availability Days</p>
                    <div className="flex gap-3 ">
                        {availableDays.map((day, index) => (
                            <p className='text-[14px] text-grey-50 cursor-pointer bg-red-50 rounded-lg p-2 w-fit font-normal' key={index}>{day}</p>
                        ))}
                    </div>
                </div>
                <div className='pb-4'>
                    <p className='text-[#414651] font-inter font-medium text-[12px] mb-2'>Time Slots</p>
                    <div className="grid grid-cols-5 gap-3 ">
                        {timeSlots.map((slot, index) => (
                            <p className='text-[14px] text-grey-50 cursor-pointer bg-red-50 rounded-lg p-2 w-fit font-normal' key={index}>{slot}</p>
                        ))}
                    </div>
                </div>

                {/* Login button - pink background */}
                <button 
                    type='submit'
                    disabled={disabled}
                    className='w-full bg-pink-600  disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-8 font-inter'
                >
                    {isLoading ? 'Creating....' : ' Next'}
                </button>
                <p  className='font-inter text-[14px] font-semibold text-center cursor-pointer mt-4 text-[#535862]'>Skip for now </p>
            </form>
        </div>
    )
}

export default Consultation
