"use client";

import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField = ({
  label,
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className="
          w-full
          rounded-md
          border
          border-gray-200
          bg-white
          px-4
          py-2
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
    </div>
  );
};

export default InputField;