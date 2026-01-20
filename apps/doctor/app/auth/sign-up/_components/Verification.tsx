"use client"
import { ArrowLeft } from 'lucide-react'
import AuthNumber from '@/components/ui/AuthNumber'
import UploadLogo from '@/components/ui/UploadLogo'
import { useDoctorForm } from '@/lib/context/DoctorFormContext'
import DegreeCertificate from '@/components/ui/DegreeCertificate'
import BoardCertificate from '@/components/ui/BoardCertificate'
import { Doctor } from '@/lib/constant/service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/routes'


const Verification = ({ handlePreviousStep}: 
    { handlePreviousStep: () => void}) => {
    const {
        doctorFormData, 
        updateDoctorData, 

    } = useDoctorForm() 
    console.log("22222",doctorFormData)
    const router = useRouter()
    
    const mutation = useMutation({
        mutationFn: (payload: any) => Doctor.signup(payload),
        onSuccess: (response) => {
            console.log(response.data)
            // handleNextStep()
          // Handle success
          router.push(ROUTES.dashboard)
        },
        onError: (error: any) => {
            console.log(error.response)
          // Handle error
        }
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
      
        const formData = new FormData()
      
        const signup = doctorFormData.signup
      
        formData.append("email", String(signup.workEmail ?? ""))
        formData.append("full_name", String(signup.fullName ?? ""))
        formData.append("phone_number", String(signup.phoneNumber ?? ""))
        formData.append("password1", String(signup.password ?? ""))
        formData.append("password2", String(signup.confirmPassword ?? ""))
        formData.append("date_of_birth", String(signup.dob ?? ""))
        formData.append("gender", String(signup.gender ?? ""))
        formData.append("specialization", String(signup.specialization ?? ""))
        formData.append("years_of_experience", String(signup.experience ?? ""))
        formData.append("bio", String(signup.bio ?? ""))
        formData.append("consultation_fee", String(signup.fee ?? ""))
        formData.append("currency", "NGN")
      
        formData.append("video_consultation", String(Boolean(signup.video)))
        formData.append("audio_consultation", String(Boolean(signup.audio)))
        formData.append("inperson_consultation", String(Boolean(signup.inPerson)))
      
        doctorFormData.availableDays.forEach(day =>
          formData.append("days[]", day)
        )
      
        doctorFormData.availableTime.forEach(time =>
          formData.append("time[]", time)
        )
      
        formData.append("license_number", String(signup.license_number ?? ""))
      
        if (signup.license instanceof File) {
          formData.append("license", signup.license)
        }
      
        if (signup.degree_certificate instanceof File) {
          formData.append("degree_certificate", signup.degree_certificate)
        }
      
        if (signup.board_certificate instanceof File) {
          formData.append("board_certificate", signup.board_certificate)
        }
      
        mutation.mutate(formData)
      }
      

    // const disabled =  !inputValue.license 


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
                    value={doctorFormData.signup.license_number ? String(doctorFormData.signup.license_number) : ""}
                    name='license_number'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateDoctorData({license_number: e.target.value})}
                />
                <div className='pt-2'>
                    <p className='font-inter font-medium text-[14px] mb-2 text-[#414651]'>Upload License Document</p>
                    <UploadLogo />
                </div>
                <div>
                    <p className='font-inter font-medium text-[14px] mb-2 text-[#414651]'>Upload Medical Degree Certificate</p>
                    <DegreeCertificate />
                </div>
                <div className='pb-5'>
                    <p className='font-inter font-medium text-[14px] mb-2 text-[#414651]'>Upload Board Certificate</p>
                    <BoardCertificate />
                </div>
                {/* Login button - pink background */}
                <button 
                    type='submit'
                    // disabled={disabled || mutation.isPending}
                    className='w-full bg-pink-600  disabled:bg-[#F670C7] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors duration-200 mt-8 font-inter'
                >
                    {mutation.isPending ? 'Creating....' : ' Next'}
                </button>
            </form>
        </div>
    )
}

export default Verification
