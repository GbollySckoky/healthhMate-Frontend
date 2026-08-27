import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { Hospital_Admin } from '../service/service';
import { GET_ALL_APPOINTMENTS } from '../interface/get_all_appointyment';
import { STATUS } from '@/types/status';

const useGetAllPatients = () => {
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
    
      useEffect(() => {
        if (data?.meta) {
          setPagination((prev) => ({
            ...prev,
            total: data.meta.total,
            totalPages: data.meta.totalPages,
          }));
        }
      }, [data]);
    
      const appointmentData: GET_ALL_APPOINTMENTS[] = data?.data ?? [];
    
      const patients = appointmentData.filter(
        (patient) => patient.status !== STATUS.PENDING
      );
  return {patients,isLoading,isError,error, setSearchInput, setPagination, pagination,setActiveStatus,searchInput, activeStatus}
}

export default useGetAllPatients