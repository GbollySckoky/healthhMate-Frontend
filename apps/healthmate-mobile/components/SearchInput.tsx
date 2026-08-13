"use client";
import React, { useState, KeyboardEvent } from "react";
import { Search, X } from "lucide-react";
import { colors } from "@/constants/colors";

/*
Color assumptions (not covered by what you sent — swap for your real
tokens if these guesses are off):
  colors.black -> #000000
  colors.gray  -> #9CA3AF (Tailwind gray-400-ish, used for the disabled icon)
*/

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onSearchPress?: () => void;
  editable?: boolean;
  autoFocus?: boolean;
  clearButtonMode?: "never" | "while-editing" | "unless-editing" | "always";
}

const SearchInput = ({
  value,
  onChange,
  placeholder,
  onSearchPress,
  editable = true,
  autoFocus = false,
  clearButtonMode = "while-editing",
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchPress = () => {
    onSearchPress?.();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchPress?.();
    }
  };

  const showClearButton = (() => {
    if (clearButtonMode === "never" || !value) return false;
    if (clearButtonMode === "while-editing") return isFocused;
    if (clearButtonMode === "unless-editing") return !isFocused;
    return true;
  })();

  return (
    <div className="py-[7px] flex-1">
      <div className="relative w-full">
        <input
          type="text"
          className="w-full h-11 py-2.5 pl-[35px] pr-9 border border-[#D6D7DA] rounded-lg font-inter text-sm font-normal bg-white text-[#414651] placeholder:text-[#414651]  focus:outline-none focus:border-[#DD2590] disabled:opacity-60 disabled:cursor-not-allowed"
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          value={value}
          placeholder={placeholder}
          disabled={!editable}
          autoFocus={autoFocus}
          aria-label={`Search input: ${placeholder}`}
          title="Enter text to search"
        />

        <button
          type="button"
          onClick={handleSearchPress}
          disabled={!editable}
          aria-label="Search button"
          title="Tap to search"
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 z-[1] disabled:cursor-not-allowed"
        >
          <Search size={17} color={editable ? colors.black : colors.gray} />
        </button>

        {showClearButton && (
          <button
            type="button"
            // onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 z-[1]"
          >
            <X size={16} color={colors.black} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
