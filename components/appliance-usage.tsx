"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "HVAC", value: 35 },
  { name: "Kitchen", value: 25 },
  { name: "Laundry", value: 15 },
  { name: "Lighting", value: 10 },
  { name: "Electronics", value: 15 },
]

const COLORS = ["#3b82f6", "#f97316", "#8b5cf6", "#22c55e", "#eab308"]

export function ApplianceUsage() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Energy Usage",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            animationBegin={200}
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="transparent"
                className="hover:opacity-80 transition-opacity"
              />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

