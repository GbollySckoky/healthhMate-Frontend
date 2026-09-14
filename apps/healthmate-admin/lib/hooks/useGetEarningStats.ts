import { useQuery } from '@tanstack/react-query'
import { Hospital_Admin } from '../service/service'


const useGetEarningStats = () => {
    const {data, isLoading , isError, error} = useQuery({
        queryKey: ['getPaymentStats'],
        queryFn: () => Hospital_Admin.getEarningStats()
    })

    const earningStats = data?.data || {}
  return {earningStats,isLoading , isError, error}
}

export default useGetEarningStats