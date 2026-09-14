import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { Hospital_Admin } from '../service/service';

const useGetApprovedPatients = () => {
    const [inputValue, setInputValue] = useState<string>('')
    // const [selectValue, setSelectValue] = useState('')
    const [debounceSearchQuery, setDebounceSearchQuery] = useState("")
     const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 0,
        total: 0,
    });
    const [activeStatus, setActiveStatus] = useState<string | undefined>();
     const { data, isLoading, error, isError } = useQuery({
            queryKey: [
              "getApprovedAppointment",
              pagination.page,
              pagination.limit,
              activeStatus,
              debounceSearchQuery
            ],
            queryFn: () =>
              Hospital_Admin.getApprovedAppointment(
                pagination.page,
                pagination.limit,
                activeStatus,
                debounceSearchQuery
              ),
        });
        
        const patients = data?.data || []
        console.log(patients)
         useEffect(() => {
            if (data?.meta) {
              setPagination((prev) => ({
                ...prev,
                total: data.meta.total,
                totalPages: data.meta.totalPages,
              }));
            }
          }, [data]);
  return {inputValue, setInputValue, setDebounceSearchQuery, patients ,isLoading, error, isError, pagination, setPagination, activeStatus, setActiveStatus }
}

export default useGetApprovedPatients