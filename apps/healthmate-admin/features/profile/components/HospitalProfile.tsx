"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Input from "@/lib/components/Inputs/Inputs";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Hospital_Admin } from "@/lib/service/service";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export type HospitalProfileData = {
  specializations: string;
  licenseNumber: string;
  address: string;
  state: string;
  bio: string;
  website: string;
  profilePicture: string;
};

type HospitalProfileForm = {
  specializations: string;
  licenseNumber: string;
  address: string;
  state: string;
  bio: string;
  website: string;
  profilePicture: File | null;
};

const HospitalProfile = ({ profile, onSaved, onCancel }: {
  profile?: HospitalProfileData | null;
  onSaved?: () => void;
  onCancel?: () => void;
}) => {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState<HospitalProfileForm>({
    specializations: profile?.specializations ?? "",
    licenseNumber: profile?.licenseNumber ?? "",
    address: profile?.address ?? "",
    state: profile?.state ?? "",
    bio: profile?.bio ?? "",
    website: profile?.website ?? "",
    profilePicture: null,
  });

  const [preview, setPreview] = useState<string>(profile?.profilePicture ?? "");

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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
    mutationFn: (payload: FormData) => profile ? Hospital_Admin.updateProfile(payload) : Hospital_Admin.createProfile(payload),
    onSuccess: (response) => {
      toast.success(response.data.message ?? "Profile saved successfully");
      onSaved?.();
      void queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data.message ?? "Failed to save profile. Please try again.");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mutation.isPending) return;

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

    mutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-lg border border-borderColor w-full ">
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
          {onCancel && (
            <button type="button" onClick={onCancel} className="mr-3 rounded-lg border border-borderColor px-4 py-2">Cancel</button>
          )}
          <button
            className={`text-white rounded-lg px-4 py-2 ${mutation.isPending ? "bg-pink-300 cursor-not-allowed" : "bg-pink-600 cursor-pointer"}`}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HospitalProfile;
