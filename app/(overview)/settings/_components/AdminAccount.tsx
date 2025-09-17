'use client'
import { Button, Card } from "@/components/reusable/Reusable"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import useToggle from "@/hooks/useToggle"
import { Trash2 } from 'lucide-react';
import { activeStatus } from "@/types/status";


  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
      
    },
  ]
  
  export function AdminAccount() {
    const {isToggle, handleToggle} = useToggle()
    return (
        <Card>
            <div className="flex items-center justify-between">
                <p className="font-lato font-medium text-[18px] text-[#181D27]">Admin Accounts</p>
                <div className="flex justify-end">
                    <Button onClick={handleToggle}>Add new Admin</Button>
                </div>
            </div>
            <Table className="mt-5 ">
                <TableHeader className="border-t border-borderColor text-[#535862] ">
                    <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                        <TableHead className="font-semibold text-[14px] font-libre text-grey-20">Admin Name</TableHead>
                        <TableHead className="font-semibold text-[14px] font-libre text-grey-20">Email </TableHead>
                        <TableHead className="font-semibold text-[14px] font-libre text-grey-20">Role Name</TableHead>
                        <TableHead className="font-semibold text-[14px] font-libre text-grey-20">Last Login</TableHead>
                        <TableHead className="font-semibold text-[14px] font-libre text-grey-20">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {invoices.map((invoice) => (
                    <TableRow  key={invoice.invoice}>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.invoice}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.paymentStatus}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.paymentMethod}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.paymentMethod}</TableCell>
                    <TableCell className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-4 text-grey-20 ${invoice.paymentMethod === activeStatus.ACTIVE && 'text-[#027A48] bg-green-100' || invoice.paymentMethod === activeStatus.IN_ACTIVE && 'text-red-10 bg-red-50'  }`}>View Details</TableCell>
                    <TableCell className="flex items-center">
                     <Trash2 color="#F04438" size={15}/>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
      </Card>
    )
  }
  