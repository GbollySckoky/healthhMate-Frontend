"use client"
import useGetAppointmentCharts from "@/lib/hooks/useGetAppointmentCharts"
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
import { MediumTitle, MinBar } from "@/components/ui/Reusable"


const chartConfig = {
  scheduled: {
    label: "Scheduled",
    color: "var(--blue-100)",
  },
  completed: {
    label: "Completed",
    color: "var(--green-900)",
  },
  cancelled: {
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
const formatMonth = (value: string) => new Date(`${value}-01T00:00:00Z`).toLocaleDateString('en-US', {
  month: 'short', timeZone: 'UTC',
})

export function AppointmentTrends() {
  const { data, isPending, isError, refetch } = useGetAppointmentCharts()
  const chartData = data?.data.appointmentTrends ?? []

  return (
    <Card className="flex h-full min-w-0 w-full flex-col">
      <div className="flex flex-wrap items-center p-6 gap-5">
        <MediumTitle>Appointment Trends {data?.data.year}</MediumTitle>
        <div className="flex flex-wrap gap-y-2">
            {trendInfo.map((trend, index) => (
                <div className="flex items-center space-x-1" key={index}>
                    <MinBar className={`${trend.color} ml-3`} />
                    <p>{trend.label}</p>
                </div>
            ))}
        </div>
      </div>
      <CardContent>
        {isPending ? (
          <p role="status" className="h-[300px] flex items-center justify-center">Loading appointment trends…</p>
        ) : isError ? (
          <div role="alert" className="h-[300px] flex flex-col items-center justify-center gap-2">
            <p>Unable to load appointment trends.</p>
            <button type="button" onClick={() => refetch()} className="text-pink-600">Try again</button>
          </div>
        ) : chartData.length === 0 ? (
          <p className="h-[300px] flex items-center justify-center">No appointment trends available.</p>
        ) : <ChartContainer title={data?.data.scheduledDefinition} config={chartConfig} className="h-[300px] w-full">
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
              tickFormatter={formatMonth}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(label) => formatMonth(String(label))} />} />
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
              dataKey="cancelled"
              type="monotone"
              stroke="var(--color-cancelled)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>}
      </CardContent>
    </Card>
  )
}
