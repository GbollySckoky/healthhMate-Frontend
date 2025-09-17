"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { MediumTitle } from "@/components/reusable/Reusable"

export const description = "A multiple bar chart"

const chartData = [
  { month: "January", earning: 186, comission: 80, payout:80, },
  { month: "February", earning: 305, comission: 200, payout:80, },
  { month: "March", earning: 237, comission: 120, payout:80, },
  { month: "April", earning: 73, comission: 190, payout:80, },
  { month: "May", earning: 209, comission: 130, payout:80, },
  { month: "June", earning: 214, comission: 140, payout:80, },
  { month: "July", earning: 214, comission: 140, payout:80, },
  { month: "August", earning: 214, comission: 140, payout:80, },
  { month: "September", earning: 214, comission: 140, payout:80, },
  { month: "October", earning: 214, comission: 140, payout:80, },
  { month: "November", earning: 214, comission: 140, payout:80, },
  { month: "December", earning: 214, comission: 140, payout:80, },
]

const chartConfig = {
  earning: {
    label: "Earnings",
    color: "var(--orange-900)",
  },
  comission: {
    label: "Commisions",
    color: "var(--orange-400)",
  },
  payout: {
    label: "Payouts",
    color: "var(--orange-200)",
  },
} satisfies ChartConfig

const earningsInfo = [
    {
        label: "Earning",
        color: "bg-orange-900",
    },
    {
        label: "Commission",
        color: "bg-orange-400",
    },
    {
        label: "Payouts",
        color: "bg-orange-200",
      },
]

export function EarningsTrend() {
  return (
    <Card>
        <div className="flex items-center justify-between p-6 ">
            <MediumTitle> Earnings Trends  </MediumTitle>
        <div className="flex items-center gap-2">
            {earningsInfo.map((earning, index) => (
                <div className="flex items-center" key={index}>
                    <p className={`${earning.color} mr-1 h-1 w-1 rounded-full`} />
                    <p>{earning.label}</p>
                </div>
            ))}
        </div>
      </div>    
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="earning" fill="var(--color-earning)" radius={4} />
            <Bar dataKey="comission" fill="var(--color-comission)" radius={4} />
            <Bar dataKey="payout" fill="var(--color-payout)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
