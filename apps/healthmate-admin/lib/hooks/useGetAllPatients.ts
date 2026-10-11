import { STATUS } from "@/lib/types/status";
import useGetAllAppointments from "./useGetAllAppointments";

const useGetAllPatients = () => {
  const { appointmentData, ...query } = useGetAllAppointments();
  const patients = appointmentData.filter(
    (patient) => patient.status !== STATUS.PENDING,
  );
  return { ...query, patients };
};

export default useGetAllPatients;
