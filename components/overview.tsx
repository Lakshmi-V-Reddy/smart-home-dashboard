"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const dailyData = [
  { name: "Mon", value: 18.2 },
  { name: "Tue", value: 16.5 },
  { name: "Wed", value: 19.8 },
  { name: "Thu", value: 24.8 },
  { name: "Fri", value: 22.1 },
  { name: "Sat", value: 15.3 },
  { name: "Sun", value: 14.4 },
]

const hourlyData = [
  { name: "12 AM", value: 0.8 },
  { name: "3 AM", value: 0.6 },
  { name: "6 AM", value: 1.2 },
  { name: "9 AM", value: 2.4 },
  { name: "12 PM", value: 3.2 },
  { name: "3 PM", value: 2.8 },
  { name: "6 PM", value: 3.8 },
  { name: "9 PM", value: 2.2 },
]

const monthlyData = [
  { name: "Jan", value: 520 },
  { name: "Feb", value: 480 },
  { name: "Mar", value: 450 },
  { name: "Apr", value: 420 },
  { name: "May", value: 480 },
  { name: "Jun", value: 520 },
  { name: "Jul", value: 580 },
  { name: "Aug", value: 620 },
  { name: "Sep", value: 550 },
  { name: "Oct", value: 480 },
  { name: "Nov", value: 510 },
  { name: "Dec", value: 570 },
]

export function Overview() {
  return (
    <Tabs defaultValue="daily" className="space-y-4">
      <TabsList className="bg-background/50 backdrop-blur-sm border">
        <TabsTrigger value="hourly" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
          Hourly
        </TabsTrigger>
        <TabsTrigger value="daily" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
          Daily
        </TabsTrigger>
        <TabsTrigger value="monthly" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
          Monthly
        </TabsTrigger>
      </TabsList>
      <TabsContent value="hourly" className="space-y-4">
        <ChartContainer
          config={{
            value: {
              label: "Energy (kWh)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} kWh`}
                stroke="hsl(var(--muted-foreground))"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="value"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                stroke="hsl(var(--primary))"
                fill="url(#colorValue)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>
      <TabsContent value="daily" className="space-y-4">
        <ChartContainer
          config={{
            value: {
              label: "Energy (kWh)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} kWh`}
                stroke="hsl(var(--muted-foreground))"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>
      <TabsContent value="monthly" className="space-y-4">
        <ChartContainer
          config={{
            value: {
              label: "Energy (kWh)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <defs>
                <linearGradient id="monthlyBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} kWh`}
                stroke="hsl(var(--muted-foreground))"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="url(#monthlyBarGradient)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </TabsContent>
    </Tabs>
  )
}

