"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BarChart3, BellRing, ChevronRight, Home, Lightbulb, Menu, Settings, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex h-screen flex-col border-r bg-background/80 backdrop-blur-sm transition-all duration-300 z-10",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-14 items-center border-b px-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="mr-2 hover:bg-primary/10 transition-colors"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              EnergySnap
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Link
            href="#"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground group",
              "bg-primary/10 text-primary font-medium",
            )}
          >
            <Home className="h-5 w-5" />
            {!collapsed && (
              <>
                <span>Dashboard</span>
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-accent group"
          >
            <Lightbulb className="h-5 w-5" />
            {!collapsed && (
              <>
                <span>Devices</span>
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-accent group"
          >
            <BarChart3 className="h-5 w-5" />
            {!collapsed && (
              <>
                <span>Analytics</span>
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-accent group"
          >
            <BellRing className="h-5 w-5" />
            {!collapsed && (
              <>
                <span>Alerts</span>
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  2
                </span>
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </Link>
        </nav>
      </div>
      <div className="mt-auto border-t p-2">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-accent group"
        >
          <Settings className="h-5 w-5" />
          {!collapsed && (
            <>
              <span>Settings</span>
              <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </Link>
      </div>
    </motion.div>
  )
}

