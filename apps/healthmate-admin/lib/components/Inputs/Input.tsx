import React, { ReactElement } from 'react'
import { Search } from 'lucide-react';


interface InputProps{
    placeholder: string;
    value: string;
    onChange: (e: any) => void;
    className?: string
    icon: ReactElement
}
const Input = ({placeholder,value,onChange,className, icon}: InputProps) => {
  return (
    <div className='relative h-fit'>
        <input 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`outline-none border border-borderColor100 rounded-md p-[7px] text-sm w-[250px] pr-7 ${className}`}
        />
        <span className='absolute right-2 bottom-2 cursor-pointer'>  {icon} </span>
    </div>
  )
}

export default Input