'use client'
import React, { useState } from 'react'

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  name: string;
  showPassword?: boolean;
  onClick?: () => void;
}

const AuthPassword = ({
  placeholder,
  value,
  onChange,
  className = '',
  label,
  name,
  showPassword,
  onClick,
}: InputProps) => {
  const [visible, setVisible] = useState(false)
  const controlled = typeof showPassword === 'boolean'
  const passwordVisible = controlled ? showPassword : visible

  const handleToggle = () => {
    if (onClick) {
      onClick()
    }

    if (!controlled) {
      setVisible((prev) => !prev)
    }
  }

  return (
    <div className="mb-2 block relative w-full">
      {label && (
        <label
          htmlFor={name}
          className="font-medium text-[12px] font-inter text-[#414651]"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`outline-none border border-borderColor100 rounded-md p-[7px] text-[12px] ${className} w-full mt-1`}
        type={passwordVisible ? 'text' : 'password'}
      />

      <button
        type="button"
        className="absolute right-2 bottom-2 text-xs text-gray-500"
        onClick={handleToggle}
      >
        {passwordVisible ? 'Hide' : 'Show'}
      </button>
    </div>
  )
}

export default AuthPassword;
