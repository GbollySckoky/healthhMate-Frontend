"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const UploadImage = ({
  inputValue,
  setInputValue,
}: {
  inputValue: any;
  setInputValue: any;
}) => {
  const [preview, setPreview] = useState("");

  // If a logo File already exists (e.g. carried over in form state),
  // show it as the preview
  useEffect(() => {
    if (inputValue?.logo && inputValue.logo.size > 0) {
      const url = URL.createObjectURL(inputValue.logo);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [inputValue?.logo]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setInputValue((prev: any) => ({ ...prev, logo: selected }));

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