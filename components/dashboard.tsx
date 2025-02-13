"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  FileText,
  ImageIcon,
  Users,
  User,
  Settings,
  Menu,
  Bell,
  Search,
  LogOut,
  BookOpen,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProfilePage } from "./profile-page"
import { ContentPage } from "./content-page"
import { MediaPage } from "./media-page"
import { SettingsPage } from "./settings-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    { title: "Total Students", value: 1234, icon: Users, color: "bg-blue-500" },
    { title: "Courses", value: 56, icon: BookOpen, color: "bg-green-500" },
    { title: "Assignments", value: 89, icon: FileText, color: "bg-yellow-500" },
    { title: "Average Grade", value: "3.7", icon: TrendingUp, color: "bg-purple-500" },
  ]

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            className="bg-[#1f2937] text-white fixed h-full z-50"
          >
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">CMS Dashboard</h2>
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
                  key={item.key}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                    activePage === item.key ? "bg-gray-700" : "hover:bg-gray-700"
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

        <div className="p-6">{renderPage()}</div>
      </main>
    </div>
  )
}

