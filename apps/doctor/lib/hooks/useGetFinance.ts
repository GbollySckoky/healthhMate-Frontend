// import { patientService } from '@/service/patientService'
import { useQuery } from '@tanstack/react-query'
import { Doctor } from '../constant/service'
import { useEffect, useState } from 'react'
import { Pagination } from '../interface/pagination.interfac';

const useGetFinance = () => {
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 10,
        totalPages: 0,
        total: 0,
    });
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['finance', pagination.page, pagination.limit],
        queryFn: () => Doctor.getFinance(pagination.page, pagination.limit)
    })
    
    const financeDatas = data?.data ?? []
    useEffect(() => {
        if (data?.meta) {
          setPagination((prev) => ({
            ...prev,
            total: data.meta.total,
            totalPages: data.meta.totalPages,
          }));
        }
      }, [data]);
  return {pagination, financeDatas, isLoading, isError, error, setPagination}
}

export default useGetFinance