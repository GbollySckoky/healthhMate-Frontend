"use client"

import { createContext, useContext, useState } from "react";
import { GetAllAppointment } from "../interface/get-all-appointment";
import { useQuery } from "@tanstack/react-query";
import { Doctor } from "../constant/service";

interface AppointmentFilters {
    status?: string | undefined;
    q?: string | undefined;
    // patient_name?: string;
    // patient_email?: string;
}

interface GetAppointment {
    datas: GetAllAppointment[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
    filters: AppointmentFilters;
    setFilters: (filters: AppointmentFilters) => void;
}

export const AppointmentContext = createContext<GetAppointment | undefined>(undefined);

export const useAppointment = () => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error("useAppointment must be used within an AppointmentProvider");
    }
    return context;
}

export const AppointmentProvider = ({
    children,
    initialFilters = {}
}: {
    children: React.ReactNode;
    initialFilters?: AppointmentFilters;
}) => {
    const [filters, setFilters] = useState<AppointmentFilters>(initialFilters);
    const [pagination, setPagination] = useState(
    { page: 1, limit: 10, totalCount: 0, totalPages: 0 });
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['getAppointment', filters, pagination],
        queryFn: () => Doctor.getAppointment(
            pagination.page,
            pagination.limit,
            filters.status,
            filters.q,
            // filters.patient_name,
            // filters.patient_email
        ),
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });
    
    const datas = data?.data ?? [];
    
    return (
        <AppointmentContext.Provider value={{ 
            datas, 
            isLoading, 
            error: error as Error | null,
            refetch,
            filters,
            setFilters
        }}>
            {children}
        </AppointmentContext.Provider>
    );
};