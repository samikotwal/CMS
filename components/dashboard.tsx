"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import {
  Home,
  FileText,
  ImageIcon,
  User,
  Settings,
  Menu,
  Bell,
  Search,
  LogOut,
  BookOpen,
  TrendingUp,
  Users,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfilePage } from "./profile-page"
import { ContentPage } from "./content-page"
import { MediaPage } from "./media-page"
import { SettingsPage } from "./settings-page"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [activePage, setActivePage] = useState("dashboard")

  const sidebarItems = [
    { icon: Home, label: "Dashboard", key: "dashboard" },
    { icon: FileText, label: "Content", key: "content" },
    { icon: ImageIcon, label: "Media", key: "media" },
    { icon: User, label: "Profile", key: "profile" },
    { icon: Settings, label: "Settings", key: "settings" },
  ]

  const stats = [
    { title: "Total Courses", value: 12, icon: BookOpen, color: "bg-blue-500" },
    { title: "Average Grade", value: "A-", icon: TrendingUp, color: "bg-green-500" },
    { title: "Attendance Rate", value: "95%", icon: Users, color: "bg-yellow-500" },
    { title: "Upcoming Events", value: 3, icon: Calendar, color: "bg-purple-500" },
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const [showReportForm, setShowReportForm] = useState(false)
  const [reportDescription, setReportDescription] = useState("")

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this report to an API
    console.log("Report submitted:", reportDescription)
    setReportDescription("")
    setShowReportForm(false)
    // Show a success message to the user
    alert("Your report has been submitted successfully.")
  }

  const renderPage = () => {
    switch (activePage) {
      case "profile":
        return <ProfilePage />
      case "content":
        return <ContentPage />
      case "media":
        return <MediaPage />
      case "settings":
        return <SettingsPage />
      case "dashboard":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Course Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={courseDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {courseDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {courseDistribution.map((course, index) => (
                      <div key={course.name} className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-sm">{course.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Assignment Completion Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={assignmentCompletion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="assignment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Submit a Report</span>
                  <Button onClick={() => setShowReportForm(!showReportForm)}>
                    {showReportForm ? "Cancel" : "New Report"}
                  </Button>
                </CardTitle>
              </CardHeader>
              {showReportForm && (
                <CardContent>
                  <form onSubmit={handleSubmitReport} className="space-y-4">
                    <div>
                      <Label htmlFor="reportDescription">Report Description</Label>
                      <Textarea
                        id="reportDescription"
                        placeholder="Enter your report here..."
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <Button type="submit">Submit Report</Button>
                  </form>
                </CardContent>
              )}
            </Card>
          </div>
        )
      default:
        return <div>Dashboard Content</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 250, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-md overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">CMS Dashboard</h2>
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
                  <Menu />
                </Button>
              </div>
              {sidebarItems.map((item, index) => (
                <motion.button
                  key={item.key}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                    activePage === item.key ? "bg-gray-200 text-gray-800" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActivePage(item.key)}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
                <Menu />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input type="text" placeholder="Search..." className="pl-10 pr-4" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell />
              </Button>
              <Button variant="ghost" size="icon">
                <User />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut />
              </Button>
            </div>
          </div>
        </header>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="p-6">
          {renderPage()}
        </motion.div>
      </main>
    </div>
  )
}

