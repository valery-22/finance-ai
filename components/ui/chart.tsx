"use client"

import type * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

const ChartContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={`relative ${className}`} {...props} />
}

const Chart = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <svg className={`h-full w-full ${className}`} {...props} />
}

const ChartPie = ({
  data,
  dataKey,
  nameKey,
  innerRadius,
  outerRadius,
  paddingAngle,
  cornerRadius,
  colors,
  children,
}: {
  data: any[]
  dataKey: string
  nameKey: string
  innerRadius: number
  outerRadius: number
  paddingAngle: number
  cornerRadius: number
  colors: string[]
  children: React.ReactNode
}) => {
  const total = data.reduce((acc, item) => acc + item[dataKey], 0)

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <g>
      {data.map((entry, index) => {
        const startAngle = (data.slice(0, index).reduce((acc, item) => acc + item[dataKey], 0) / total) * 360
        const endAngle = startAngle + (entry[dataKey] / total) * 360
        const midAngle = (startAngle + endAngle) / 2

        const x = Math.cos(-midAngle * RADIAN)
        const y = Math.sin(-midAngle * RADIAN)

        return (
          <path
            key={`slice-${index}`}
            d={`
              M ${innerRadius * x} ${innerRadius * y}
              A ${outerRadius} ${outerRadius} 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${outerRadius * x} ${outerRadius * y}
              L ${innerRadius * x} ${innerRadius * y}
              Z
            `}
            fill={colors[index % colors.length]}
          />
        )
      })}
      {children}
    </g>
  )
}

const ChartLegend = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={`flex items-center ${className}`} {...props} />
}

const ChartLegendItem = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={`flex items-center ${className}`} {...props} />
}

const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent sideOffset={8} />
      </Tooltip>
    </TooltipProvider>
  )
}

const ChartTooltipContent = ({ className, content }: { className?: string; content: any }) => {
  return <TooltipContent className={className}>{content}</TooltipContent>
}

export { ChartContainer, Chart, ChartPie, ChartLegend, ChartLegendItem, ChartTooltip, ChartTooltipContent }

