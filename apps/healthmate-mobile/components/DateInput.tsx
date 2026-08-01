import React from 'react';

interface DateInputType {
  label: string;
  value: string;
  _fn: () => void;
  placeholder: string;
}

const DateInput = ({ label, value, _fn, placeholder }: DateInputType) => {
  return (
    <div className="py-[7px]">
      <p className="font-medium text-sm pb-1.5 text-[#414651]">{label}</p>
      <input
        type="text"
        className="
          w-full p-[10px] border border-[#D6D7DA] rounded-[5px]
          text-sm font-normal cursor-pointer
          placeholder:text-black
          focus:outline-none
        "
        onClick={_fn}
        value={value}
        placeholder={placeholder}
        readOnly
      />
    </div>
  );
};

export default DateInput;