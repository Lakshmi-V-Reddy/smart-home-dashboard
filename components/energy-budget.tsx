"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { motion } from "framer-motion"

const budgetData = [
  { name: "Jan", actual: 520, budget: 550 },
  { name: "Feb", actual: 480, budget: 550 },
  { name: "Mar", actual: 450, budget: 550 },
  { name: "Apr", actual: 420, budget: 550 },
  { name: "May", actual: 480, budget: 550 },
  { name: "Jun", actual: 520, budget: 550 },
  { name: "Jul", actual: 580, budget: 550 },
  { name: "Aug", actual: 620, budget: 550 },
  { name: "Sep", actual: 550, budget: 550 },
  { name: "Oct", actual: 480, budget: 550 },
  { name: "Nov", actual: 510, budget: 550 },
  { name: "Dec", actual: 570, budget: 550 },
]

export function EnergyBudget() {
  const [budget, setBudget] = useState(550)
  const [alerts, setAlerts] = useState(true)
  const [threshold, setThreshold] = useState(80)
  const { toast } = useToast()

  const handleSaveBudget = () => {
    toast({
      title: "Budget Updated",
      description: `Your monthly energy budget has been set to ${budget} kWh`,
    })
  }

  const handleThresholdChange = (value: number[]) => {
    setThreshold(value[0])
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle>Monthly Energy Budget</CardTitle>
            <CardDescription>Set your monthly energy consumption target</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (kWh)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="budget"
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number.parseInt(e.target.value))}
                  className="border-primary/20 focus-visible:ring-primary/30"
                />
                <Button
                  onClick={handleSaveBudget}
                  className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                >
                  Save
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="threshold">Alert Threshold ({threshold}%)</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="alerts">Enable Alerts</Label>
                  <Switch id="alerts" checked={alerts} onCheckedChange={setAlerts} />
                </div>
              </div>
              <Slider
                id="threshold"
                disabled={!alerts}
                value={[threshold]}
                onValueChange={handleThresholdChange}
                max={100}
                step={5}
                className="[&>span]:bg-primary"
              />
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              You will receive alerts when your usage exceeds {threshold}% of your budget
            </p>
          </CardFooter>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle>Budget vs. Actual</CardTitle>
            <CardDescription>Compare your actual usage against your budget</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                actual: {
                  label: "Actual Usage",
                  color: "hsl(var(--chart-1))",
                },
                budget: {
                  label: "Budget",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={budgetData}>
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value} kWh`}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(var(--primary))"
                    fill="url(#actualGradient)"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="budget"
                    stroke="hsl(var(--secondary))"
                    fill="url(#budgetGradient)"
                    fillOpacity={0.6}
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

