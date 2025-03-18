"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Home,
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
  UserCheck,
  MessageSquare,
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isAdmin?: boolean
}

export function Sidebar({ className, isAdmin = false }: SidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Attendance: true, // Open by default
  })
  const router = useRouter()
  const pathname = usePathname()

  // Determine if this is HOD dashboard based on pathname
  const isHOD = pathname?.includes("/hod") || false
  const isStudent = !isAdmin && !isHOD

  // Determine color scheme based on user type - using lighter colors
  const colorScheme = isAdmin
    ? {
        bg: "bg-blue-50",
        hover: "hover:bg-blue-100",
        active: "bg-blue-200",
        text: "text-blue-800",
        border: "border-blue-200",
        itemBg: "bg-blue-100",
        itemHover: "hover:bg-blue-200",
        itemActive: "bg-blue-300",
        icon: "text-blue-600",
      }
    : isHOD
      ? {
          bg: "bg-purple-50",
          hover: "hover:bg-purple-100",
          active: "bg-purple-200",
          text: "text-purple-800",
          border: "border-purple-200",
          itemBg: "bg-purple-100",
          itemHover: "hover:bg-purple-200",
          itemActive: "bg-purple-300",
          icon: "text-purple-600",
        }
      : {
          bg: "bg-emerald-50",
          hover: "hover:bg-emerald-100",
          active: "bg-emerald-200",
          text: "text-emerald-800",
          border: "border-emerald-200",
          itemBg: "bg-emerald-100",
          itemHover: "hover:bg-emerald-200",
          itemActive: "bg-emerald-300",
          icon: "text-emerald-600",
        }

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const sidebarItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: isAdmin ? "/admin-dashboard" : isHOD ? "/hod-dashboard" : "/student-dashboard",
    },
    {
      icon: UserCheck,
      label: "Attendance",
      href: `/${isAdmin ? "admin" : isHOD ? "hod" : "student"}/attendance`,
      subItems: isAdmin
        ? [
            { icon: PlusCircle, label: "Mark Attendance", href: "/admin/mark-attendance" },
            { icon: List, label: "View Attendance", href: "/admin/view-attendance" },
          ]
        : isHOD
          ? [
              { icon: CheckSquare, label: "Teacher Attendance", href: "/hod/teacher-attendance" },
              { icon: UserCheck, label: "Student Attendance", href: "/hod/student-attendance" },
            ]
          : [
              { icon: CheckSquare, label: "Mark Attendance", href: "/student-dashboard/attendance" },
              { icon: List, label: "View History", href: "/student-dashboard/attendance-history" },
            ],
    },
    { icon: Clock, label: "Exam Timetable", href: `/${isAdmin ? "admin" : isHOD ? "hod" : "student"}/exam-timetable` },
    {
      icon: Calendar,
      label: "Regular Timetable",
      href: `/${isAdmin ? "admin" : isHOD ? "hod" : "student"}/regular-timetable`,
    },
    ...(isAdmin
      ? [
          { icon: Activity, label: "Activities", href: "/admin/activities" },
          { icon: FileText, label: "Content", href: "/admin/content" },
          { icon: Image, label: "Media", href: "/admin/media" },
        ]
      : isHOD
        ? [{ icon: MessageSquare, label: "Anonymous Reports", href: "/hod/anonymous-reports" }]
        : [{ icon: Activity, label: "Activities", href: "/student-dashboard/activities" }]),
    { icon: User, label: "Profile", href: `/${isAdmin ? "admin" : isHOD ? "hod" : "student"}/profile` },
    { icon: Settings, label: "Settings", href: `/${isAdmin ? "admin" : isHOD ? "hod" : "student"}/settings` },
  ]

  return (
    <div
      className={cn(
        `fixed inset-y-0 left-0 z-40 w-64 ${colorScheme.bg} shadow-lg border-r ${colorScheme.border}`,
        className,
      )}
    >
      <div className={`flex h-16 items-center justify-center border-b ${colorScheme.border}`}>
        <h2 className={`text-2xl font-semibold ${colorScheme.text}`}>
          {isAdmin ? "Admin" : isHOD ? "HOD" : "Student"} Dashboard
        </h2>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <div key={item.label}>
              {item.subItems ? (
                <Collapsible open={openSections[item.label]} onOpenChange={() => toggleSection(item.label)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`w-full justify-between text-left font-normal ${colorScheme.text} ${colorScheme.hover} ${openSections[item.label] ? colorScheme.active : ""}`}
                    >
                      <span className="flex items-center">
                        <item.icon className={`mr-2 h-4 w-4 ${colorScheme.icon}`} />
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
                            `w-full justify-start text-left font-normal ${colorScheme.text} ${colorScheme.itemHover}`,
                            pathname === subItem.href
                              ? `${colorScheme.itemActive} font-medium`
                              : `${colorScheme.itemBg}`,
                          )}
                        >
                          <subItem.icon className={`mr-2 h-4 w-4 ${colorScheme.icon}`} />
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
                      `w-full justify-start text-left font-normal ${colorScheme.text} ${colorScheme.hover}`,
                      pathname === item.href ? `${colorScheme.active} font-medium` : "",
                    )}
                  >
                    <item.icon className={`mr-2 h-4 w-4 ${colorScheme.icon}`} />
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

