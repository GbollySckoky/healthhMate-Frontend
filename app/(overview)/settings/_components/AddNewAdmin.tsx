import Input from '@/components/Inputs/Inputs';
import { Admin } from '@/types/addAdmin.schema';
import React, { FormEvent, useState } from 'react';
import { admin } from '@/components/data';
import SelectField from '@/components/Inputs/Select';
import useToggle from '@/hooks/useToggle';

const AddNewAdmin = () => {
  const { name, email, number, role } = admin;
  const { isToggle, handleToggle } = useToggle();
  const [inputValue, setInputValue] = useState<Admin>({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    role: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (selectedRole: string) => {
    setInputValue((prev) => ({
      ...prev,
      role: selectedRole,
    }));
    handleToggle();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitted: ', inputValue);
  };

  return (
    <form className="pt-5" onSubmit={handleSubmit}>
      <Input
        name="fullName"
        value={inputValue.fullName}
        onChange={handleChange}
        {...name}
      />
      <Input
        name="emailAddress"
        value={inputValue.emailAddress}
        onChange={handleChange}
        {...email}
      />
      <Input
        name="phoneNumber"
        value={inputValue.phoneNumber}
        onChange={handleChange}
        {...number}
      />
      <SelectField
        {...role}
        value={inputValue.role}
        show={isToggle}
        onSelect={handleSelect}
        onClick={handleToggle}
        className="w-full"
      />

      <div className="pt-4 flex justify-end">
        <button className="text-white bg-pink-600 rounded-lg px-4 py-2">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default AddNewAdmin;
