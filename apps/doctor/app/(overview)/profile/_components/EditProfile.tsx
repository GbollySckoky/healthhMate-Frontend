"use client"
import { useFormModal } from '@/components/modal/FormModal'
import EmailInput from '@/components/ui/EmailInput'
import Footer from '@/components/ui/Footer'
import InputField from '@/components/ui/InputField'
import { DisplayFlex } from '@/components/ui/Reusable'
import TelInput from '@/components/ui/TelInput'
import TextArea from '@/components/ui/TextArea'
import { Profile } from '@/lib/interface/doctor.schema'
import Image from 'next/image'
import React, { useState, FormEvent } from 'react'
import profileImage from '@/assets/Image (1).png'
const EditProfile = () => {
    const {closeModal} = useFormModal()
    const [inputValue, setInputValue] = useState<Profile>({
        fullName: '',
        specialty: '',
        logo: new File([], ''),
        address: '',
        phoneNumber: '',
        bio: '',
        email: ''

    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value
        }));
    };
    
      const handleSubmit = (e: FormEvent) =>{
        e.preventDefault()
      }

  return (
    <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-4">
            <Image src={profileImage} alt='Doctor Image' className='border border-borderColor rounded-full' width={60}/>
        </div>
        <DisplayFlex>
            <InputField
                name="fullName"
                value={inputValue.fullName}
                onChange={handleChange}
                placeholder='Olivia James'
                label='full Name'
            />
            <EmailInput 
                name="email"
                value={inputValue.email}
                onChange={handleChange}
                label='Email'
                placeholder='olivia@untitledui.com'
            />
        </DisplayFlex>
        <DisplayFlex>
            <TelInput 
                name="phoneNumber"
                value={inputValue.phoneNumber}
                onChange={handleChange}
                placeholder='+234 (555) 000-0000'
                label='Phone number'
            />
            <InputField 
                name="specialty"
                value={inputValue.specialty}
                onChange={handleChange}
                placeholder='Dermatologist'
                label='Specialty'
            />
        </DisplayFlex>
        <InputField
            name="address"
            value={inputValue.address}
            onChange={handleChange}
            placeholder='12b, Bourdillon Road, Ikoyi, Lagos'
            label='Address'
        />
        <TextArea 
            name="bio"
            value={inputValue.bio}
            onChange={handleChange}
            placeholder='I am a General Practitioner with over 8years experience. I help patients manage chronic migraines and sleep issues with comprehensive care approaches.'
            label='bio'
        />
        <Footer 
            closeModal={closeModal}
            text='Save Changes'
            cancelText='Cancel'
        />
    </form>
  )
}

export default EditProfile