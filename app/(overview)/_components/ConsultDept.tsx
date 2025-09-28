"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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
import { MediumTitle } from "@/components/ui/Reusable"

export const description = "A donut chart"

const chartData = [
  { browser: "Cardiology", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "Dermatology", visitors: 200, fill: "var(--color-safari)" },
  { browser: "Psychiatry", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Cardiology",
    color: "var(--purple-900)",
  },
  safari: {
    label: "Dermatology",
    color: "var(--red-10)",
  },
  firefox: {
    label: "Psychiatry",
    color: "var(--red-900)",
  },
  other: {
    label: "Other",
    color: "var(--grey-400)",
  },
} satisfies ChartConfig

export function ConsultDept() {
  return (
    <Card className="flex flex-col max-h-[400px]">
      <CardHeader className="items-center pb-0">
        <MediumTitle>Consults by Dept.</MediumTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
