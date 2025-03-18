"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useRouter } from "next/navigation"
import { Book, Clock, Calendar, Activity, Bell, Search, LogOut, TrendingUp, BarChart2, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const performanceData = [
  { month: "Jan", score: 85 },
  { month: "Feb", score: 78 },
  { month: "Mar", score: 92 },
  { month: "Apr", score: 88 },
  { month: "May", score: 95 },
  { month: "Jun", score: 90 },
]

const courseDistribution = [
  { name: "Mathematics", value: 30 },
  { name: "Science", value: 25 },
  { name: "Literature", value: 20 },
  { name: "History", value: 15 },
  { name: "Art", value: 10 },
]

const assignmentCompletion = [
  { assignment: "Assignment 1", completed: 95 },
  { assignment: "Assignment 2", completed: 88 },
  { assignment: "Assignment 3", completed: 92 },
  { assignment: "Assignment 4", completed: 78 },
  { assignment: "Assignment 5", completed: 85 },
]

const COLORS = ["#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0"]

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

const AnimatedBar = motion(motion.rect)
const AnimatedLine = motion(motion.path)
const AnimatedCircle = motion(motion.circle)

export function StudentDashboard() {
  const router = useRouter()
  const controls = useAnimation()

  const stats = [
    { title: "Courses Enrolled", value: 6, icon: Book, color: "bg-emerald-600" },
    { title: "Upcoming Exams", value: 3, icon: Clock, color: "bg-emerald-500" },
    { title: "Attendance Rate", value: 95, icon: Calendar, color: "bg-emerald-400" },
    { title: "Extracurricular Activities", value: 4, icon: Activity, color: "bg-emerald-300" },
  ]

  const handleSignOut = () => {
    router.push("/")
  }

  useEffect(() => {
    controls.start({ opacity: 1, scale: 1 })
  }, [controls])

  return (
    <div className="min-h-screen bg-green-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <header className="bg-emerald-700 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Student Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-200" size={20} />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 bg-emerald-600 border-emerald-500 placeholder-emerald-300 text-white focus:bg-emerald-800 focus:border-emerald-400 focus:ring-emerald-400"
                />
              </div>
              <Button variant="ghost" size="icon" className="text-emerald-100 hover:text-white hover:bg-emerald-600">
                <Bell />
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-emerald-500 text-white">ST</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="text-emerald-100 hover:text-white hover:bg-emerald-600"
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
                <Card className="border-emerald-200 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-green-50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-800">{stat.title}</CardTitle>
                    <div className={`${stat.color} p-2 rounded-full shadow-sm`}>
                      <stat.icon className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-900">
                      <AnimatedValue value={stat.value} />
                      {stat.title === "Attendance Rate" && "%"}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="border-emerald-200 shadow-md bg-white">
              <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-emerald-100">
                <CardTitle className="flex items-center text-emerald-800">
                  <TrendingUp className="mr-2 h-5 w-5 text-emerald-600" />
                  Performance Over Time
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[300px]">
                  <svg width="100%" height="100%" viewBox="0 0 500 300">
                    {performanceData.map((entry, index) => (
                      <AnimatedLine
                        key={`line-${index}`}
                        x1={index * 100}
                        y1={300 - entry.score * 3}
                        x2={(index + 1) * 100}
                        y2={
                          index < performanceData.length - 1
                            ? 300 - performanceData[index + 1].score * 3
                            : 300 - entry.score * 3
                        }
                        stroke="#059669"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: index * 0.1 }}
                      />
                    ))}
                    {performanceData.map((entry, index) => (
                      <AnimatedCircle
                        key={`point-${index}`}
                        cx={index * 100}
                        cy={300 - entry.score * 3}
                        r="4"
                        fill="#059669"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      />
                    ))}
                  </svg>
                </div>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 shadow-md bg-white">
              <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-emerald-100">
                <CardTitle className="flex items-center text-emerald-800">
                  <PieChart className="mr-2 h-5 w-5 text-emerald-600" />
                  Course Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[300px]">
                  <svg width="100%" height="100%" viewBox="0 0 400 400">
                    <g transform="translate(200, 200)">
                      {courseDistribution.map((entry, index) => {
                        const startAngle =
                          index > 0
                            ? (courseDistribution.slice(0, index).reduce((sum, item) => sum + item.value, 0) / 100) *
                              360
                            : 0
                        const endAngle =
                          (courseDistribution.slice(0, index + 1).reduce((sum, item) => sum + item.value, 0) / 100) *
                          360
                        const x1 = Math.cos((startAngle * Math.PI) / 180) * 180
                        const y1 = Math.sin((startAngle * Math.PI) / 180) * 180
                        const x2 = Math.cos((endAngle * Math.PI) / 180) * 180
                        const y2 = Math.sin((endAngle * Math.PI) / 180) * 180
                        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

                        return (
                          <AnimatedLine
                            key={entry.name}
                            d={`M 0 0 L ${x1} ${y1} A 180 180 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={COLORS[index % COLORS.length]}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          />
                        )
                      })}
                    </g>
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {courseDistribution.map((course, index) => (
                    <div key={course.name} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-sm text-emerald-800">{course.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-emerald-200 shadow-md bg-white">
            <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-emerald-100">
              <CardTitle className="flex items-center text-emerald-800">
                <BarChart2 className="mr-2 h-5 w-5 text-emerald-600" />
                Assignment Completion Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <svg width="100%" height="100%" viewBox="0 0 500 300">
                  {assignmentCompletion.map((entry, index) => (
                    <AnimatedBar
                      key={entry.assignment}
                      x={index * 100 + 10}
                      y={300 - entry.completed * 3}
                      width="80"
                      height={entry.completed * 3}
                      fill="#059669"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  ))}
                </svg>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="bg-emerald-600 text-white">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-white data-[state=active]:text-emerald-900 data-[state=active]:shadow-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="attendance"
                className="data-[state=active]:bg-white data-[state=active]:text-emerald-900 data-[state=active]:shadow-sm"
              >
                Attendance
              </TabsTrigger>
              <TabsTrigger
                value="timetables"
                className="data-[state=active]:bg-white data-[state=active]:text-emerald-900 data-[state=active]:shadow-sm"
              >
                Timetables
              </TabsTrigger>
              <TabsTrigger
                value="activities"
                className="data-[state=active]:bg-white data-[state=active]:text-emerald-900 data-[state=active]:shadow-sm"
              >
                Activities
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview"></TabsContent>
            <TabsContent value="attendance">
              <Card className="border-emerald-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-emerald-100">
                  <CardTitle className="text-emerald-800">Attendance Summary</CardTitle>
                </CardHeader>
                <CardContent>{/* Add attendance content here */}</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="timetables">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-emerald-200 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-emerald-100">
                    <CardTitle className="text-emerald-800">Exam Timetable</CardTitle>
                  </CardHeader>
                  <CardContent>{/* Add exam timetable content here */}</CardContent>
                </Card>
                <Card className="border-emerald-200 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-emerald-100">
                    <CardTitle className="text-emerald-800">Regular Timetable</CardTitle>
                  </CardHeader>
                  <CardContent>{/* Add regular timetable content here */}</CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="activities">
              <Card className="border-emerald-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-emerald-100">
                  <CardTitle className="text-emerald-800">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>{/* Add activities content here */}</CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

