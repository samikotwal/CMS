"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Book, Clock, Calendar, Activity, Bell, Search, LogOut, TrendingUp, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const performanceData = [
  { month: "Jan", score: 85 },
  { month: "Feb", score: 78 },
  { month: "Mar", score: 92 },
  { month: "Apr", score: 88 },
  { month: "May", score: 95 },
  { month: "Jun", score: 90 },
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

export function StudentDashboard() {
  const router = useRouter()

  const stats = [
    { title: "Courses Enrolled", value: 6, icon: Book, color: "bg-blue-500" },
    { title: "Upcoming Exams", value: 3, icon: Clock, color: "bg-green-500" },
    { title: "Attendance Rate", value: 95, icon: Calendar, color: "bg-yellow-500" },
    { title: "Extracurricular Activities", value: 4, icon: Activity, color: "bg-purple-500" },
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
            <h1 className="text-2xl font-semibold text-gray-900">Student Dashboard</h1>
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
                <AvatarFallback>ST</AvatarFallback>
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
                      {stat.title === "Attendance Rate" && "%"}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Performance Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <UserCheck className="mr-2 h-5 w-5" />
                  Today's Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Mark your attendance for today's classes</p>
                    <Button onClick={() => router.push("/student-dashboard/attendance")} className="w-full">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Mark Attendance
                    </Button>
                  </div>

                  <div className="w-full mt-6">
                    <h3 className="font-medium text-gray-700 mb-2">Today's Classes</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded-md border border-green-200">
                        <span>Mathematics</span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Marked</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md border border-gray-200">
                        <span>Physics</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">Upcoming</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md border border-gray-200">
                        <span>Computer Science</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">Upcoming</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Upcoming Assignments</CardTitle>
              </CardHeader>
              <CardContent>{/* Add a list of upcoming assignments here */}</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent>{/* Add a list of recent announcements here */}</CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

