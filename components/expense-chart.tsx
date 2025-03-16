"use client"

import { Card } from "@/components/ui/card"
import {
  Chart,
  ChartContainer,
  ChartLegend,
  ChartLegendItem,
  ChartPie,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { name: "Housing", value: 1200, color: "#8B5CF6" }, // finance-purple
  { name: "Food", value: 600, color: "#3B82F6" }, // finance-blue
  { name: "Transportation", value: 300, color: "#14B8A6" }, // finance-teal
  { name: "Entertainment", value: 250, color: "#10B981" }, // finance-green
  { name: "Utilities", value: 200, color: "#FBBF24" }, // finance-yellow
  { name: "Other", value: 290, color: "#F97316" }, // finance-orange
]

export function ExpenseChart() {
  return (
    <Card className="p-4 bg-white/50 backdrop-blur-sm border-0">
      <ChartContainer className="h-[300px]">
        <Chart className="h-full w-full">
          <ChartPie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            cornerRadius={4}
            colors={data.map((item) => item.color)}
          >
            <ChartTooltip>
              <ChartTooltipContent
                className="bg-background border-border"
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="p-2">
                        <div className="text-sm font-medium">{data.name}</div>
                        <div className="text-xs text-muted-foreground">${data.value}</div>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </ChartTooltip>
          </ChartPie>
        </Chart>
      </ChartContainer>
      <ChartLegend className="mt-4 flex flex-wrap gap-4 justify-center">
        {data.map((item) => (
          <ChartLegendItem key={item.name} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm">{item.name}</span>
          </ChartLegendItem>
        ))}
      </ChartLegend>
    </Card>
  )
}

