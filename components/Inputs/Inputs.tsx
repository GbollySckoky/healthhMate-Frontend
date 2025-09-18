import React, { ReactElement } from 'react'
import { Search } from 'lucide-react';


interface InputProps{
    placeholder: string;
    value: string;
    onChange: (e: any) => void;
    className?: string
    label: string 
    name: string
}
const Input = ({placeholder,value,onChange,className, label, name}: InputProps) => {
  return (
    <div className='mb-4 block'>
        <label htmlFor={name} className='font-inter font-normal text-[16px] text-[#212121]'>{label}</label>
        <input 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`outline-none border border-borderColor100 rounded-md p-[7px] text-sm ${className} w-full mt-1`} 
            name={name}
        />
    </div>
  )
}

export default Input