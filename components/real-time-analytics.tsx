"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, AlertTriangle, ArrowDown, ArrowUp, Bolt, Clock, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

// Generate initial data
const generateInitialData = () => {
  const now = new Date()
  const data = []

  for (let i = 30; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 20000) // 20 seconds intervals
    const formattedTime = `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}:${time.getSeconds().toString().padStart(2, "0")}`

    data.push({
      time: formattedTime,
      value: Math.random() * 3 + 2, // Random value between 2 and 5
      temperature: Math.random() * 5 + 70, // Random temperature between 70 and 75
    })
  }

  return data
}

// Generate initial alerts
const generateInitialAlerts = () => {
  return [
    {
      id: 1,
      message: "HVAC energy spike detected",
      time: "Just now",
      severity: "high",
    },
    {
      id: 2,
      message: "Kitchen usage above threshold",
      time: "2 min ago",
      severity: "medium",
    },
    {
      id: 3,
      message: "Water heater operating efficiently",
      time: "5 min ago",
      severity: "low",
    },
  ]
}

// Generate initial devices
const generateInitialDevices = () => {
  return [
    { id: 1, name: "Living Room Lights", status: "active", consumption: 0.2 },
    { id: 2, name: "Kitchen Refrigerator", status: "active", consumption: 0.8 },
    { id: 3, name: "Bedroom AC", status: "active", consumption: 1.2 },
    { id: 4, name: "Washing Machine", status: "idle", consumption: 0 },
    { id: 5, name: "Dishwasher", status: "idle", consumption: 0 },
    { id: 6, name: "Water Heater", status: "active", consumption: 0.9 },
  ]
}

