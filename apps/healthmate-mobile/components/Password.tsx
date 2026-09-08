"use client";

import React from "react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  onIconClick: () => void;
}

const PasswordInput = ({
  label,
  icon,
  onIconClick,
  ...props
}: PasswordInputProps) => {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          className="
            w-full
            rounded-md
            border
            border-gray-200
            bg-white
            px-4
            py-2.5
            pr-12
            text-sm
            text-gray-900
            outline-none
            transition
            placeholder:text-gray-400
            focus:border-pink-500
            focus:ring-1
            focus:ring-pink-100
          "
        />

        <button
          type="button"
          onClick={onIconClick}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-500
            hover:text-gray-700
          "
          aria-label="Toggle password visibility"
        >
          {icon}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput