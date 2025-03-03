"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Users,
  BookOpen,
  Building,
  GraduationCap,
  UserCheck,
  PlusCircle,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Settings,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function AdminDashboard() {
  const [openSections, setOpenSections] = useState({
    students: false,
    courses: false,
    faculty: false,
    exams: false,
  })
  const router = useRouter()

  const stats = [
    { title: "Total Students", value: 1234, icon: Users, color: "bg-blue-500" },
    { title: "Total Courses", value: 56, icon: BookOpen, color: "bg-green-500" },
    { title: "Total Branches", value: 8, icon: Building, color: "bg-yellow-500" },
    { title: "Total Faculty", value: 120, icon: GraduationCap, color: "bg-purple-500" },
  ]

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleSignOut = () => {
    // Implement sign-out logic here
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input type="text" placeholder="Search..." className="pl-10 pr-4" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`${stat.color} p-2 rounded-full`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <Collapsible open={openSections.students} onOpenChange={() => toggleSection("students")}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex justify-between w-full">
                <span>Student Management</span>
                {openSections.students ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button onClick={() => router.push("/admin/add-student")}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add New Student
                    </Button>
                    <Button onClick={() => router.push("/admin/student-list")}>
                      <Users className="mr-2 h-4 w-4" /> View Student List
                    </Button>
                    <Button onClick={() => router.push("/admin/student-attendance")}>
                      <UserCheck className="mr-2 h-4 w-4" /> Manage Attendance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={openSections.courses} onOpenChange={() => toggleSection("courses")}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex justify-between w-full">
                <span>Course Management</span>
                {openSections.courses ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button onClick={() => router.push("/admin/add-course")}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add New Course
                    </Button>
                    <Button onClick={() => router.push("/admin/course-list")}>
                      <BookOpen className="mr-2 h-4 w-4" /> View Course List
                    </Button>
                    <Button onClick={() => router.push("/admin/course-schedule")}>
                      <Settings className="mr-2 h-4 w-4" /> Manage Course Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={openSections.faculty} onOpenChange={() => toggleSection("faculty")}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex justify-between w-full">
                <span>Faculty Management</span>
                {openSections.faculty ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button onClick={() => router.push("/admin/add-faculty")}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add New Faculty
                    </Button>
                    <Button onClick={() => router.push("/admin/faculty-list")}>
                      <GraduationCap className="mr-2 h-4 w-4" /> View Faculty List
                    </Button>
                    <Button onClick={() => router.push("/admin/faculty-workload")}>
                      <Briefcase className="mr-2 h-4 w-4" /> Manage Workload
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={openSections.exams} onOpenChange={() => toggleSection("exams")}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex justify-between w-full">
                <span>Exam Management</span>
                {openSections.exams ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button onClick={() => router.push("/admin/schedule-exam")}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Schedule New Exam
                    </Button>
                    <Button onClick={() => router.push("/admin/exam-list")}>
                      <FileSpreadsheet className="mr-2 h-4 w-4" /> View Exam Schedule
                    </Button>
                    <Button onClick={() => router.push("/admin/exam-results")}>
                      <Settings className="mr-2 h-4 w-4" /> Manage Exam Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </main>
    </div>
  )
}

