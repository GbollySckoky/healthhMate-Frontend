"use client"


import AuthEmail from '@/components/Inputs/AuthEmail'
import AuthInput from '@/components/Inputs/AuthInput'
// import DateInput from '@/components/Inputs/Date'
import AuthPassword from '@/components/Inputs/AuthPassword'
import { DisplayFlex } from '@/components/ui/Reusable'
import Footer from '@/components/ui/Footer'
import { useFormModal } from '@/components/Modal/FormModal'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Hospital_Admin } from '@/lib/service/service'
import { AxiosError } from 'axios'
import { DOCTOR_SIGNUP } from '@/lib/interface/signup-interface'

interface Hospital {
  id: number
  name: string
}

interface SelectOption {
  value: string
  label: string
}

const GENDER_OPTIONS: SelectOption[] = [
  { value: '', label: 'Select gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

const SELECT_CLASS =
  'border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full text-sm'

const LABEL_CLASS = 'font-medium text-[12px] font-inter text-[#414651]'

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
//   dob: '',
  gender: '',
  phoneNumber: '',
  hospitalBranch: '',
  password: '',
  confirmPassword: '',
}

const AddNewDoctor = () => {
  const [inputValue, setInputValue] = useState(initialFormState)
  const [displayPassword, setDisplayPassword] = useState({
    password: false,
    confirmPassword: false,
  })

  const { closeModal } = useFormModal()

  const { data: hospitals, isLoading: hospitalsLoading } = useQuery<Hospital[]>({
    queryKey: ['hospitals'],
    queryFn: () => Hospital_Admin.getAllHospitals(),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setInputValue((prev) => ({ ...prev, [name]: value }))
  }

  const togglePassword = (field: 'password' | 'confirmPassword') => {
    setDisplayPassword((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const isDisabled = Object.values(inputValue).some((v) => v === '')

  const mutation = useMutation({
    mutationFn: (payload: DOCTOR_SIGNUP) => Hospital_Admin.createDoctor(payload),
    onSuccess: (response: any) => {
        console.log('Doctor created successfully:', response)
        closeModal()
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error('Error creating doctor:', error.response?.data?.message)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate({
      email: inputValue.email,
      firstName: inputValue.firstName,
      lastName: inputValue.lastName,
      dateOfBirth: "", // inputValue.dob, // Assuming you will implement DateInput later
      phoneNumber: inputValue.phoneNumber,
      gender: inputValue.gender,
      hospitalId: inputValue.hospitalBranch,
      password: inputValue.password,
    })
  }
  console.log(inputValue)
  return (
    <form onSubmit={handleSubmit}>
      <DisplayFlex>
        <AuthInput
          label="First Name"
          placeholder="Gbolahan"
          value={inputValue.firstName}
          name="firstName"
          onChange={handleChange}
        />
        <AuthInput
          label="Last Name"
          placeholder="Coker"
          value={inputValue.lastName}
          name="lastName"
          onChange={handleChange}
        />
      </DisplayFlex>

      <DisplayFlex>
        <AuthEmail
          label="Email"
          placeholder="doctor@example.com"
          value={inputValue.email}
          name="email"
          onChange={handleChange}
        />
        <AuthInput
          label="Phone Number"
          placeholder="09075437117"
          value={inputValue.phoneNumber}
          name="phoneNumber"
          onChange={handleChange}
        />
      </DisplayFlex>

      <DisplayFlex>
        {/* <DateInput
          label="Date of Birth"
          placeholder="17/09/1990"
        //   value={inputValue.dob}
          name="dob"
          onChange={handleChange}
        /> */}
        <div className="block w-full mb-2">
          <label htmlFor="gender" className={LABEL_CLASS}>
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={inputValue.gender}
            onChange={handleChange}
            className={SELECT_CLASS}
          >
            {GENDER_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value} disabled={value === ''}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </DisplayFlex>

      <DisplayFlex>
        <AuthPassword
          label="Password"
          placeholder="Enter password"
          value={inputValue.password}
          name="password"
          onChange={handleChange}
          showPassword={displayPassword.password}
          onClick={() => togglePassword('password')}
        />
        <AuthPassword
          label="Confirm Password"
          placeholder="Confirm password"
          value={inputValue.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          showPassword={displayPassword.confirmPassword}
          onClick={() => togglePassword('confirmPassword')}
        />
      </DisplayFlex>

      <div className="block w-full mb-2">
        <label htmlFor="hospitalBranch" className={LABEL_CLASS}>
          Hospital Branch
        </label>
        <select
          id="hospitalBranch"
          name="hospitalBranch"
          value={inputValue.hospitalBranch}
          onChange={handleChange}
          className={SELECT_CLASS}
          disabled={hospitalsLoading}
        >
          <option value="" disabled>
            {hospitalsLoading ? 'Loading branches...' : 'Select a branch'}
          </option>
          {hospitals?.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <Footer
        cancelText="Cancel"
        text="Add Doctor"
        closeModal={closeModal}
        isLoading={mutation.isPending}
        disabled={isDisabled}
      />
    </form>
  )
}

export default AddNewDoctor