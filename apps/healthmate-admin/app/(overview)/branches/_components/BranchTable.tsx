"use client";

import { useModal } from "@/lib/components/Modal/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import { Trash2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import DeleteModal from "../../settings/_components/DeleteModal";
import { Hospital_Admin } from "@/lib/service/service";
import BranchTableSkeleton from "@/components/ui/BranchPageSkeleton";
import { Branch } from "@/lib/interface/branch";
import Paginate from "@/lib/components/ui/paginate";
import { useEffect, useState } from "react";
import { CapitalizeName } from "@/lib/constant/capitalizeName";

type BranchTableProps = {
  searchQuery?: string;
  // status?: string;
};

const BranchTable = ({ searchQuery = "" }: BranchTableProps) => {
  const { openModal } = useModal();
  const router = useRouter();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    total: 0,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["branch", searchQuery, pagination.page, pagination.limit],
    queryFn: () => Hospital_Admin.getBranch(searchQuery, pagination.page, pagination.limit),
  });

  const branches = data?.data ?? [];

  const filteredBranches = branches.filter((branch: any) => {
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      branch.branchName?.toLowerCase().includes(search) ||
      branch.branchAddress?.toLowerCase().includes(search) ||
      branch.phoneNumber?.toLowerCase().includes(search) ||
      branch.state?.toLowerCase().includes(search);

    const matchesStatus = status ? branch.status === status : true;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {

  })

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    branchName: string
  ) => {
    e.stopPropagation();

    openModal(
      <DeleteModal text="Are you sure you want to delete this branch? All the data would be permanently deleted." />,
      {
        title: `Delete ${branchName || "Branch"}?`,
        className: "max-w-lg",
        onClose: () => {},
        // confirmDelete() {},
      }
    );
  };

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    branchId: number
  ) => {
    e.stopPropagation();
    router.push(`/branches/${branchId}/edit`);
  };

  return (
    <div>
      <Table>
        <TableHeader className="border-t border-borderColor text-[#535862]">
          <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium">
            <TableHead>Id</TableHead>
            <TableHead>Branch Name</TableHead>
            <TableHead>Branch Address</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Location</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        {isLoading ? (
          <BranchTableSkeleton />
        ) : (
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-sm text-red-600"
                >
                  {error.message}
                </TableCell>
              </TableRow>
            ) : filteredBranches.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-sm text-gray-500"
                >
                  No branches found
                </TableCell>
              </TableRow>
            ) : (
              filteredBranches.map((branch: Branch) => (
                <TableRow
                  key={branch.id}
                  onClick={() => router.push(`/branches/${branch.id}`)}
                  className="cursor-pointer hover:bg-[#FAFBFF]"
                >
                  <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                    {branch.id}
                  </TableCell>

                  <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                    {branch.branchName || "-"}
                  </TableCell>

                  <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                    {branch.branchAddress || "-"}
                  </TableCell>

                  <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                    {branch.phoneNumber || "-"}
                  </TableCell>

                  <TableCell className="font-inter font-normal text-[12px] text-grey-20">
                    {CapitalizeName(branch.state) || "-"}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) =>
                          handleDeleteClick(e, branch.branchName)
                        }
                      >
                        <Trash2 color="#F04438" size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleEditClick(e, branch.id)}
                      >
                        <Pencil size={15} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        )}
      </Table>

      <Paginate pagination={pagination} setPagination={setPagination}/>
    </div>
  );
};

export default BranchTable;