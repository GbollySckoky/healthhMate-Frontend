
import { useDoctorForm } from "@/lib/DoctorFormContext";
import React, { useState } from "react";

const DegreeCertificate = () => {
  const [preview, setPreview] = useState("");
  const { updateDoctorData } = useDoctorForm();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Save image file in context
    updateDoctorData({ degree_certificate: selected });

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

export default DegreeCertificate;
