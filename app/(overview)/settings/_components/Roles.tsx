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
import { Trash2, Pencil } from 'lucide-react';



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
  
  export function Roles() {
    const {isToggle, handleToggle} = useToggle()
    return (
        <Card>
            <div className="flex items-center justify-between">
                <p className="font-lato font-medium text-[18px] text-[#181D27]">Roles & Permission</p>
                <div className="flex justify-end">
                    <Button onClick={handleToggle}>Create new role</Button>
                </div>
            </div>
            <Table className="mt-5 ">
                <TableHeader className="border-t border-borderColor text-[#535862] ">
                    <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                        <TableHead className="font-semibold text-[14px] font-libre text-grey-20">Role Name</TableHead>
                        <TableHead className="font-semibold text-[14px] font-libre text-grey-20">Permissions Assigned</TableHead>
                        <TableHead className="font-semibold text-[14px] font-libre text-grey-20">Created by</TableHead>
                        <TableHead className="font-semibold text-[14px] font-libre text-grey-20">Last Modified</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {invoices.map((invoice) => (
                    <TableRow  key={invoice.invoice}>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.invoice}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.paymentStatus}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.paymentMethod}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.paymentMethod}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">View Details</TableCell>
                    <TableCell className="flex items-center">
                       <span> <Trash2 color="#F04438" size={15}/></span>
                       <span className="ml-3"> <Pencil size={15} /></span>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
      </Card>
    )
  }
  