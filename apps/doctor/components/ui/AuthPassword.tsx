import React from 'react'


interface InputProps{
    placeholder: string;
    value: string;
    onChange: (e: any) => void;
    className?: string
    label: string 
    name: string
}
const AuthPassword = ({placeholder,value,onChange,className, label, name}: InputProps) => {
  return (
    <div className='mb-2 block relative'>
        <label htmlFor={name} className='font-medium text-[12px] font-inter text-[#374f82]'>{label}</label>
        <input 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`outline-none border border-borderColor100 rounded-md p-[7px] text-[12px] ${className} w-full mt-1`} 
            type='password'
            name={name}
        />
        <span className='absolute right-2 bottom-2 cursor-pointer'>  00 </span>
    </div>
  )
}

export default AuthPassword