import React from 'react'

interface TextAreaProps{
    placeholder: string;
    value: string;
    onChange: (e: any) => void
    label?: string
}
const TextArea = ({placeholder,value, onChange,label}: TextAreaProps) => {
  return (
    <div>
        <p className='font-medium font-inter text-[14px] text-[#414651] pb-1'>{label}</p>
        <textarea 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            rows={5} 
            className='w-full outline-none border border-borderColor100 font-normal text-[16px] rounded-lg p-3'
        />
    </div>
  )
}

export default TextArea