"use client"
import AuthNumber from '@/components/Inputs/AuthNumber'
import AuthEmail from '@/components/Inputs/AuthEmail'
import AuthInput from '@/components/Inputs/AuthInput'
import DateInput from '@/components/Inputs/Date'
import { DisplayFlex } from '@/components/ui/Reusable'
import Footer from '@/components/ui/Footer'
import { useFormModal } from '@/components/Modal/FormModal'
import { useState } from 'react'

const AddNewDoctor = () => {
    const [inputValue, setInputValue] = useState({
        branchName: '',
        email: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        specialty: '',
        branchAssignment: '',
        liscenseNumber: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
          ...prev,
          [name]: value
        }));
    };

    const {closeModal} = useFormModal()
  return (
    <form action="">
        <DisplayFlex>
            <AuthInput
                label='Branch Name'
                placeholder='Evercare Hospital Lekki'
                value={inputValue.branchName}
                name='branchName'
                onChange={handleChange}
            />
            <AuthEmail
                label='Email'
                placeholder='admin@example.com'
                value={inputValue.email}
                name='email'
                onChange={handleChange}
            />
        </DisplayFlex>
        <DisplayFlex>
            <DateInput 
                label='Date of birth'
                placeholder='17/09/2007'
                value={inputValue.dob }
                name='dob'
                onChange={handleChange}
            />
            <AuthInput
                label='Gender'
                placeholder='Male/Female'
                value={inputValue.gender}
                name='gender'
                onChange={handleChange}
            />
        </DisplayFlex>
        <DisplayFlex>
            <AuthNumber
                label='Phone Number (optional)'
                placeholder='+234907833'
                value={inputValue.phoneNumber}
                name='phoneNumber'
                onChange={handleChange}
            />
            <AuthInput
                label='Specialty'
                placeholder='Dermatologist'
                value={inputValue.specialty}
                name='specialty'
                onChange={handleChange}
             />
        </DisplayFlex>
        <DisplayFlex>
            <AuthInput
                label='Branch Assignment (optional)'
                placeholder='Lagos'
                value={inputValue.branchAssignment }
                name='branchAssignment'
                onChange={handleChange}
            />
            <AuthInput
                label='Liscense number'
                placeholder='2571exxxx92'
                value={inputValue.liscenseNumber}
                name='liscenseNumber'
                onChange={handleChange}
            />
        </DisplayFlex>
        <Footer 
            cancelText='Cancel'
            text='Assign Role'
            closeModal={closeModal}
        />
</form>

  )
}

export default AddNewDoctor
