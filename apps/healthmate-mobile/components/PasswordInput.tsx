"use client";

import { ReactNode } from "react";

interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry: boolean;
  openIcon: ReactNode;
  closeIcon: ReactNode;
  isPasswordVisible: boolean;
  onToggleVisibility: () => void;
}

const PasswordInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  openIcon,
  closeIcon,
  isPasswordVisible,
  onToggleVisibility,
}: PasswordInputProps) => {
  return (
    <div className="py-2">
      <label className="mb-1 block text-sm font-medium text-[#414651]">
        {label}
      </label>

      <div className="relative">
        <input
          type={secureTextEntry ? "password" : "text"}
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-[#D6D7DA] px-3 py-2 pr-12 text-sm outline-none transition focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
        />

        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700"
        >
          {isPasswordVisible ? openIcon : closeIcon}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;