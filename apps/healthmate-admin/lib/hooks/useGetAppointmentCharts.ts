"use client"

import { useQuery } from '@tanstack/react-query';
import { Hospital_Admin } from '../service/service';

export default function useGetAppointmentCharts() {
    return useQuery({
        staleTime: 60_000,
        queryKey: ['hospital-appointment-charts'],
        queryFn: () => Hospital_Admin.getAppointmentCharts(),
    });
}
