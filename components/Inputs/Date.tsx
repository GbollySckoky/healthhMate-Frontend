import React, { ReactElement } from 'react'
import { Calendar1 } from 'lucide-react';


interface InputProps{
    placeholder: string;
    value: string;
    onChange: (e: any) => void;
    className?: string
    name: string
    label: string
}
const DateInput = ({placeholder,value,onChange,className, name, label}: InputProps) => {
  return (
    <div className='fmb-2 block w-full'>
        <label htmlFor={name} className={`font-medium text-[12px] font-inter text-[#414651]  `}>{label}</label>
        <input 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`outline-none border border-borderColor100 rounded-md p-[7px] text-grey-500 text-[12px] w-full ${className}`}
            type='date'
        />
    </div>
  )
}

export default DateInput