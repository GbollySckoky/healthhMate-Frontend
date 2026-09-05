import { patientService } from '@/service/patientService';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from "react-toastify";

const useCall = () => {
  const cancelCallSession = useMutation({
    mutationKey: ['cancelCallSession'],
    mutationFn: (callSessionId: string) =>
      patientService.cancelCallSession(callSessionId),
    onSuccess: (response) => {
      toast.success(response.data?.message ?? 'Call session canceled successfully');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error('Failed to cancel call session:', error);
      toast.error(error?.response?.data?.message ?? 'Failed to cancel call session');
    },
  });

  const endCallSession = useMutation({
    mutationKey: ['endCallSession'],
    mutationFn: (callSessionId: string) =>
      patientService.endCallSession(callSessionId),
    onSuccess: (response) => {
      toast.success(response.data?.message ?? 'Call session ended successfully');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error('Failed to end call session:', error);
      toast.error(error?.response?.data?.message ?? 'Failed to end call session');
    },
  });

  return {
    cancelCallSession,
    endCallSession,
  };
};

export default useCall;