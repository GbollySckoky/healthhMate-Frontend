"use clirnt"
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { Hospital_Admin } from '../service/service';

const useGetDoctor = () => {
    const [searchInput, setSearchInput] = useState("");
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 0,
        total: 0
    })

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["getAllDoctor", searchInput, pagination.page, pagination.limit],
        queryFn: () => Hospital_Admin.getAllDoctor(searchInput, pagination.page, pagination.limit),
      });
    
    const doctors = data?.data ?? [];

    useEffect(() => {
        if(data?.meta) {
            setPagination((prev) => ({
                ...prev,
                total: data.meta.total,
                totalPages: data.meta.totalPages,
            }))
        }
    },[data])

//     const filteredDoctors = doctors.filter((doctor: any) => {
//     const search = searchInput.toLowerCase();

//     const fullName = `${doctor.firstName || ""} ${doctor.lastName || ""}`.toLowerCase();

//     return (
//       fullName.includes(search) ||
//       doctor.email?.toLowerCase().includes(search) ||
//       doctor.phoneNumber?.toLowerCase().includes(search) ||
//       doctor.profile?.specialization?.toLowerCase().includes(search)
//     );
//   });

  return {pagination, doctors, isLoading, isError, error, setPagination, searchInput, setSearchInput}
}

export default useGetDoctor