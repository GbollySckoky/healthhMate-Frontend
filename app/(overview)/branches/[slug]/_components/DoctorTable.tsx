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
import Image from "next/image";
import { MinTexts } from "@/components/reusable/Reusable";
import {  activeStatus } from "@/types/status";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Trash2, Pencil } from 'lucide-react';
import DeleteModal from "@/app/(overview)/settings/_components/DeleteModal";
import Paginate from "@/components/ui/paginate";


  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Active",
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
      paymentMethod: "Inactive",
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
      paymentMethod: "Open",
      image: image,
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Closed",
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
const DoctorTable = () => {
    const { openModal } = useModal();
    return (
        <div>
          <Table>
              <TableHeader className="border-t border-borderColor text-[#535862]">
                  <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                      <TableHead className="font-inter font-semibold text-[14px] text-grey-20">Full Name</TableHead>
                      <TableHead className="font-inter font-semibold text-[14px] text-grey-20">Secialty</TableHead>
                      <TableHead className="font-inter font-semibold text-[14px] text-grey-20">Avg. Rating</TableHead>
                      <TableHead className="font-inter font-semibold text-[14px] text-grey-20">Appointments</TableHead>
                      <TableHead className="font-inter font-semibold text-[14px] text-grey-20">Availability</TableHead>
                      <TableHead></TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                    <TableRow  key={invoice.invoice}>
                    <TableCell className="font-inter font-medium text-[14px] text-grey-30 flex items-center">
                        <Image src={invoice.image} alt='Image' width={40} />
                        <div className="ml-2">
                            {invoice.invoice}
                            <MinTexts>Doctor</MinTexts>
                        </div>
                    </TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.paymentStatus}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.paymentMethod}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.paymentMethod}</TableCell>
                    <TableCell>
                        <p className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-4 text-grey-20 ${invoice.paymentMethod === activeStatus.ACTIVE && 'text-green-800 bg-green-100' || invoice.paymentMethod === activeStatus.IN_ACTIVE && 'text-red-10 bg-red-100' }`}>
                            {invoice.paymentMethod}
                        </p>
                    </TableCell>
                    <TableCell className="font-inter font-medium text-[14px]  cursor-pointer flex">
                          <span onClick={() =>
                            openModal(<DeleteModal
                              text="Are you sure you want to remove Doctor James from this branch? "
                              />, {
                              title:
                                'Delete Doctor James?',
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
          <Paginate />
        </div>
    )
}

export default DoctorTable