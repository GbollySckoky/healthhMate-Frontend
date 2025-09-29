import { createContext, useCallback, useContext, useState } from "react";

export type SetupFormData = {
    hospital: Record<string, string>;
    branch:  Record<string, string>;
    doctor: Record<string, string>;
};

export type HospitalFormContextType = {
    hospitalFormData: SetupFormData;
    updateChecklistData: (section: keyof SetupFormData, field: string, value: string) => void;
    // resetChecklistData: () => void;
  };
  

const initialChecklistFormData: SetupFormData = {
    doctor: {},
    hospital: {},
    branch: {},
};

const HospitalFormContext = createContext<
    HospitalFormContextType | undefined
>(undefined);

export const useHospitalForm = () => {
    const context = useContext(HospitalFormContext);
    if (!context) {
      throw new Error(
        "useHospitalForm must be used within a HospitalFormProvider"
      );
    }
    return context;
};

export const HospitalFormProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [hospitalFormData, setHospitalFormData] = useState<SetupFormData>(
      initialChecklistFormData
    );
  
    const updateChecklistData = useCallback(
        (section: keyof SetupFormData, field: string, value: string) => {
          setHospitalFormData((prevData) => ({
            ...prevData,
            [section]: {
              ...prevData[section],
              [field]: value,
            },
          }));
        },
        []
      );
      
  
    const resetChecklistData = useCallback(() => {
        setHospitalFormData(initialChecklistFormData);
    }, []);
  
    const value = {
      hospitalFormData,
      updateChecklistData,
      resetChecklistData,
    };
  
    return (
      <HospitalFormContext.Provider value={value}>
        {children}
      </HospitalFormContext.Provider>
    );
  };