"use client";

import React from "react";

interface TextAreaInputProps {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

const TextAreaInput = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  rows = 6,
  disabled = false,
  className = "",
}: TextAreaInputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-[#414651]">
          {label}
        </label>
      )}

      <textarea
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`w-full min-h-[120px] resize-none rounded-md border border-[#D6D7DA] bg-white p-3 text-sm text-[#101828] placeholder:text-[#667085] outline-none transition-all focus:border-[#C11574] focus:ring-2 focus:ring-[#FDF2FA] disabled:cursor-not-allowed disabled:bg-gray-100 ${className}`}
      />
    </div>
  );
};

export default TextAreaInput;