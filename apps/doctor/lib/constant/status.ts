import { STATUS } from "@/types/status";

  export const getStatusStyle = (status: string) => {
    switch (status) {
      case STATUS.COMPLETED:
        return "text-[#2F855A] bg-[#EAF7EE]";
      case STATUS.PENDING:
        return "text-[#2B6CB0] bg-[#EAF2FF]";
      case STATUS.CANCELLED || STATUS.FAILED:
        return "text-[#C53030] bg-[#FDECEC]";
     case STATUS.UPCOMING:
        return "text-[#B7791F] bg-[#FFF7E6]";
      case STATUS.PAID:
        return "text-[#2F855A] bg-[#EAF7EE]";
      case STATUS.FAILED:
        return "text-[#C53030] bg-[#FDECEC]";
      default:
        return "text-gray-700 bg-gray-100";
    }
}