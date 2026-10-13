import { useQuery } from '@tanstack/react-query';
import { Doctor } from '../constant/service';
// import { Doctor } from '../constant/service';

const useGetTodayAppointment = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['today-appointments'],
        queryFn: () => Doctor.getTodayAppointments(),
        refetchOnMount: 'always',
    })  
    const todayAppointments = data?.data || []
    console.log("todayAppointments", todayAppointments)
  return {todayAppointments, isLoading, isError, error}
}

export default useGetTodayAppointment
