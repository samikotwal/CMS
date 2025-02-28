"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, BookOpen, FileText, AlertTriangle, Bell, Search, Settings, LogOut } from "lucide-react"

const performanceData = [
  { name: "Jan", students: 30, teachers: 20 },
  { name: "Feb", students: 25, teachers: 18 },
  { name: "Mar", students: 35, teachers: 22 },
  { name: "Apr", students: 28, teachers: 19 },
  { name: "May", students: 32, teachers: 21 },
  { name: "Jun", students: 38, teachers: 24 },
]

export function HODDashboard() {
  const [reports, setReports] = useState([
    {
      id: 1,
      type: "Teacher",
      name: "John Doe",
      description: "Excellent performance in class management.",
      status: "Resolved",
    },
    {
      id: 2,
      type: "Student",
      name: "Jane Smith",
      description: "Submitted a complaint about the cafeteria food.",
      status: "Pending",
    },
    {
      id: 3,
      type: "Teacher",
      name: "Alice Johnson",
      description: "Requested additional resources for the science lab.",
      status: "In Progress",
    },
    {
      id: 4,
      type: "Student",
      name: "Bob Brown",
      description: "Reported issues with the online learning platform.",
      status: "Pending",
    },
  ])

  const stats = [
    { title: "Total Teachers", value: 25, icon: Users, color: "bg-blue-500" },
    { title: "Total Courses", value: 15, icon: BookOpen, color: "bg-green-500" },
    { title: "Total Reports", value: reports.length, icon: FileText, color: "bg-yellow-500" },
    { title: "Pending Actions", value: 3, icon: AlertTriangle, color: "bg-red-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">HOD Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input type="text" placeholder="Search..." className="pl-10 pr-4" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>HOD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#8884d8" name="Students" />
                  <Bar dataKey="teachers" fill="#82ca9d" name="Teachers" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.slice(0, 3).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <div>
                      <p className="font-semibold">{report.name}</p>
                      <p className="text-sm text-gray-500">{report.description}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        report.type === "Teacher" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {report.type}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reports Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Reports</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                      <div>
                        <p className="font-semibold">{report.name}</p>
                        <p className="text-sm text-gray-500">{report.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            report.type === "Teacher" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {report.type}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            report.status === "Resolved"
                              ? "bg-green-100 text-green-800"
                              : report.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="pending">
                <div className="space-y-4">
                  {reports
                    .filter((r) => r.status === "Pending")
                    .map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div>
                          <p className="font-semibold">{report.name}</p>
                          <p className="text-sm text-gray-500">{report.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              report.type === "Teacher" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                            }`}
                          >
                            {report.type}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Pending</span>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="resolved">
                <div className="space-y-4">
                  {reports
                    .filter((r) => r.status === "Resolved")
                    .map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                        <div>
                          <p className="font-semibold">{report.name}</p>
                          <p className="text-sm text-gray-500">{report.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              report.type === "Teacher" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                            }`}
                          >
                            {report.type}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Resolved</span>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

