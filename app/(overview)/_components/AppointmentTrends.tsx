"use client"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { MediumTitle, MinBar } from "@/components/reusable/Reusable"


// Updated chart data with all three fields
const chartData = [
  { month: "January", scheduled: 186, completed: 150, canceled: 136 },
  { month: "February", scheduled: 305, completed: 280, canceled: 225 },
  { month: "March", scheduled: 237, completed: 200, canceled: 237 },
  { month: "April", scheduled: 273, completed: 220, canceled: 253 },
  { month: "May", scheduled: 209, completed: 180, canceled: 239 },
  { month: "June", scheduled: 214, completed: 190, canceled: 224 },
  { month: "July", scheduled: 14, completed: 90, canceled: 24 },
  { month: "August", scheduled: 14, completed: 90, canceled: 24 },
  { month: "September", scheduled: 314, completed: 290, canceled: 324 },
]

const chartConfig = {
  scheduled: {
    label: "Scheduled",
    color: "var(--blue-100)",
  },
  completed: {
    label: "Completed",
    color: "var(--green-900)",
  },
  canceled: {
    label: "Canceled",
    color: "var(--red-10)",
  },
} satisfies ChartConfig


const trendInfo = [
    {
        label: "Scheduled",
        color: "bg-blue-100",
    },
    {
        label: "Completed",
        color: "bg-green-900",
    },
    {
        label: "Canceled",
        color: "bg-red-800",
      },
]
export function AppointmentTrends() {
  return (
    <Card className=" w-full">
      <div className="flex items-center p-6 gap-5">
        <MediumTitle>Appointment Trends - Multiple Lines</MediumTitle>
        <div className="flex">
            {trendInfo.map((trend, index) => (
                <div className="flex items-center space-x-1" key={index}>
                    <MinBar className={`${trend.color} ml-3`} />
                    <p>{trend.label}</p>
                </div>
            ))}
        </div>
      </div>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="scheduled"
              type="monotone"
              stroke="var(--color-scheduled)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="completed"
              type="monotone"
              stroke="var(--color-completed)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="canceled"
              type="monotone"
              stroke="var(--color-canceled)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}