"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Home,
  Users,
  Clock,
  Calendar,
  Activity,
  FileText,
  Image,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  List,
  CheckSquare,
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isAdmin?: boolean
}

export function Sidebar({ className, isAdmin = false }: SidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const router = useRouter()
  const pathname = usePathname()

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: isAdmin ? "/admin-dashboard" : "/hod-dashboard" },
    {
      icon: Users,
      label: "Attendance",
      href: `/${isAdmin ? "admin" : "hod"}/attendance`,
      subItems: isAdmin
        ? [
            { icon: PlusCircle, label: "Mark Attendance", href: "/admin/mark-attendance" },
            { icon: List, label: "View Attendance", href: "/admin/view-attendance" },
          ]
        : [
            { icon: CheckSquare, label: "Teacher Attendance", href: "/hod/teacher-attendance" },
            { icon: List, label: "Student Attendance", href: "/hod/student-attendance" },
          ],
    },
    { icon: Clock, label: "Exam Timetable", href: `/${isAdmin ? "admin" : "hod"}/exam-timetable` },
    { icon: Calendar, label: "Regular Timetable", href: `/${isAdmin ? "admin" : "hod"}/regular-timetable` },
    ...(isAdmin
      ? [
          { icon: Activity, label: "Activities", href: "/admin/activities" },
          { icon: FileText, label: "Content", href: "/admin/content" },
          { icon: Image, label: "Media", href: "/admin/media" },
        ]
      : []),
    { icon: User, label: "Profile", href: `/${isAdmin ? "admin" : "hod"}/profile` },
    { icon: Settings, label: "Settings", href: `/${isAdmin ? "admin" : "hod"}/settings` },
  ]

  return (
    <div className={cn("fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg", className)}>
      <div className="flex h-16 items-center justify-center border-b">
        <h2 className="text-2xl font-semibold text-gray-800">CMS Dashboard</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <div key={item.label}>
              {item.subItems ? (
                <Collapsible open={openSections[item.label]} onOpenChange={() => toggleSection(item.label)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between text-left font-normal">
                      <span className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </span>
                      {openSections[item.label] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-6 mt-2 space-y-2">
                    {item.subItems.map((subItem) => (
                      <Link key={subItem.href} href={subItem.href}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            pathname === subItem.href && "bg-gray-100 font-medium",
                          )}
                        >
                          <subItem.icon className="mr-2 h-4 w-4" />
                          {subItem.label}
                        </Button>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      pathname === item.href && "bg-gray-100 font-medium",
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

