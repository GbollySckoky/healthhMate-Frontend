import { Card, DisplayFlex } from "@/components/ui/Reusable"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { STATUS } from "@/types/status"
import { ChevronRight } from "lucide-react"
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
      status: 'Completed'
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
      status: 'Pending'
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
      status: 'Cancelled'
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
      status: 'Completed'
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
      status: 'Pending'
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
      status: 'Completed'
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
      status: 'Cancelled'
    },
  ]
  
  export function RecentConsultation() {
    // Get status styling
    const getStatusStyle = (status: string) => {
        switch (status) {
            case STATUS.COMPLETED:
                return 'text-green-700 bg-green-100'
            case STATUS.PENDING:
                return 'text-gray-700 bg-gray-100'
            case STATUS.CANCELLED:
                return 'text-red-700 bg-red-100'
            default:
                return ''
        }
    }
    
    return (
        <Card>
            <DisplayFlex>
                <p className="font-lato font-medium text-[18px] text-30">Recent Consultation</p>
                <div className="flex items-center text-red-800 cursor-pointer hover:text-red-600">
                    <p className='font-semibold text-[15px]'>See all</p>
                    <ChevronRight size={18} />
                </div>
            </DisplayFlex> 
            <Table className="mt-5 ">
                <TableHeader className="border-t border-borderColor text-grey-20">
                    <TableRow className="bg-[#FAFBFF] font-inter text-[12px] font-medium ">
                        <TableHead >Name</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {invoices.map((invoice) => (
                    <TableRow  key={invoice.invoice}>
                    <TableCell className="font-inter font-medium text-[13px] text-grey-30">
                        Phoenix Baker
                        <p className="text-grey-20 text-[12px] font-normal">olivia@untitledui.com</p>
                    </TableCell>
                    <TableCell className="font-inter font-normal text-[13px] text-grey-30">
                        <p>Jul 2, 2025</p> 	
                        <p className="text-grey-20 text-[12px]">10:00AM</p>
                    </TableCell>
                    <TableCell className="font-inter font-normal text-[12px] text-grey-20">{invoice.paymentMethod}</TableCell>
                    <TableCell>
                        <span className={`font-inter font-medium rounded-full text-[12px] w-fit py-1 px-3 ${getStatusStyle(invoice.status)}`}>
                            {invoice.status}
                        </span>
                    </TableCell>
                    <TableCell className="font-inter font-normal text-[14px] text-red-800">View Details</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
      </Card>
    )
  }
  