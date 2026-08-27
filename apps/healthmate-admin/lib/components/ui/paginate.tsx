// import { Pagination } from "@/lib/interface/pagination.interfac"
type Pagination = {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
};

interface PaginationInterface{
  pagination: Pagination
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>
}
const Paginate = ({pagination, setPagination}:PaginationInterface ) => {
   const handleNextPage = () => {
      setPagination((prev) => ({
        ...prev,
        page: Math.min(prev.page + 1, prev.totalPages),
      }));
    };
  
    const handlePreviousPage = () => {
      setPagination((prev) => ({
        ...prev,
        page: Math.max(prev.page - 1, 1),
      }));
    };
  return (
   <div className="flex items-center justify-between px-4 py-4 border-t border-borderColor">
      <p className="text-sm text-gray-500">
        Page {pagination.page} of {pagination.totalPages || 1}  Total{" "}
        {pagination.total}
      </p>

      <div className="flex gap-2">
        <button
          onClick={handlePreviousPage}
          disabled={pagination.page === 1}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={handleNextPage}
          disabled={
            pagination.page === pagination.totalPages ||
            pagination.totalPages === 0
          }
          className="px-3 py-1 text-sm border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Paginate