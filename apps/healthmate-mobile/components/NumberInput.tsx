import React from 'react';

interface NumberInputType {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}

const NumberInput = ({
  label,
  value,
  onChangeText,
  placeholder,
}: NumberInputType) => {
  return (
    <div className="py-[7px]">
      <p className="font-medium text-sm pb-1.5 text-[#414651]">{label}</p>
      <input
        type="number"
        inputMode="numeric"
        className="
          w-full p-[10px] border border-[#D6D7DA] rounded-[5px]
          text-sm font-normal
          placeholder:text-black
          focus:outline-none focus:ring-1 focus:ring-[#D6D7DA]
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

export default NumberInput;