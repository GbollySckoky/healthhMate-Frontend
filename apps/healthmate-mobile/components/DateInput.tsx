import React from 'react';

interface DateInputType {
  label: string;
  value: string;
  _fn: () => void;
  placeholder: string;
}

const DateInput = ({ label, value, _fn, placeholder }: DateInputType) => {
  const today = new Date();

  const formattedToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  return (
    <div className="py-[7px]">
      <p className="font-normal text-sm pb-1.5 text-[#414651]">{label}</p>
      <input
        type="date"
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
        min={formattedToday}
      />
    </div>
  );
};

export default DateInput;