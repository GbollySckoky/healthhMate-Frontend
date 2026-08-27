import { STATUS } from '@/types/status';
import { useEffect, useState } from 'react'
import { GET_ALL_APPOINTMENTS } from '../interface/get_all_appointyment';
import { Hospital_Admin } from '../service/service';
import { useQuery } from '@tanstack/react-query';

const useGetAllAppointments = () => {
      const [searchInput, setSearchInput] = useState("");
      const [debounceSearchQuery, setDebounceSearchQuery] = useState("");
      const [activeStatus, setActiveStatus] = useState<string | undefined>();
    
      const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 0,
        total: 0,
      });
    
      useEffect(() => {
        const timeout = setTimeout(() => {
          setDebounceSearchQuery(searchInput);
    
          setPagination((prev) => ({
            ...prev,
            page: 1,
          }));
        }, 300);
    
        return () => clearTimeout(timeout);
      }, [searchInput]);
    
      const { data, isLoading, isError, error } = useQuery({
        queryKey: [
          "appointment",
          pagination.page,
          pagination.limit,
          debounceSearchQuery,
          activeStatus,
        ],
        queryFn: () =>
          Hospital_Admin.getAllAppointments(
            pagination.page,
            pagination.limit,
            debounceSearchQuery,
            activeStatus
          ),
      });
    
      const appointmentData: GET_ALL_APPOINTMENTS[] = data?.data ?? [];
    
      useEffect(() => {
        if (data?.meta) {
          setPagination((prev) => ({
            ...prev,
            total: data.meta.total,
            totalPages: data.meta.totalPages,
          }));
        }
      }, [data]);
      
    
      const totalAppointments = pagination.total || appointmentData.length;
    
      const completedAppointments = appointmentData.filter(
        (appointment) => appointment.status === STATUS.COMPLETED
      ).length;
    
      const pendingAppointments = appointmentData.filter(
        (appointment) => appointment.status === STATUS.PENDING
      ).length;
    
      const totalAmount = appointmentData.reduce(
        (total, appointment) => total + (appointment.amount ?? 0),
        0
      );
  return {
    totalAppointments,
    completedAppointments,
    pendingAppointments,
    totalAmount,
    isLoading, 
    isError, 
    error,
    appointmentData,
    setActiveStatus,
    pagination, 
    setPagination,
    searchInput, 
    setSearchInput 
}
}

export default useGetAllAppointments