export function RealTimeAnalytics() {
  const [liveData, setLiveData] = useState(generateInitialData())
  const [alerts, setAlerts] = useState(generateInitialAlerts())
  const [devices, setDevices] = useState(generateInitialDevices())
  const [currentUsage, setCurrentUsage] = useState(3.1)
  const [dailyTotal, setDailyTotal] = useState(24.8)
  const [peakTime, setPeakTime] = useState("6:30 PM")
  const [anomalyDetected, setAnomalyDetected] = useState(false)

  const alertTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const anomalyTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Update live data every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`

      // Generate new value with some randomness but following a trend
      const lastValue = liveData[liveData.length - 1].value
      const newValue = Math.max(0.5, Math.min(6, lastValue + (Math.random() - 0.5) * 0.8))

      // Generate new temperature with small variations
      const lastTemp = liveData[liveData.length - 1].temperature
      const newTemp = Math.max(68, Math.min(78, lastTemp + (Math.random() - 0.5) * 0.5))

      setLiveData((prevData) => {
        const newData = [...prevData.slice(1), { time: formattedTime, value: newValue, temperature: newTemp }]
        return newData
      })

      // Update current usage
      setCurrentUsage((prev) => {
        const newUsage = Math.max(0.5, Math.min(5, prev + (Math.random() - 0.5) * 0.3))
        return Number.parseFloat(newUsage.toFixed(1))
      })

      // Update daily total occasionally
      if (Math.random() > 0.7) {
        setDailyTotal((prev) => {
          const newTotal = prev + Math.random() * 0.2
          return Number.parseFloat(newTotal.toFixed(1))
        })
      }

      // Randomly update device status
      if (Math.random() > 0.8) {
        const deviceIndex = Math.floor(Math.random() * devices.length)
        setDevices((prevDevices) => {
          const newDevices = [...prevDevices]
          const device = newDevices[deviceIndex]

          if (device.status === "active") {
            device.consumption = Number.parseFloat((Math.random() * 1.5).toFixed(1))
          } else if (Math.random() > 0.7) {
            device.status = "active"
            device.consumption = Number.parseFloat((Math.random() * 1.5).toFixed(1))
          }

          return newDevices
        })
      }

      // Randomly generate new alerts (less frequently)
      if (Math.random() > 0.9) {
        const alertMessages = [
          "Unusual energy pattern detected",
          "HVAC efficiency decreased",
          "Kitchen appliance usage spike",
          "Lighting consumption optimized",
          "Water heater temperature adjusted",
        ]

        const newAlert = {
          id: Date.now(),
          message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
          time: "Just now",
          severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
        }

        setAlerts((prevAlerts) => {
          // Update time labels for existing alerts
          const updatedAlerts = prevAlerts.map((alert) => {
            if (alert.time === "Just now") {
              return { ...alert, time: "1 min ago" }
            } else if (alert.time === "1 min ago") {
              return { ...alert, time: "2 min ago" }
            } else if (alert.time === "2 min ago") {
              return { ...alert, time: "5 min ago" }
            }
            return alert
          })

          // Add new alert and limit to 5 alerts
          return [newAlert, ...updatedAlerts].slice(0, 5)
        })
      }

      // Randomly trigger anomaly detection
      if (Math.random() > 0.95 && !anomalyDetected) {
        setAnomalyDetected(true)

        // Clear anomaly after 10 seconds
        if (anomalyTimeoutRef.current) {
          clearTimeout(anomalyTimeoutRef.current)
        }

        anomalyTimeoutRef.current = setTimeout(() => {
          setAnomalyDetected(false)
        }, 10000)
      }
    }, 2000)

    return () => {
      clearInterval(interval)
      if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current)
      if (anomalyTimeoutRef.current) clearTimeout(anomalyTimeoutRef.current)
    }
  }, [liveData, devices, anomalyDetected])

  // Calculate total active consumption
  const totalActiveConsumption = devices
    .filter((device) => device.status === "active")
    .reduce((sum, device) => sum + device.consumption, 0)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Consumption</CardTitle>
            <Bolt className="h-4 w-4 text-primary animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold">{currentUsage} kWh</div>
              <div className={cn("text-xs", currentUsage > 3.5 ? "text-red-500" : "text-green-500")}>
                {currentUsage > 3.5 ? (
                  <span className="flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> High
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ArrowDown className="h-3 w-3 mr-1" /> Normal
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Updated just now</p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  "h-1 rounded-full transition-all duration-1000 ease-in-out",
                  currentUsage > 4
                    ? "bg-gradient-to-r from-red-500 to-red-600 animate-pulse"
                    : currentUsage > 3
                      ? "bg-gradient-to-r from-amber-400 to-amber-600"
                      : "bg-gradient-to-r from-green-400 to-green-600",
                )}
                style={{ width: `${(currentUsage / 6) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Usage</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyTotal} kWh</div>
            <p className="text-xs text-muted-foreground">Peak time: {peakTime}</p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-1 rounded-full bg-gradient-to-r from-primary to-purple-500"
                style={{ width: `${(dailyTotal / 50) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {devices.filter((d) => d.status === "active").length}/{devices.length}
            </div>
            <p className="text-xs text-muted-foreground">Total consumption: {totalActiveConsumption.toFixed(1)} kWh</p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                style={{ width: `${(devices.filter((d) => d.status === "active").length / devices.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              {anomalyDetected ? (
                <span className="text-red-500 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 animate-pulse" />
                  Alert
                </span>
              ) : (
                <span className="text-green-500">Normal</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Last checked: {new Date().toLocaleTimeString()}</p>
            <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  anomalyDetected
                    ? "bg-gradient-to-r from-red-500 to-red-600 animate-pulse w-full"
                    : "bg-gradient-to-r from-green-400 to-green-600 w-full",
                )}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Real-Time Energy Consumption
            </CardTitle>
            <CardDescription>Live energy usage data updated every 2 seconds</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Energy (kWh)",
                  color: "hsl(var(--chart-1))",
                },
                temperature: {
                  label: "Temperature (°F)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={liveData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    stroke="hsl(var(--muted-foreground))"
                    interval="preserveStartEnd"
                    minTickGap={30}
                  />
                  <YAxis
                    yAxisId="left"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value} kWh`}
                    stroke="hsl(var(--muted-foreground))"
                    domain={[0, 6]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}°F`}
                    stroke="hsl(var(--muted-foreground))"
                    domain={[65, 80]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="value"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    stroke="hsl(var(--primary))"
                    fill="url(#colorValue)"
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="temperature"
                    strokeWidth={2}
                    stroke="hsl(var(--secondary))"
                    strokeDasharray="5 5"
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
              Live Alerts & Notifications
            </CardTitle>
            <CardDescription>Real-time system alerts and energy notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                <AnimatePresence>
                  {alerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between space-x-4 rounded-md border p-4 hover:bg-accent/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none flex items-center">
                          <span
                            className={cn(
                              "mr-2 flex h-2 w-2 rounded-full",
                              alert.severity === "high"
                                ? "bg-red-500 animate-pulse"
                                : alert.severity === "medium"
                                  ? "bg-amber-500"
                                  : "bg-green-500",
                            )}
                          />
                          {alert.message}
                        </p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                              ? "default"
                              : "outline"
                        }
                        className={
                          alert.severity === "high"
                            ? "bg-gradient-to-r from-red-500 to-red-600"
                            : alert.severity === "medium"
                              ? "bg-gradient-to-r from-amber-400 to-amber-600"
                              : "border-green-500 text-green-500"
                        }
                      >
                        {alert.severity === "high" ? "Critical" : alert.severity === "medium" ? "Warning" : "Info"}
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            Active Device Monitoring
          </CardTitle>
          <CardDescription>Real-time status and energy consumption of connected devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => (
              <motion.div
                key={device.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={cn(
                  "rounded-lg border p-4",
                  device.status === "active"
                    ? "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
                    : "bg-gradient-to-br from-muted/50 to-muted/30",
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{device.name}</h3>
                  <Badge
                    variant={device.status === "active" ? "default" : "outline"}
                    className={
                      device.status === "active"
                        ? "bg-gradient-to-r from-green-400 to-green-600"
                        : "border-muted-foreground text-muted-foreground"
                    }
                  >
                    {device.status === "active" ? "Active" : "Idle"}
                  </Badge>
                </div>
                {device.status === "active" && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Consumption:</span>
                      <span className="font-medium">{device.consumption} kWh</span>
                    </div>
                    <div className="mt-2 h-1 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-1 rounded-full bg-gradient-to-r from-primary/60 to-primary"
                        style={{ width: `${(device.consumption / 2) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

