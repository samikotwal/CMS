"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Users,
  BookOpen,
  Building,
  GraduationCap,
  Bell,
  Search,
  LogOut,
  TrendingUp,
  Calendar,
  FileText,
  Activity,
  UserCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", students: 400, courses: 240 },
  { name: "Feb", students: 300, courses: 139 },
  { name: "Mar", students: 200, courses: 980 },
  { name: "Apr", students: 278, courses: 390 },
  { name: "May", students: 189, courses: 480 },
  { name: "Jun", students: 239, courses: 380 },
  { name: "Jul", students: 349, courses: 430 },
]

const AnimatedValue = ({ value }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const animationDuration = 2000
    const frameDuration = 1000 / 60
    const totalFrames = Math.round(animationDuration / frameDuration)
    let frame = 0

    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      setCount(Math.floor(value * progress))

      if (frame === totalFrames) {
        clearInterval(timer)
      }
    }, frameDuration)

    return () => clearInterval(timer)
  }, [value])

  return <span>{count}</span>
}

export function AdminDashboard() {
  const router = useRouter()

  const stats = [
    { title: "Total Students", value: 1234, icon: Users, color: "bg-blue-500" },
    { title: "Total Courses", value: 56, icon: BookOpen, color: "bg-blue-400" },
    { title: "Total Branches", value: 8, icon: Building, color: "bg-blue-300" },
    { title: "Total Faculty", value: 120, icon: GraduationCap, color: "bg-blue-200" },
  ]

  const handleSignOut = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar isAdmin />
      <div className="flex-1 ml-64">
        <header className="bg-blue-100 shadow-sm border-b border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-blue-800">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 bg-white border-blue-200 placeholder-blue-300 text-blue-800 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100">
                <Bell />
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-blue-500 text-white">AD</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
              >
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
                <Card className="border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-blue-800">{stat.title}</CardTitle>
                    <div className={`${stat.color} p-2 rounded-full shadow-sm`}>
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-900">
                      <AnimatedValue value={stat.value} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="mb-8 border-blue-200 shadow-md bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
              <CardTitle className="text-xl font-semibold flex items-center text-blue-800">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                Student and Course Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0" }} />
                    <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="courses" stroke="#93c5fd" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="hover:shadow-lg transition-shadow duration-300 border-blue-200 bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="border-b border-blue-100">
                  <CardTitle className="text-lg font-semibold flex items-center text-blue-800">
                    <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                    Exam Timetable
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                    onClick={() => router.push("/admin/exam-timetable")}
                  >
                    Manage Exam Timetable
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 border-blue-200 bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="border-b border-blue-100">
                  <CardTitle className="text-lg font-semibold flex items-center text-blue-800">
                    <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                    Regular Timetable
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                    onClick={() => router.push("/admin/regular-timetable")}
                  >
                    Manage Regular Timetable
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 border-blue-200 bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="border-b border-blue-100">
                  <CardTitle className="text-lg font-semibold flex items-center text-blue-800">
                    <Activity className="mr-2 h-5 w-5 text-blue-600" />
                    Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                    onClick={() => router.push("/admin/activities")}
                  >
                    Manage Activities
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 border-blue-200 bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="border-b border-blue-100">
                  <CardTitle className="text-lg font-semibold flex items-center text-blue-800">
                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                    Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                    onClick={() => router.push("/admin/content")}
                  >
                    Manage Content
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-blue-200 shadow-md bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="border-b border-blue-100">
                <CardTitle className="text-lg font-semibold flex items-center text-blue-800">
                  <UserCheck className="mr-2 h-5 w-5 text-blue-600" />
                  Attendance Management
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                    onClick={() => router.push("/admin/mark-attendance")}
                  >
                    Mark Attendance
                  </Button>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                    onClick={() => router.push("/admin/view-attendance")}
                  >
                    View Attendance
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 shadow-md bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="border-b border-blue-100">
                <CardTitle className="text-lg font-semibold flex items-center text-blue-800">
                  <FileText className="mr-2 h-5 w-5 text-blue-600" />
                  Content Management
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                    onClick={() => router.push("/admin/content")}
                  >
                    Manage Content
                  </Button>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                    onClick={() => router.push("/admin/media")}
                  >
                    Manage Media
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

