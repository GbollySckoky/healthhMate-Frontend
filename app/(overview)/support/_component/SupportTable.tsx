import { useModal } from "@/components/Modal/Modal";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import SupportModal from "./SupportModal";
import image from '@/assets/Image.png'
import Image from "next/image";
import { MinTexts } from "@/components/reusable/Reusable";
import { Status } from "@/types/status";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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
  
  export function SupportTable() {
    const { openModal } = useModal();
    return (
        <Table>
            <TableHeader className="border-t border-borderColor text-[#535862]">
                <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                    <TableHead >Submitted By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                  <TableRow  key={invoice.invoice}>
                  <TableCell className="font-inter font-normal text-[14px] text-grey-30 flex items-center">
                      <Image src={invoice.image} alt='Image' width={40} />
                      <div className="ml-2">
                          {invoice.invoice}
                          <MinTexts>Doctor</MinTexts>
                      </div>
                  </TableCell>
                  <TableCell className="font-inter font-normal text-[14px] text-[#262e3e]">{invoice.paymentStatus}</TableCell>
                  <TableCell className="font-inter font-medium text-[14px] text-grey-30">{invoice.paymentMethod}</TableCell>
                  <TableCell >
                      <p className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-4 text-grey-20 ${invoice.paymentMethod === Status.CLOSED && 'text-[#027A48] bg-green-100' || invoice.paymentMethod === Status.OPEN && 'text-[#414651] bg-[#F5F5F5]'|| invoice.paymentMethod === Status.InProgress && 'text-[#3538CD] bg-blue-50'  }`}>
                          {invoice.paymentMethod}
                      </p>
                  </TableCell>
                  <TableCell className="font-inter font-medium text-[14px] text-red-800 cursor-pointer"
                      onClick={() =>
                          openModal(<SupportModal />, {
                            title:
                              'Can’t Join Video Call',
                            className: 'max-w-lg',
                            onClose: () => {},
                          })
                        }>
                      View Details</TableCell>
                  </TableRow>
              ))}
            </TableBody>
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
        </Table>
    )
  }
  