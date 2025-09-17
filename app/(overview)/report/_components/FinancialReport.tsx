import { Card, MinTexts } from "@/components/reusable/Reusable"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Status } from "@/types/status"
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Open",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "Closed",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "In Progress",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "In Progress",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "Open",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Closed",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Closed",
    },
  ]
  
  export function FinancialReport() {
    return (
        <Card>
            <p className="font-lato font-medium text-[18px] text-[#181D27]">Financial Reports</p>
            <Table className="mt-5 ">
                <TableHeader className="border-t border-borderColor text-[#535862]">
                    <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                        <TableHead > Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Branch</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {invoices.map((invoice) => (
                  <TableRow  key={invoice.invoice}>
                  <TableCell className="font-inter font-normal text-[14px] text-grey-30 flex items-center">
                    {invoice.invoice}
                    <MinTexts>Doctor</MinTexts>
                  </TableCell>
                  <TableCell className="font-inter font-normal text-[14px] text-[#535862]">{invoice.paymentStatus}</TableCell>
                  <TableCell className="font-inter font-medium text-[14px] text-grey-30">{invoice.paymentMethod}</TableCell>
                  <TableCell >
                      <p className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-4 text-grey-20 ${invoice.paymentMethod === Status.CLOSED && 'text-[#027A48] bg-green-100' || invoice.paymentMethod === Status.OPEN && 'text-[#414651] bg-[#F5F5F5]'|| invoice.paymentMethod === Status.InProgress && 'text-[#3538CD] bg-blue-50'  }`}>
                          {invoice.paymentMethod}
                      </p>
                  </TableCell>
                  <TableCell className="font-inter font-medium text-[14px] text-red-800 cursor-pointer">
                      View Details</TableCell>
                  </TableRow>
              ))}
                </TableBody>
            </Table>
      </Card>
    )
  }
  