"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Users,
  BookOpen,
  FileText,
  AlertTriangle,
  Bell,
  Search,
  LogOut,
  BarChart2,
  Calendar,
  Upload,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Math", attendance: 95 },
  { name: "Science", attendance: 88 },
  { name: "English", attendance: 92 },
  { name: "History", attendance: 85 },
  { name: "Geography", attendance: 90 },
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

export function HODDashboard() {
  const router = useRouter()

  const stats = [
    { title: "Total Teachers", value: 25, icon: Users, color: "bg-blue-500" },
    { title: "Total Courses", value: 15, icon: BookOpen, color: "bg-green-500" },
    { title: "Total Reports", value: 8, icon: FileText, color: "bg-yellow-500" },
    { title: "Pending Actions", value: 3, icon: AlertTriangle, color: "bg-red-500" },
  ]

  const handleSignOut = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">HOD Dashboard</h1>
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
                <AvatarFallback>HOD</AvatarFallback>
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
                    <div className="text-2xl font-bold">
                      <AnimatedValue value={stat.value} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" />
                Subject-wise Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Timetable Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-2" onClick={() => router.push("/hod/exam-timetable")}>
                  Manage Exam Timetable
                </Button>
                <Button className="w-full" onClick={() => router.push("/hod/regular-timetable")}>
                  Manage Regular Timetable
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Content Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-2" onClick={() => router.push("/hod/manage-content")}>
                  Manage Content
                </Button>
                <Button className="w-full" onClick={() => router.push("/hod/approve-content")}>
                  Approve Content
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Media Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-2" onClick={() => router.push("/hod/upload-media")}>
                  Upload Media
                </Button>
                <Button className="w-full" onClick={() => router.push("/hod/manage-media")}>
                  Manage Media
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent>{/* Add a list of recent reports here */}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Edit className="mr-2 h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-2" onClick={() => router.push("/hod/add-teacher")}>
                  Add New Teacher
                </Button>
                <Button className="w-full mb-2" onClick={() => router.push("/hod/add-course")}>
                  Add New Course
                </Button>
                <Button className="w-full" onClick={() => router.push("/hod/generate-report")}>
                  Generate Department Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

