"use client"


import AuthEmail from '@/components/Inputs/AuthEmail'
import AuthInput from '@/components/Inputs/AuthInput'
// import DateInput from '@/components/Inputs/Date'
import AuthPassword from '@/components/Inputs/AuthPassword'
import { DisplayFlex } from '@/components/ui/Reusable'
import Footer from '@/components/ui/Footer'
import { useFormModal } from '@/components/Modal/FormModal'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Hospital_Admin } from '@/lib/service/service'
import { AxiosError } from 'axios'
import { DOCTOR_SIGNUP } from '@/lib/interface/signup-interface'
import DateInput from '@/components/Inputs/Date'


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
  'border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-1  w-full text-sm'

const LABEL_CLASS = 'font-medium text-[12px] font-inter text-[#414651]'

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  dob: '',
  gender: '',
  phoneNumber: '',
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

  // const { data: hospitals, isLoading: hospitalsLoading } = useQuery({
  //   queryKey: ['hospitals'],
  //   queryFn: () => Hospital_Admin.getAllHospitals(),
  // })

  // console.log(hospitals, "Hospitals")

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
    onSuccess: (response) => {
        console.log('Doctor created successfully:', response)
        closeModal()
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error('Error creating doctor:', error.response?.data?.message)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = {
      email: inputValue.email,
      firstName: inputValue.firstName,
      lastName: inputValue.lastName,
      dateOfBirth: new Date(inputValue.dob).toISOString(), // Assuming you will implement DateInput later
      phoneNumber: inputValue.phoneNumber,
      gender: inputValue.gender,
      // hospitalId: inputValue.hospital,
      password: inputValue.password,
    }

    mutation.mutate(data)
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
        <DateInput
          label="Date of Birth"
          placeholder="1990-09-17"
          value={inputValue.dob}
          name="dob"
          onChange={handleChange}
        />
        <div className="block w-full mb-2">
          <label htmlFor="gender" className={LABEL_CLASS}>
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={inputValue.gender}
            onChange={handleChange}
            className={`${SELECT_CLASS} bg-white text-gray-900 px-3`}>
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

      {/* <div className="block w-full mb-2">
        <label htmlFor="hospital" className={LABEL_CLASS}>
          Hospital
        </label>
        <select
          id="hospital"
          name="hospital"
          value={inputValue.hospital}
          onChange={handleChange}
          className={SELECT_CLASS}
          disabled={hospitalsLoading}
        >
          <option value="" className="text-sm">
            {hospitalsLoading ? 'Loading branches...' : 'Select an hospital'}
          </option>

          {hospitals && hospitals.data.map((hospital: any) => (
            <option key={hospital.id} value={hospital.id} className="text-gray-900 bg-white">
              {hospital.email}
            </option>
          ))}
        </select>
      </div> */}

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