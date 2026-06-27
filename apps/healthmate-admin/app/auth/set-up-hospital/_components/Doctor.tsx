"use client"
import AuthNumber from '@/components/Inputs/AuthNumber'
import AuthEmail from '@/components/Inputs/AuthEmail'
import AuthInput from '@/components/Inputs/AuthInput'
import DateInput from '@/components/Inputs/Date'
import { DisplayFlex } from '@/components/ui/Reusable'
import { useHospitalForm } from '@/lib/context/HospitalContextForm'
import { useMutation } from '@tanstack/react-query'
import { Register } from '@/lib/interface/register.interface'
import { Hospital_Admin } from '@/lib/service/service'

const Doctor = ({handleNextStep}: {handleNextStep: () => void}) => {
    const {hospitalFormData, updateHospitalData} = useHospitalForm()
    
    const mutation = useMutation({
        mutationFn: (payload: Register) => Hospital_Admin.createProfile(payload),
        onSuccess: (response) => {
            console.log(response)
            handleNextStep()
          // Handle success
        },
        onError: (error: any) => {
            console.log(error)
          // Handle error
        }
    })
    
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData: any = new FormData();
            formData.append("hospitalName", String(hospitalFormData.register.hospitalName || ''));
            formData.append("liscenseNumber", String(hospitalFormData.register.liscenseNumber || ''));
            formData.append("address", String(hospitalFormData.register.address || ''));
            formData.append("state", String(hospitalFormData.register.state || ''));
            formData.append("email", String(hospitalFormData.register.email || ''));
            formData.append("phoneNumber", Number(hospitalFormData.register.phoneNumber || 0));
            if (hospitalFormData.register.logo instanceof File) {
                formData.append("profilePicture", hospitalFormData.register.logo);
            }    
            formData.append("branchName", String(hospitalFormData.register.branchName || ''));
            formData.append("branchAddress", String(hospitalFormData.register.email || ''));
            formData.append("branchState", String(hospitalFormData.register.branchAddress || ''));
            formData.append("branchPhoneNumber", Number(hospitalFormData.register.branchPhoneNumber || 0));
            console.log(formData)
        await mutation.mutate(formData)
    };

    return (
        <div>
            <p className="text-[30px] font-lato font-semibold text-[#1B1818] text-center  mb-3">
                Add your first doctor
            </p>
            <form onSubmit={handleSubmit}>
                <DisplayFlex>
                    <AuthInput
                        label='Doctor Name'
                        placeholder='Dr. John Doe'
                        value={hospitalFormData.register.doctorName ? String(hospitalFormData.register.doctorName) : ''}
                        name='doctorName'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateHospitalData({ doctorName: e.target.value })
                        }
                    />
                    <AuthEmail
                        label='Email'
                        placeholder='admin@example.com'
                        value={hospitalFormData.register.doctorEmail ? String(hospitalFormData.register.doctorEmail) : ''}
                        name='doctorEmail'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateHospitalData({ doctorEmail: e.target.value })
                        }
                    />
                </DisplayFlex>
                <DisplayFlex>
                    <DateInput 
                        label='Date of birth'
                        placeholder='17/09/2007'
                        value={hospitalFormData.register.dob ? String(hospitalFormData.register.dob) : ''}
                        name='dob'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateHospitalData({ dob: e.target.value })
                        }
                    />
                    <AuthInput
                        label='Gender'
                        placeholder='Male/Female'
                        value={hospitalFormData.register.gender ? String(hospitalFormData.register.gender) : ''}
                        name='gender'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateHospitalData({ gender: e.target.value })
                        }
                    />
                </DisplayFlex>
                <DisplayFlex>
                    <AuthNumber
                        label='Phone Number (optional)'
                        placeholder='+234907833'
                        value={hospitalFormData.register.doctorPhoneNumber ? String(hospitalFormData.register.doctorPhoneNumber) : ''}
                        name='doctorPhoneNumber'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateHospitalData({ doctorPhoneNumber: e.target.value })
                        }
                    />
                    <AuthInput
                        label='Specialty'
                        placeholder='Dermatologist'
                        value={hospitalFormData.register.specialty ? String(hospitalFormData.register.specialty) : ''}
                        name='specialty'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateHospitalData({ specialty: e.target.value })
                        }
                    />
                </DisplayFlex>
                <DisplayFlex>
                    <AuthInput
                        label='Branch Assignment (optional)'
                        placeholder='Lagos'
                        value={hospitalFormData.register.branchAssignment ? String(hospitalFormData.register.branchAssignment) : ''}
                        name='branchAssignment'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateHospitalData({ branchAssignment: e.target.value })
                        }
                    />
                    <AuthInput
                        label='License number'
                        placeholder='2571exxxx92'
                        value={hospitalFormData.register.doctorLicenseNumber ? String(hospitalFormData.register.doctorLicenseNumber) : ''}
                        name='doctorLicenseNumber'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateHospitalData({ doctorLicenseNumber: e.target.value })
                        }
                    />
                </DisplayFlex>
                <button 
                    type="submit"
                    className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg font-semibold w-full mt-5 text-[14px] font-inter" 
                >
                 {mutation.isPending ? 'Finishing...' : 'Finish Set Up'}   
                </button>
            </form>
            <p className='font-inter text-[14px] font-semibold text-center cursor-pointer mt-4 text-[#535862]'>
                Skip for now 
            </p>
        </div>
    )
}

export default Doctor