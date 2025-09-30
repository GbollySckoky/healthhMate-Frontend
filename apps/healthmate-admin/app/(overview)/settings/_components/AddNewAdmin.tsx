import Input from '@/components/Inputs/Inputs';
import { Admin } from '@/types/addAdmin.schema';
import React, { FormEvent, useState } from 'react';
import { admin } from '@/components/data';
import SelectField from '@/components/Inputs/Select';
import useToggle from '@/hooks/useToggle';
import Footer from '@/components/ui/Footer';
import { useFormModal } from '@/components/Modal/FormModal';
import TelInput from '@/components/Inputs/TelInput';
import EmailInput from '@/components/Inputs/EmailInput';

const AddNewAdmin = () => {
  const { name, email, number, role } = admin;
  const { isToggle, handleToggle } = useToggle();
  const {closeModal} = useFormModal()
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
      <EmailInput
        name="emailAddress"
        value={inputValue.emailAddress}
        onChange={handleChange}
        {...email}
      />
      <TelInput
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

    <Footer 
        cancelText='Cancel'
        text='Assign Admin'
        closeModal={closeModal}
    />
    </form>
  );
};

export default AddNewAdmin;
