"use client";
import { TableTitle } from "@/components/ui/Reusable";
import React, { FormEvent, useState } from "react";
// import UploadLogo from "./UploadLogo";
import Input from "@/components/Inputs/Inputs";
import { Profile } from "@/types/hospitalProfile.schema";
import { hospitalProfile } from '@/components/data'


const HospitalProfile = () => {
  const {bio,liscenseNumber, address, state, website, specializations} = hospitalProfile
  const [inputValue, setInputValue] = useState<Profile>({
    bio: '',
    liscenseNumber: '',
    address: "",
    state: "",
    profilePicture: "",
    website: '',
    specializations: ''
    // logo: null
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
            {/* <UploadLogo />/ */}
            <Input
                name="liscenseNumber"
                value={inputValue.liscenseNumber}
                onChange={handleChange}
                {...liscenseNumber}
            />
            <Input
                name="address"
                value={inputValue.address}
                onChange={handleChange}
                {...address}
            />
            <Input
                name="state"
                value={inputValue.state}
                onChange={handleChange}
                {...state}
            />
            <Input
                name="website"
                value={inputValue.website}
                onChange={handleChange}
                {...website}
            />
           <Input
                name="specializations"
                value={inputValue.specializations}
                onChange={handleChange}
                {...specializations}
            />
            <Input
                name="bio"
                value={inputValue.bio}
                onChange={handleChange}
                {...bio}
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
