import { patientService } from '@/service/patientService'
import { useQuery } from '@tanstack/react-query'
// import React, { useState } from 'react'

const useGetFinance = () => {
    const page = 1
    const limit = 10
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['finance'],
        queryFn: () => patientService.getFinance()
    })
    
  return {page,limit, data, isLoading, isError, error}
}

export default useGetFinance