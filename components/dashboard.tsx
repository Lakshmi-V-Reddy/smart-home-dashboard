"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { ApplianceUsage } from "@/components/appliance-usage"
import { EnergyBudget } from "@/components/energy-budget"
import { RealTimeAnalytics } from "@/components/real-time-analytics"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Bell, Zap } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { useToast } from "@/hooks/use-toast"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
    if (!showNotifications) {
      toast({
        title: "Energy Alert",
        description: "Your kitchen is using 30% more energy than usual",
        variant: "destructive",
      })

      setTimeout(() => {
        toast({
          title: "Budget Alert",
          description: "You've reached 85% of your monthly energy budget",
          variant: "default",
        })
      }, 1500)
    }
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-background/80 dark:from-background dark:to-background/90">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Zap className="h-8 w-8 text-primary" />
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  Energy Dashboard
                </span>
              </h2>
              <p className="text-muted-foreground">Monitor and manage your home energy consumption</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleNotificationClick}
                className="relative hover:bg-primary/10 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white animate-pulse">
                  2
                </span>
              </Button>
              <ThemeToggle />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="realtime" className="space-y-4">
              <TabsList className="grid grid-cols-5 md:w-[500px] bg-background/50 backdrop-blur-sm border">
                <TabsTrigger
                  value="realtime"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  Real-Time
                </TabsTrigger>
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="appliances"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  Appliances
                </TabsTrigger>
                <TabsTrigger
                  value="budget"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  Budget
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="realtime" className="space-y-4">
                <RealTimeAnalytics />
              </TabsContent>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Current Usage</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-primary"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3.2 kWh</div>
                      <p className="text-xs text-muted-foreground">+12% from last hour</p>
                      <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-1 w-1/2 rounded-full bg-gradient-to-r from-primary to-purple-500 animate-pulse"></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Daily Consumption</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-primary"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24.8 kWh</div>
                      <p className="text-xs text-muted-foreground">-4% from yesterday</p>
                      <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-1 w-3/4 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-primary"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">85%</div>
                      <p className="text-xs text-muted-foreground">$42.50 remaining</p>
                      <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-1 w-[85%] rounded-full bg-gradient-to-r from-amber-400 to-amber-600"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4 border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
                    <CardHeader>
                      <CardTitle>Energy Consumption</CardTitle>
                      <CardDescription>Your energy usage over the past week</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3 border-none shadow-lg bg-gradient-to-br from-background to-background/80 backdrop-blur-sm hover:shadow-xl transition-all">
                    <CardHeader>
                      <CardTitle>Appliance Distribution</CardTitle>
                      <CardDescription>Energy usage by appliance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ApplianceUsage />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="appliances" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
                          >
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          Refrigerator
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">0.8 kWh</div>
                        <p className="text-xs text-muted-foreground">Running normally</p>
                        <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-1 w-1/4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Card className="border-none shadow-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/40 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-5 w-5 mr-2 text-red-600 dark:text-red-400"
                          >
                            <path d="M15 18h-5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3Z" />
                            <path d="M10 9v6" />
                            <path d="M14 9v6" />
                            <path d="M5 18v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1" />
                            <path d="M5 6V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1" />
                          </svg>
                          Oven
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1.4 kWh</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-red-500 dark:text-red-400 font-medium">High usage</span> - 30% above
                          average
                        </p>
                        <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-1 w-3/4 rounded-full bg-gradient-to-r from-red-400 to-red-600 animate-pulse"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/40 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="12" x2="12" y1="11" y2="17" />
                            <line x1="9" x2="15" y1="14" y2="14" />
                          </svg>
                          Dishwasher
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">0.6 kWh</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-500 dark:text-green-400 font-medium">Eco mode</span> - 15% below
                          average
                        </p>
                        <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
                          <div className="h-1 w-1/3 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>
              <TabsContent value="budget" className="space-y-4">
                <EnergyBudget />
              </TabsContent>
              <TabsContent value="activity" className="space-y-4">
                <RecentActivity />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

