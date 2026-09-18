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
  } = useQuery({
    queryKey: [
      "getAllHospitals",
      page,
      limit,
    ],
    queryFn: () =>
      patientService.getHospitals(
        page,
        limit,
      ),
  });

  const hospitalId = data?.data[0]?.id
  
  return <Doctor hospitalId={String(hospitalId)} />
};

export default ConsultationPage;
