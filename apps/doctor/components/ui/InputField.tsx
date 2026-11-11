import React from 'react'

interface InputProps{
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string
    label: string 
    name?: string
    type?: string
}
const InputField = ({placeholder,value,onChange,className, label, name, type}: InputProps) => {
  return (
    <div className='mb-4 block w-full'>
        <label htmlFor={name} className='font-medium text-[14px] font-inter text-[#414651]'>{label}</label>
        <input 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`outline-none border border-borderColor100 rounded-md p-[7px] ${className} w-full mt-1 text-sm font-medium focus:ring-red-300`} 
            name={name}
            type={type}
        />
    </div>
  )
}

export default InputField