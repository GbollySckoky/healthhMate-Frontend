"use client"
import { useModal } from "@/components/Modal/Modal";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import image from '@/assets/Image.png'
import { Trash2, Pencil } from 'lucide-react';
import { activeStatus } from "@/types/status";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useRouter } from "next/navigation";
import DeleteModal from "../../settings/_components/DeleteModal";
import { useQuery } from "@tanstack/react-query";
import { Hospital_Admin } from "@/lib/service/service";

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Open",
      image: image,
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "Closed",
      image: image,
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "In Progress",
      image: image,
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "In Progress",
      image: image,
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "Active",
      image: image,
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Inactive",
      image: image,
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Closed",
      image: image,
    },
  ]
const BranchTable = () => {
    const { openModal } = useModal();
    const router = useRouter()
    const { data, isLoading } = useQuery({
      queryKey: ['branch'],
      queryFn: () => Hospital_Admin.getBranch(),
    })
     console.log('DATA!!', data)
    return (
        <div>
          <Table>
              <TableHeader className="border-t border-borderColor text-[#535862]">
                  <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                      <TableHead>Id</TableHead>
                      <TableHead >Branch Name</TableHead>
                      <TableHead>Branch Address</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead></TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody onClick={() => router.push("/branches/1")}>
                {data?.data.map((branch: any) => (
                    <TableRow  key={branch.id}>
                    <TableCell className="font-inter font-medium text-[14px] text-grey-20"> {branch.id}</TableCell>
                    <TableCell className="font-inter font-medium text-[14px] text-grey-20"> {branch.branchName}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{branch.branchAddress}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{branch.phoneNumber}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{branch.state}</TableCell>
                    <TableCell className="font-inter font-medium text-[14px]  cursor-pointer flex">
                          <span onClick={() =>
                            openModal(<DeleteModal
                              text="Are you sure you want to delete this branch? All the data would be permanently deleted "
                              />, {
                              title:
                                'Delete Ikoyi Center?',
                              className: 'max-w-lg',
                              onClose: () => {},
                              confirmDelete() {},
                            })
                          }> <Trash2 color="#F04438" size={15}/></span>
                         <span className="ml-3"> <Pencil size={15} /></span>
                    </TableCell>
                    </TableRow>
                ))}
              </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" >3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
    )
}

export default BranchTable