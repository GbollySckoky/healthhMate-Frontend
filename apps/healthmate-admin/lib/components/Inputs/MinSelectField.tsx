import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectFieldProps {
  label: string;
  value: string | undefined;
  show: boolean;
  onClick: () => void;
  onSelect: (value: string | undefined) => void;
  options: string[];
  className?: string;
}

const MinSelectField = ({
  label,
  value,
  show,
  onClick,
  onSelect,
  options,
  className,
}: SelectFieldProps) => {
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={onClick}
        className="flex min-w-[130px] items-center justify-between gap-3 rounded-md border border-borderColor100 bg-white px-3 py-2"
      >
        <span className="font-inter text-[14px] font-medium text-[#414651]">
          {value || label}
        </span>

        <ChevronDown
          size={15}
          className={`transition-transform ${show ? "rotate-180" : ""}`}
        />
      </button>

      {show && (
        <div className="absolute right-0 z-30 mt-2 w-full min-w-[150px] rounded-md border border-borderColor100 bg-white shadow-md">
          <button
            type="button"
            onClick={() => onSelect(undefined)}
            className="block w-full px-3 py-2 text-left text-sm text-grey-800 hover:bg-gray-100"
          >
            All
          </button>

          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className="block w-full px-3 py-2 text-left text-sm text-grey-800 hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinSelectField;