// import { useHospitalForm } from "@/lib/context/HospitalContextForm";
// import Image from "next/image";
// import React, { useState } from "react";

// const UploadLogo = () => {
//   const [preview, setPreview] = useState("");
//   const { updateHospitalData } = useHospitalForm();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;

//     // Save image file in context
//     updateHospitalData({ logo: selected });

//     // Preview the file
//     setPreview(URL.createObjectURL(selected));
//   };

//   return (
//     <div className="border p-4">
//       <input type="file" onChange={handleFileChange} />

//       {preview && (
//         <Image
//           src={preview}
//           alt="preview"
//           className="mt-4 w-40 h-40 object-cover rounded-lg border"
//         />
//       )}
//     </div>
//   );
// };

// export default UploadLogo;

import React from 'react'

const UploadLogo = () => {
  return (
    <div>UploadLogo</div>
  )
}

export default UploadLogo