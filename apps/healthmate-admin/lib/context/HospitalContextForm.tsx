"use client"

import { createContext, useCallback, useContext, useState } from "react"

export type HospitalFormField = {
    register: Record<string, string | number | File>
}

export type HospitalFormContextType = {
  hospitalFormData: HospitalFormField;
  updateHospitalData: (data: Record<string, string | number | File>) => void;
  };

const initialDataForm: HospitalFormField = {
    register: {}
}

const HospitalFormContext = createContext< HospitalFormContextType | undefined>(undefined)


export const useHospitalForm = () => {
  const context = useContext(HospitalFormContext)
  if(!context){
    throw new Error("useHospitalForm must be used within a HospitalFormProvider")
  }
  return context
}

export const HospitalFormProvider = ({
children,
}: {
  children: React.ReactNode;
}) => {
    const [hospitalFormData, setHospitalFormData] = useState<HospitalFormField>(initialDataForm)

    const updateHospitalData = useCallback(
      (newData: Record<string, string | number | File>) => {
        setHospitalFormData((prevData) => ({
          ...prevData,
          register: {
            ...prevData.register,
            ...newData,
          }
        }));
      },
      [],
    );


    const value = {
      hospitalFormData,
      updateHospitalData
      };
    
      return (
        <HospitalFormContext.Provider value={value}>
          {children}
        </HospitalFormContext.Provider>
      );
}