import React from 'react'

interface InputProps {
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  name?: string
}
const VerifyInput = ({ placeholder, value, onChange, className, name }: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`outline-none border border-borderColor100 rounded-md p-[7px] text-sm w-[35px] h-[35px] text-center caret-center ${className}`}
      name={name}
      maxLength={1}
    />
  )
}

export default VerifyInput
