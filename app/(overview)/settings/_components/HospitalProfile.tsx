"use client";
import { TableTitle } from "@/components/reusable/Reusable";
import React, { FormEvent, useState } from "react";
import UploadLogo from "./UploadLogo";
import Input from "@/components/Inputs/Inputs";
import { Profile } from "@/types/hospitalProfile.schema";
import { hospitalProfile } from '@/components/data'
import TelInput from "@/components/Inputs/TelInput";
import EmailInput from "@/components/Inputs/EmailInput";


const HospitalProfile = () => {
  const {name,email, number, language} = hospitalProfile
  const [inputValue, setInputValue] = useState<Profile>({
    hospitalName: "",
    workEmail: "",
    phoneNumber: "",
    language: "",
    logo: new File([], "")
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) =>{
    e.preventDefault()
  }
  
  return (
    <div className="bg-white rounded-lg border border-borderColor w-[70%] mx-auto">
    <TableTitle className="border-b border-borderColor100 p-4">
        Hospital Profile
    </TableTitle>
    <form className=" pt-5" onSubmit={handleSubmit}>
        <div className="w-[95%] mx-auto py-5">
            <UploadLogo />
            <Input
                name="hospitalName"
                value={inputValue.hospitalName}
                onChange={handleChange}
                {...name}
            />
            <EmailInput
                name="workEmail"
                value={inputValue.workEmail}
                onChange={handleChange}
                {...email}
            />
            <TelInput
                name="phoneNumber"
                value={inputValue.phoneNumber}
                onChange={handleChange}
                {...number}
            />
        </div>
        
        <div className="border-t border-r border-borderColor100 p-4 flex justify-end">
            <button className="text-white bg-pink-600 rounded-lg px-4 py-2">
                Save Changes
            </button>
        </div>

    </form>
    </div>
  );
};

export default HospitalProfile;
