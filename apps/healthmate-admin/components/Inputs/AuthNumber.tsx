import React from 'react'


interface InputProps{
    placeholder: string;
    value: string | number;
    onChange: (e: any) => void;
    className?: string
    label: string 
    name: string
}
const AuthNumber = ({placeholder,value,onChange,className, label, name}: InputProps) => {
  return (
    <div className='mb-2 block w-full'>
        <label htmlFor={name} className={`font-medium text-[12px] font-inter text-[#414651]  `}>{label}</label>
        <input 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`outline-none border border-borderColor100 rounded-md p-[7px] text-[12px] w-full mt-1 ${className}`} 
            type='tel'
            name={name}
        />
    </div>
  )
}

export default AuthNumber