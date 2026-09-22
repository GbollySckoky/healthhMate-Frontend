"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const UploadImage = ({
  inputValue,
  setInputValue,
}: {
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

  useEffect(() => {
    if (inputValue?.profilePicture instanceof File && inputValue.profilePicture.size > 0) {
      const url = URL.createObjectURL(inputValue.profilePicture);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [inputValue?.profilePicture]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setInputValue((prev) => ({
      ...prev,
      profilePicture: selected,
    }));

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(selected));
  };

  return (
    <div className="border p-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <Image
          src={preview}
          alt="preview"
          width={160}
          height={160}
          unoptimized
          className="mt-4 w-40 h-40 object-cover rounded-lg border"
        />
      )}
    </div>
  );
};

export default UploadImage;