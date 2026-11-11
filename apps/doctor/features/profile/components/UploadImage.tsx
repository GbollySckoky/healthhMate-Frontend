"use client";

import Image from "next/image";
import React, { useState, useEffect, useId } from "react";
import { Camera, Upload } from "lucide-react";
import defaultImage from "@/assets/default.jpg";

const UploadImage = ({
  inputValue,
  setInputValue,
  currentImage,
}: {
  currentImage?: string;
  inputValue: {
    yearsOfExperience: string;
    specialization: string;
    liscenceNumber: string;
    consultationFee: string;
    bio: string;
    profilePicture?: File | null;
  };
  setInputValue: React.Dispatch<
    React.SetStateAction<{
      yearsOfExperience: string;
      specialization: string;
      liscenceNumber: string;
      consultationFee: string;
      bio: string;
      profilePicture?: File | null;
    }>
  >;
}) => {
  const [preview, setPreview] = useState("");
  const inputId = useId();

  useEffect(() => {
    if (inputValue?.profilePicture instanceof File && inputValue.profilePicture.size > 0) {
      const url = URL.createObjectURL(inputValue.profilePicture);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview("");
  }, [inputValue?.profilePicture]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setInputValue((prev) => ({
      ...prev,
      profilePicture: selected,
    }));

  };

  return (
    <div className="flex flex-col items-center gap-3 py-5">
      <label htmlFor={inputId} className="group relative cursor-pointer rounded-full focus-within:ring-2 focus-within:ring-red-800 focus-within:ring-offset-4">
        <Image
          src={preview || currentImage || defaultImage}
          alt="Doctor profile photo"
          width={112}
          height={112}
          unoptimized={Boolean(preview)}
          className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-1 ring-gray-200"
        />
        <span className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-red-800 text-white transition-colors group-hover:bg-red-900">
          <Camera size={16} />
        </span>
        <input id={inputId} type="file" accept="image/*" onChange={handleFileChange}
          aria-label="Upload profile photo" className="sr-only" />
      </label>
      <div className="text-center">
        <label htmlFor={inputId} className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-red-800 hover:text-red-900">
          <Upload size={15} />
          {preview || currentImage ? 'Change profile photo' : 'Upload profile photo'}
        </label>
        <p className="mt-1 text-xs text-gray-500">Choose a clear photo for your doctor profile.</p>
        {inputValue.profilePicture && (
          <p className="mt-2 max-w-64 truncate text-xs text-gray-600" title={inputValue.profilePicture.name}>
            {inputValue.profilePicture.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadImage;