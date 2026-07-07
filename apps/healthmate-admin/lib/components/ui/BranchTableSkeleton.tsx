import {
  TableBody,
  TableCell,
  TableRow,
} from "@/lib/components/ui/table";

const BranchTableSkeleton = () => {
  return (
    <TableBody className="animate-pulse">
      {Array.from({ length: 7 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="h-3.5 w-8 rounded bg-gray-200" />
          </TableCell>
          <TableCell>
            <div className="h-3.5 w-32 rounded bg-gray-200" />
          </TableCell>
          <TableCell>
            <div className="h-3.5 w-48 rounded bg-gray-200" />
          </TableCell>
          <TableCell>
            <div className="h-3.5 w-28 rounded bg-gray-200" />
          </TableCell>
          <TableCell>
            <div className="h-3.5 w-24 rounded bg-gray-200" />
          </TableCell>
          <TableCell>
            <div className="flex gap-3">
              <div className="h-4 w-4 rounded bg-gray-200" />
              <div className="h-4 w-4 rounded bg-gray-200" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default BranchTableSkeleton