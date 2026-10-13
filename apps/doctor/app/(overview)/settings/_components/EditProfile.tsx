"use client";

import InputField from "@/lib/components/ui/InputField";
import { DisplayFlex } from "@/lib/components/ui/Reusable";
// import TelInput from "@/components/ui/TelInput";
import TextArea from "@/lib/components/ui/TextArea";
import { Profile } from "@/lib/interface/doctor.schema";
import React, { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Doctor } from "@/lib/constant/service";
import UploadImage from "../../profile/_components/UploadImage";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useGetMe from "@/lib/hooks/useGetMe";

const EditProfile = () => {
  const { myData } = useGetMe();
  const queryClient = useQueryClient()
  const [inputValue, setInputValue] = useState<Profile>({
    yearsOfExperience: "",
    specialization: "",
    profilePicture: null,
    liscenceNumber: "",
    consultationFee: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInputValue((prev) => ({
      ...prev,
      [name]:
        name === "yearsOfExperience" || name === "consultationFee"
          ? Number(value)
          : value,
    }));
  };

  const mutation = useMutation({
    mutationFn: (payload: FormData) => Doctor.createProfile(payload),
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
    onError: (error: AxiosError<{message: string}>) => {
      toast.error(error?.response?.data.message)
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mutation.isPending) return;

    const formData = new FormData();

    formData.append("bio", inputValue.bio);
    formData.append("consultationFee", inputValue.consultationFee);
    formData.append("licenseNumber", inputValue.liscenceNumber);
    formData.append("specialization", inputValue.specialization);
    formData.append("yearsOfExperience", inputValue.yearsOfExperience);

    if (inputValue.profilePicture instanceof File && inputValue.profilePicture.size > 0) {
      formData.append("profilePicture", inputValue.profilePicture);
    }

    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='px-5'>
      <div className="flex justify-center mb-4">
        <UploadImage inputValue={inputValue} setInputValue={setInputValue} currentImage={myData?.profile?.profilePicture} />
      </div>

      <DisplayFlex>
        <InputField
          name="yearsOfExperience"
          value={inputValue.yearsOfExperience}
          onChange={handleChange}
          placeholder="3"
          label="Years Of Experience"
        />

        <InputField
          name="specialization"
          value={inputValue.specialization}
          onChange={handleChange}
          label="Specialization"
          placeholder="Doctor"
        />
      </DisplayFlex>

      <DisplayFlex>
        <InputField
          name="liscenceNumber"
          value={inputValue.liscenceNumber}
          onChange={handleChange}
          placeholder="MED-12345"
          label="Liscence Number"
        />

        <InputField
          name="consultationFee"
          value={String(inputValue.consultationFee)}
          onChange={handleChange}
          placeholder="20000"
          label="Consultation Fee"
        />
      </DisplayFlex>

      <TextArea
        name="bio"
        value={inputValue.bio}
        onChange={handleChange}
        placeholder="I am a General Practitioner with over 8 years experience."
        label="Bio"
      />

      <div className="border-t border-borderColor p-4 mt-6 flex justify-end">
        <button type="submit" disabled={mutation.isPending}
          className={`text-white rounded-lg px-4 py-2 ${mutation.isPending ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600 cursor-pointer'}`}>
          {mutation.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default EditProfile;