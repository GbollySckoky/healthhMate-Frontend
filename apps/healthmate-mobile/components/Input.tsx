import React from 'react';

interface NumberInputType {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
}: NumberInputType) => {
  return (
    <div className="py-[2px]">
      <p className="font-normal text-sm pb-1.5 text-[#414651]">{label}</p>
      <input
        type="text"
        // inputMode="numeric"
        className="
          w-full p-[10px] border border-[#D6D7DA] rounded-md
          text-sm font-normal
          placeholder:text-black
          focus:outline-none
        "
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeText(e.target.value)
        }
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;