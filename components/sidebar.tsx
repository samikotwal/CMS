"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Users, Clock, Calendar, Activity, FileText, Image, User, Settings, Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isAdmin?: boolean
}

export function Sidebar({ className, isAdmin = false }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: isAdmin ? "/admin-dashboard" : "/hod-dashboard" },
    { icon: Users, label: "Attendance", href: `/${isAdmin ? "admin" : "hod"}/attendance` },
    { icon: Clock, label: "Exam Timetable", href: `/${isAdmin ? "admin" : "hod"}/exam-timetable` },
    { icon: Calendar, label: "Regular Timetable", href: `/${isAdmin ? "admin" : "hod"}/regular-timetable` },
    { icon: Activity, label: "Activities", href: `/${isAdmin ? "admin" : "hod"}/activities` },
    { icon: FileText, label: "Content", href: `/${isAdmin ? "admin" : "hod"}/content` },
    { icon: Image, label: "Media", href: `/${isAdmin ? "admin" : "hod"}/media` },
    { icon: User, label: "Profile", href: `/${isAdmin ? "admin" : "hod"}/profile` },
    { icon: Settings, label: "Settings", href: `/${isAdmin ? "admin" : "hod"}/settings` },
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gray-50 transition-transform duration-300 ease-in-out md:translate-x-0",
          !isOpen && "-translate-x-full",
          className,
        )}
      >
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold">CMS Dashboard</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {sidebarItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 hover:bg-gray-100",
                    pathname === item.href && "bg-gray-200 font-medium",
                  )}
                >
                  <item.icon size={20} className="text-gray-500" />
                  <span className="text-gray-700">{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}

