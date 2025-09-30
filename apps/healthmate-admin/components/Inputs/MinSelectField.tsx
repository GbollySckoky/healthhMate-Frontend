import React from 'react'
import { ChevronDown } from 'lucide-react';


interface SelectFieldProps{
    label: string;
    value: string;
    show: boolean;
    onClick: () => void;
    onSelect: (value: string) => void
    options: string[]
    className?: string
}

const MinSelectField = ({ label, value, show, onClick, onSelect, options,  className }: SelectFieldProps) => {
    return (
      <div className="">
        <div
          className={`flex items-center justify-between border border-borderColor100 cursor-pointer rounded-md p-[6px] px-2 ${className}`}
          onClick={onClick}
        >
          <p className="font-inter text-[14px] text-[#414651] font-medium pr-3">
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
                className="px-3 py-1 text-sm text-grey-800 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
  

export default MinSelectField