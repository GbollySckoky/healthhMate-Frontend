import { STATUS } from "@/types/status"

export const getStatusStyle = (status: string) => {
  switch (status) {
    case STATUS.COMPLETED:
      return "text-green-700 bg-green-100";
    case STATUS.PENDING:
      return "text-gray-700 bg-gray-100";
    case STATUS.CANCELLED:
    case STATUS.REJECTED:
      return "text-red-800 bg-red-100";
    default:
      return "text-gray-700 bg-gray-100";
  }
};