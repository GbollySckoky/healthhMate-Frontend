import { useQuery } from '@tanstack/react-query';
import { Doctor } from '@/lib/constant/service';
import { useEffect, useState } from 'react';
import { Pagination } from '../interface/pagination.interfac';

const useGetSupport = () => {
  const [pagination, setPagination] = useState<Pagination>({
      page: 1,
      limit: 10,
      totalPages: 0,
      total: 0,
  });
  const { data, isLoading, isError, error } = useQuery({
      queryKey: ["getSupportTicket"],
      queryFn: () => Doctor.getSupportTicket(),
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
  }, [data]);
  return {supportData, isLoading, isError, error, pagination, setPagination}
}

export default useGetSupport