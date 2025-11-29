import { useHospitalForm } from "@/lib/context/HospitalContextForm";
import React, { useState } from "react";

const Image = () => {
  const [preview, setPreview] = useState("");
  const { hospitalFormData, updateHospitalData } = useHospitalForm();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Save image file in context
    updateHospitalData({ logo: selected });

    // Preview the file
    setPreview(URL.createObjectURL(selected));
  };

  return (
    <div className="border p-4">
      <input type="file" onChange={handleFileChange} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-4 w-40 h-40 object-cover rounded-lg border"
        />
      )}
    </div>
  );
};

export default Image;
