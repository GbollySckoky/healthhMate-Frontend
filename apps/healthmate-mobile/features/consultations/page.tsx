"use client";

// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { patientService } from "@/service/patientService";
import Doctor from "./_components/Doctor";

const ConsultationPage = () => {
  const page = 1;
  const limit = 10;
  const {
    data,
    isLoading: loadingHospitals,
  } = useQuery({
    queryKey: [
      "getAllHospitals",
      page,
      limit,
      "",
    ],
    queryFn: () =>
      patientService.getHospitals(
        page,
        limit,
        "",
      ),
    staleTime: 5 * 60 * 1000,
  });

  const hospitalId = data?.data[0]?.id
  if (loadingHospitals) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xs font-normal">Fetching available doctors...</p>
      </div>
    );
  }
  
  return <Doctor hospitalId={hospitalId == null ? undefined : String(hospitalId)} />
};

export default ConsultationPage;
