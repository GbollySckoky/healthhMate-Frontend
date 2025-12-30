"use client"

import { createContext, useCallback, useContext, useState } from "react"

export type DoctorFormField = {
    signup: Record<string, string | number | boolean | File>,
    availableDays: string[]
    availableTime: string[]
}

export type DoctorFormContextType = {
  doctorFormData: DoctorFormField;
  updateDoctorData: (data: Record<string, string | number | boolean | File>) => void;
  updateAvailableDays: (days: string[]) => void;
  updateAvailableTime: (times: string[]) => void;
  addAvailableDay: (day: string) => void;
  removeAvailableDay: (day: string) => void;
  addAvailableTime: (time: string) => void;
  removeAvailableTime: (time: string) => void;
  toggleAvailableDay: (day: string) => void;
  toggleAvailableTime: (time: string) => void;
};

const initialDataForm: DoctorFormField = {
    signup: {},
    availableDays: [],
    availableTime: []
}

const DoctorFormContext = createContext<DoctorFormContextType | undefined>(undefined)

export const useDoctorForm = () => {
  const context = useContext(DoctorFormContext)
  if(!context){
    throw new Error("useDoctorForm must be used within a DoctorFormProvider")
  }
  return context
}

export const DoctorFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const [doctorFormData, setDoctorFormData] = useState<DoctorFormField>(initialDataForm)

    const updateDoctorData = useCallback(
      (newData: Record<string, string | number | boolean | File>) => {
        setDoctorFormData((prevData) => ({
          ...prevData,
          signup: {
            ...prevData.signup,
            ...newData,
          }
        }));
      },
      [],
    );

    const updateAvailableDays = useCallback(
      (days: string[]) => {
        setDoctorFormData((prevData) => ({
          ...prevData,
          availableDays: days,
        }));
      },
      [],
    );

    const updateAvailableTime = useCallback(
      (times: string[]) => {
        setDoctorFormData((prevData) => ({
          ...prevData,
          availableTime: times,
        }));
      },
      [],
    );

    const addAvailableDay = useCallback(
      (day: string) => {
        setDoctorFormData((prevData) => ({
          ...prevData,
          availableDays: [...prevData.availableDays, day],
        }));
      },
      [],
    );

    const removeAvailableDay = useCallback(
      (day: string) => {
        setDoctorFormData((prevData) => ({
          ...prevData,
          availableDays: prevData.availableDays.filter(d => d !== day),
        }));
      },
      [],
    );

    const addAvailableTime = useCallback(
      (time: string) => {
        setDoctorFormData((prevData) => ({
          ...prevData,
          availableTime: [...prevData.availableTime, time],
        }));
      },
      [],
    );

    const removeAvailableTime = useCallback(
      (time: string) => {
        setDoctorFormData((prevData) => ({
          ...prevData,
          availableTime: prevData.availableTime.filter(t => t !== time),
        }));
      },
      [],
    );

    const toggleAvailableDay = useCallback(
      (day: string) => {
        setDoctorFormData((prevData) => {
          const exists = prevData.availableDays.includes(day);
          return {
            ...prevData,
            availableDays: exists
              ? prevData.availableDays.filter(d => d !== day)
              : [...prevData.availableDays, day],
          };
        });
      },
      [],
    );

    const toggleAvailableTime = useCallback(
      (time: string) => {
        setDoctorFormData((prevData) => {
          const exists = prevData.availableTime.includes(time);
          return {
            ...prevData,
            availableTime: exists
              ? prevData.availableTime.filter(t => t !== time)
              : [...prevData.availableTime, time],
          };
        });
      },
      [],
    );

    const value = {
      doctorFormData,
      updateDoctorData,
      updateAvailableDays,
      updateAvailableTime,
      addAvailableDay,
      removeAvailableDay,
      addAvailableTime,
      removeAvailableTime,
      toggleAvailableDay,
      toggleAvailableTime,
    };
    
    return (
      <DoctorFormContext.Provider value={value}>
        {children}
      </DoctorFormContext.Provider>
    );
}