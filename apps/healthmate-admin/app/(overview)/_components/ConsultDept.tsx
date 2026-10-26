"use client"

import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MediumTitle } from "@/components/ui/Reusable"
import useGetAppointmentCharts from "@/lib/hooks/useGetAppointmentCharts"

const colors = ["var(--purple-900)", "var(--red-10)", "var(--red-900)", "var(--grey-400)"]
const chartConfig = { count: { label: "Consultations" } } satisfies ChartConfig

export function ConsultDept() {
  const { data, isPending, isError, refetch } = useGetAppointmentCharts()
  const consultations = data?.data.consultationsByDepartment
  const chartData = (consultations?.departments ?? []).map((department, index) => ({
    ...department,
    fill: colors[index % colors.length],
  }))

  return (
    <Card className="flex h-full min-w-0 w-full flex-col">
      <CardHeader className="items-center">
        <MediumTitle>Consults by Dept.</MediumTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center text-center">
        {isPending ? (
          <p role="status" className="h-[300px] flex items-center justify-center">Loading consultations…</p>
        ) : isError ? (
          <div role="alert" className="h-[300px] flex flex-col items-center justify-center gap-2">
            <p>Unable to load consultations by department.</p>
            <button type="button" onClick={() => refetch()} className="text-pink-600">Try again</button>
          </div>
        ) : !consultations?.total || chartData.length === 0 ? (
          <p className="h-[300px] flex items-center justify-center">No consultations available.</p>
        ) : (
          <ChartContainer config={chartConfig} className="mx-auto h-[300px] w-full aspect-auto">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="count" nameKey="department" innerRadius={60} />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
