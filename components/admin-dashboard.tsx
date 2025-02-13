"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  User,
  Settings,
  Menu,
  Bell,
  Search,
  LogOut,
  Shield,
  BookOpen,
  GraduationCap,
  ClipboardList,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [counts, setCounts] = useState({
    students: 0,
    courses: 0,
    faculty: 0,
    departments: 0,
  })

  useEffect(() => {
    // Animate the numbers on load
    const duration = 2000 // 2 seconds
    const steps = 60 // Update every 33ms
    const studentsIncrement = 2500 / steps
    const coursesIncrement = 150 / steps
    const facultyIncrement = 75 / steps
    const departmentsIncrement = 12 / steps
    let currentStep = 0

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setCounts((prev) => ({
          students: Math.min(Math.round(studentsIncrement * currentStep), 2500),
          courses: Math.min(Math.round(coursesIncrement * currentStep), 150),
          faculty: Math.min(Math.round(facultyIncrement * currentStep), 75),
          departments: Math.min(Math.round(departmentsIncrement * currentStep), 12),
        }))
        currentStep++
      } else {
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const sidebarItems = [
    { icon: Shield, label: "Admin Dashboard", active: true },
    { icon: Users, label: "Manage Students" },
    { icon: BookOpen, label: "Manage Courses" },
    { icon: GraduationCap, label: "Faculty" },
    { icon: ClipboardList, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 250, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-[#1f2937] text-white fixed h-full z-50"
          >
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Admin Panel</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-gray-700"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Menu />
                </Button>
              </div>
              {sidebarItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                    item.active ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-[250px]" : "ml-0"}`}>
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            {!isSidebarOpen && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                <Menu />
              </Button>
            )}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input type="text" placeholder="Search..." className="w-full pl-10 pr-4" />
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

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{counts.students.toLocaleString()}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Courses</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{counts.courses.toLocaleString()}</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Faculty Members</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{counts.faculty.toLocaleString()}</h3>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <GraduationCap className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Departments</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{counts.departments.toLocaleString()}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <ClipboardList className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Administrative Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-black text-white hover:bg-gray-800">Add New Student</Button>
              <Button variant="outline">Create Course</Button>
              <Button variant="outline">Generate Reports</Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

