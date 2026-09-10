import { TableCell, TableRow } from "./table"

const TABLE_COLUMNS = 8

const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-[#EAECF0] rounded ${className}`} />
)

export const TransactionsRowSkeleton = () => (
  <TableRow>
    <TableCell><SkeletonBlock className="h-3 w-20" /></TableCell>
    <TableCell><SkeletonBlock className="h-3 w-24" /></TableCell>
    <TableCell><SkeletonBlock className="h-3 w-16" /></TableCell>
    <TableCell><SkeletonBlock className="h-3 w-20" /></TableCell>
    <TableCell><SkeletonBlock className="h-3 w-14" /></TableCell>
    <TableCell><SkeletonBlock className="h-3 w-16" /></TableCell>
    <TableCell><SkeletonBlock className="h-5 w-16 rounded-full" /></TableCell>
    <TableCell><SkeletonBlock className="h-3 w-8" /></TableCell>
  </TableRow>
)

export const TransactionsTableSkeleton = ({ rows = 8 }: { rows?: number }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <TransactionsRowSkeleton key={i} />
    ))}
  </>
)

export const TransactionsEmptyState = () => (
  <TableRow>
    <TableCell colSpan={TABLE_COLUMNS} className="text-center py-10">
      <p className="text-[13px] font-medium text-grey-30">No transactions found</p>
      <p className="text-[12px] text-[#535862] mt-1">
        Transactions will show up here once payments start coming in.
      </p>
    </TableCell>
  </TableRow>
)

export const TransactionsErrorState = ({ message }: { message?: string }) => (
  <TableRow>
    <TableCell colSpan={TABLE_COLUMNS} className="text-center py-10">
      <p className="text-[13px] font-medium text-red-800">Couldn&apos;t load transactions</p>
      <p className="text-[12px] text-[#535862] mt-1">
        {message ?? "Something went wrong. Please try again."}
      </p>
    </TableCell>
  </TableRow>
)