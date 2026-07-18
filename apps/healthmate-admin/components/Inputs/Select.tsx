import React from 'react'
import { ChevronDown } from 'lucide-react';


interface SelectFieldProps{
    label: string;
    value: string;
    show: boolean;
    onClick: () => void;
    onSelect: (value: string) => void
    options: string[]
    title?: string
    className?: string
}

const SelectField = ({ label, value, show, onClick, onSelect, options, title, className }: SelectFieldProps) => {
    return (
      <div className="">
         <p className='mb-1 font-inter font-normal text-[14px]'>{title}</p> 
        <div
          className={`flex items-center justify-between border border-borderColor100 cursor-pointer rounded-md p-[7px] ${className}`}
          onClick={onClick}
        >
          <p className="font-inter text-[14px] font-normal pr-3">
            {value || label}
          </p>
          <ChevronDown size={15} />
        </div>
  
        {show && (
          <div className="border border-borderColor100 rounded-md mt-2">
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => onSelect(option)}
                className="px-3 py-1 text-sm  hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
  

export default SelectField