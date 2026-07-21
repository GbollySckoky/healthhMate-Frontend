import { TableBody, TableCell, TableRow } from "./table";

const SupportTableSkeleton = () => {
  return (
    <TableBody className="animate-pulse">
      {Array.from({ length: 7 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell><div className="h-3.5 w-16 rounded bg-gray-200" /></TableCell>
          <TableCell><div className="h-3.5 w-24 rounded bg-gray-200" /></TableCell>
          <TableCell><div className="h-3.5 w-32 rounded bg-gray-200" /></TableCell>
          <TableCell><div className="h-3.5 w-20 rounded bg-gray-200" /></TableCell>
          <TableCell><div className="h-3.5 w-16 rounded bg-gray-200" /></TableCell>
          <TableCell><div className="h-3.5 w-40 rounded bg-gray-200" /></TableCell>
          <TableCell><div className="h-3.5 w-20 rounded bg-gray-200" /></TableCell>
          <TableCell><div className="h-3.5 w-24 rounded bg-gray-200" /></TableCell>
          <TableCell><div className="h-3.5 w-24 rounded bg-gray-200" /></TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default SupportTableSkeleton;