import { TableBody, TableCell, TableRow } from "./table";

const DoctorTableSkeleton = () => {
  return (
    <TableBody className="animate-pulse">
      {Array.from({ length: 8 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="ml-2 space-y-2">
                <div className="h-3.5 w-28 rounded bg-gray-200" />
                <div className="h-3 w-36 rounded bg-gray-100" />
              </div>
            </div>
          </TableCell>

          <TableCell>
            <div className="h-3.5 w-40 rounded bg-gray-200" />
          </TableCell>

          <TableCell>
            <div className="h-3.5 w-28 rounded bg-gray-200" />
          </TableCell>

          <TableCell>
            <div className="h-3.5 w-16 rounded bg-gray-200" />
          </TableCell>

          <TableCell>
            <div className="h-3.5 w-28 rounded bg-gray-200" />
          </TableCell>

          <TableCell>
            <div className="h-3.5 w-24 rounded bg-gray-200" />
          </TableCell>

          <TableCell>
            <div className="h-3.5 w-20 rounded bg-gray-200" />
          </TableCell>

          <TableCell>
            <div className="h-4 w-4 rounded bg-gray-200" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default DoctorTableSkeleton