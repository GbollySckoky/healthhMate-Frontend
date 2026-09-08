import { patientService } from '@/service/patientService'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
// import React, { useState } from 'react'

const useGetFinance = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPage: 0,
    total: 0
  })
  
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['finance', pagination.page, pagination.limit],
        queryFn: () => patientService.getFinance(pagination.page, pagination.limit)
    })

    const financeData = data.data || []
    
    useEffect(() => {
      if(data?.meta){
        setPagination((prev) => ({
          ...prev,
          total: data.meta.total,
          limit: data.meta.limit
        }))
      }
    },[data])
    
  return {pagination, financeData, isLoading, isError, error}
}

export default useGetFinance