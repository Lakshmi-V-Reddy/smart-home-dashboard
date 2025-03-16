"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

const activities = [
  {
    id: 1,
    device: "Oven",
    action: "Turned on",
    time: "10:32 AM",
    energy: "+1.2 kWh",
    status: "high",
  },
  {
    id: 2,
    device: "HVAC",
    action: "Temperature adjusted",
    time: "9:45 AM",
    energy: "+0.3 kWh",
    status: "normal",
  },
  {
    id: 3,
    device: "Washing Machine",
    action: "Cycle completed",
    time: "8:20 AM",
    energy: "-0.8 kWh",
    status: "normal",
  },
  {
    id: 4,
    device: "Refrigerator",
    action: "Defrost cycle",
    time: "6:15 AM",
    energy: "+0.4 kWh",
    status: "normal",
  },
  {
    id: 5,
    device: "Dishwasher",
    action: "Started eco cycle",
    time: "Yesterday, 9:30 PM",
    energy: "+0.6 kWh",
    status: "low",
  },
  {
    id: 6,
    device: "Water Heater",
    action: "Temperature increased",
    time: "Yesterday, 7:15 PM",
    energy: "+0.5 kWh",
    status: "normal",
  },
  {
    id: 7,
    device: "HVAC",
    action: "Turned off",
    time: "Yesterday, 6:00 PM",
    energy: "-1.0 kWh",
    status: "normal",
  },
  {
    id: 8,
    device: "Lighting",
    action: "Living room lights on",
    time: "Yesterday, 5:45 PM",
    energy: "+0.2 kWh",
    status: "low",
  },
]

export function RecentActivity() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Recent energy usage events from your smart home devices</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between space-x-4 rounded-md border p-4 hover:bg-accent/50 transition-colors">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.device}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          activity.status === "high"
                            ? "destructive"
                            : activity.status === "low"
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          activity.status === "high"
                            ? "bg-gradient-to-r from-red-500 to-red-600"
                            : activity.status === "low"
                              ? "border-green-500 text-green-500"
                              : "bg-gradient-to-r from-primary/80 to-primary"
                        }
                      >
                        {activity.energy}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  )
}

