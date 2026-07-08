"use client";

import { TableTitle } from "@/lib/components/ui/Reusable";
import React, { FormEvent, useState } from "react";
import Input from "@/lib/components/Inputs/Inputs";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { Hospital_Admin } from "@/lib/service/service";
import { AxiosError } from "axios";
import { Profile } from "@/lib/interface/register.interface";


type HospitalProfileForm = {
  specializations: string;
  licenseNumber: string;
  address: string;
  state: string;
  bio: string;
  website: string;
  profilePicture: File | null;
};

const HospitalProfile = () => {
  const [inputValue, setInputValue] = useState<HospitalProfileForm>({
    specializations: "",
    licenseNumber: "",
    address: "",
    state: "",
    bio: "",
    website: "",
    profilePicture: null,
  });

  const [preview, setPreview] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setInputValue((prev) => ({
      ...prev,
      profilePicture: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const mutation = useMutation({
    mutationFn: (payload: Profile) => Hospital_Admin.createProfile(payload),
    onSuccess: (response) => {
      console.log(response.data);
    //   closeModal();
    },
    onError: (error: AxiosError) => {
      console.log(error?.response?.data);
    },
  });


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("specializations", inputValue.specializations);
    formData.append("licenseNumber", inputValue.licenseNumber);
    formData.append("address", inputValue.address);
    formData.append("state", inputValue.state);
    formData.append("bio", inputValue.bio);
    formData.append("website", inputValue.website);

    if (inputValue.profilePicture) {
      formData.append("profilePicture", inputValue.profilePicture);
    }

    // call your API here
    mutation.mutate(formData as unknown as Profile);
    // console.log(Object.fromEntries(formData));
  };

  return (
    <div className="bg-white rounded-lg border border-borderColor w-[70%] mx-auto">
      <TableTitle className="border-b border-borderColor100 p-4">
        Hospital Profile
      </TableTitle>

      <form className="pt-5" onSubmit={handleSubmit}>
        <div className="w-[95%] mx-auto py-5">
          <div className="flex justify-center mb-6">
            <label className="cursor-pointer flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-full border border-borderColor100 overflow-hidden flex items-center justify-center bg-gray-50">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Hospital logo"
                    className="w-full h-full object-cover"
                    width={200}
                    height={200}
                  />
                ) : (
                  <span className="text-sm text-gray-500">Upload Logo</span>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          </div>

          <Input
            name="specializations"
            value={inputValue.specializations}
            onChange={handleChange}
            label="Specializations"
            placeholder="Enter specializations"
          />

          <Input
            name="licenseNumber"
            value={inputValue.licenseNumber}
            onChange={handleChange}
            label="License Number"
            placeholder="Enter license number"
          />

          <Input
            name="address"
            value={inputValue.address}
            onChange={handleChange}
            label="Address"
            placeholder="Enter hospital address"
          />

          <Input
            name="state"
            value={inputValue.state}
            onChange={handleChange}
            label="State"
            placeholder="Enter state"
          />

          <Input
            name="bio"
            value={inputValue.bio}
            onChange={handleChange}
            label="Bio"
            placeholder="Enter bio"
          />

          <Input
            name="website"
            value={inputValue.website}
            onChange={handleChange}
            label="Website"
            placeholder="Enter website URL"
          />
        </div>

        <div className="border-t border-r border-borderColor100 p-4 flex justify-end">
          <button className={`text-white rounded-lg px-4 py-2 ${mutation.isPending || mutation.isPending ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600 cursor-pointer'}`} disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HospitalProfile;