"use client";

import { useFormModal } from "@/components/modal/FormModal";
import Footer from "@/components/ui/Footer";
import InputField from "@/components/ui/InputField";
import { DisplayFlex } from "@/components/ui/Reusable";
// import TelInput from "@/components/ui/TelInput";
import TextArea from "@/components/ui/TextArea";
import { Profile } from "@/lib/interface/doctor.schema";
import React, { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Doctor } from "@/lib/constant/service";
import UploadImage from "./UploadImage";
import { AxiosError } from "axios";

const EditProfile = () => {
  const { closeModal } = useFormModal();

  const [inputValue, setInputValue] = useState<Profile>({
    yearsOfExperience: 0,
    specialization: "",
    logo: new File([], ""),
    liscenceNumber: "",
    consultationFee: 0,
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
      console.log(response.data);
      closeModal();
    },
    onError: (error: AxiosError) => {
      console.log(error?.response?.data);
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("bio", inputValue.bio);
    formData.append("consultationFee", String(inputValue.consultationFee));
    formData.append("liscenceNumber", inputValue.liscenceNumber);
    formData.append("specialization", inputValue.specialization);
    formData.append("yearsOfExperience", String(inputValue.yearsOfExperience));

    if (inputValue.logo) {
      formData.append("profilePicture", inputValue.logo);
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    await mutation.mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center mb-4">
        <UploadImage inputValue={inputValue} setInputValue={setInputValue} />
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
          value={inputValue.consultationFee}
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

      <Footer
        closeModal={closeModal}
        text={mutation.isPending ? "Saving..." : "Save Changes"}
        cancelText="Cancel"
      />
    </form>
  );
};

export default EditProfile;