import { Card } from "@/components/reusable/Reusable"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
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
  
  export function TopDoctors() {
    return (
        <Card>
            <p className="font-lato font-medium text-[18px] text-[#181D27]">Top Performing Doctors (Based on Ratings)</p>
            <Table className="mt-5 ">
                <TableHeader className="border-t border-borderColor text-[#535862]">
                    <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                        <TableHead >Name</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Avg.Rating</TableHead>
                        <TableHead>Appointment</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {invoices.map((invoice) => (
                    <TableRow  key={invoice.invoice}>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-30">{invoice.invoice}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.paymentStatus}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.paymentMethod}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-grey-20">{invoice.paymentMethod}</TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-red-800">View Details</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
      </Card>
    )
  }
  