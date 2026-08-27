import { useQuery } from '@tanstack/react-query';
import { Hospital_Admin } from '../service/service';
import { useEffect, useState } from 'react';
// import { Doctor } from '@/lib/constant/service';

const useGetSupport = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    total: 0,
  });
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["getSupportTicket", pagination.page, pagination.limit],
        queryFn: () => Hospital_Admin.getSupportTicket( pagination.page, pagination.limit),
    });
    const supportData = data?.data ?? []

    useEffect(() => {
      if (data?.meta) {
        setPagination((prev) => ({
            ...prev,
            total: data.meta.total,
            totalPages: data.meta.totalPages,
          }));
      }
    },[data])
  return {supportData, isLoading, isError, error, pagination, setPagination}
}

export default useGetSupport