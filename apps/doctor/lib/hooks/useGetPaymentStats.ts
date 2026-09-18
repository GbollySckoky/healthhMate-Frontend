import { useQuery } from '@tanstack/react-query'
import { Doctor } from '../constant/service'

const useGetEarningStats = () => {
    const {data, isLoading: earningLoading , isError: isEarningError, error: earningError} = useQuery({
        queryKey: ['getPaymentStats'],
        queryFn: () => Doctor.getEarningStats()
    })

    const earningStats = data?.data || {}
  return {earningStats, earningLoading, isEarningError, earningError}
}

export default useGetEarningStats