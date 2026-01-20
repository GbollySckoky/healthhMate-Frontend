"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { GetAllAppointment } from "../interface/get-all-appointment"
import { useQuery } from "@tanstack/react-query";
import { Doctor } from "../constant/service";
import { activeStatus } from "@/types/status";

interface GetAppointment {
    data: GetAllAppointment[],
    isLoading: boolean,
    error: Error | null
}

export const AppointmentContext = createContext<GetAppointment>({
    data: [],
    isLoading: false,
    error: null
});

export const useAppointment = () => {
    const context = useContext(AppointmentContext)
    if(!context){
      throw new Error("useAppointmentF must be used within a AppointmentProvider")
    }
    return context
  }
  

  // ApiContext.js (continued)
export const AppointmentProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [searchInput, setSearchInput] = useState<string>('')
    
    const {data, isLoading, error} = useQuery({
        queryKey: ['getAppointment'],
        queryFn: () => Doctor.getAppointment(
            // activeStatus,
        )
    });

    // Provide the state and loading status to children components
    return (
      <AppointmentContext.Provider value={{ data, isLoading, error }}>
        {children}
      </AppointmentContext.Provider>
    );
  };
  