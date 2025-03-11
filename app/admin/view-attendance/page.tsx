"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, Download, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for student attendance
const studentAttendanceData = [
  {
    id: 1,
    name: "John Doe",
    rollNumber: "CS001",
    date: "2025-03-10",
    status: "Present",
    course: "Mathematics",
    time: "09:30 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    rollNumber: "CS002",
    date: "2025-03-10",
    status: "Present",
    course: "Mathematics",
    time: "09:32 AM",
  },
  {
    id: 3,
    name: "Alice Johnson",
    rollNumber: "CS003",
    date: "2025-03-10",
    status: "Absent",
    course: "Mathematics",
    time: "-",
  },
  {
    id: 4,
    name: "Bob Brown",
    rollNumber: "CS004",
    date: "2025-03-10",
    status: "Present",
    course: "Mathematics",
    time: "09:28 AM",
  },
  {
    id: 5,
    name: "Charlie Davis",
    rollNumber: "CS005",
    date: "2025-03-10",
    status: "Present",
    course: "Mathematics",
    time: "09:35 AM",
  },
  {
    id: 6,
    name: "Diana Evans",
    rollNumber: "CS006",
    date: "2025-03-10",
    status: "Absent",
    course: "Mathematics",
    time: "-",
  },
  {
    id: 7,
    name: "Edward Foster",
    rollNumber: "CS007",
    date: "2025-03-10",
    status: "Present",
    course: "Physics",
    time: "11:02 AM",
  },
  {
    id: 8,
    name: "Fiona Green",
    rollNumber: "CS008",
    date: "2025-03-10",
    status: "Present",
    course: "Physics",
    time: "11:05 AM",
  },
  {
    id: 9,
    name: "George Harris",
    rollNumber: "CS009",
    date: "2025-03-10",
    status: "Late",
    course: "Physics",
    time: "11:15 AM",
  },
  {
    id: 10,
    name: "Hannah Irving",
    rollNumber: "CS010",
    date: "2025-03-10",
    status: "Present",
    course: "Physics",
    time: "11:01 AM",
  },
]

// Mock data for attendance summary
const attendanceSummary = {
  totalStudents: 120,
  present: 112,
  absent: 8,
  rate: "93.3%",
  courses: [
    { name: "Mathematics", present: 28, absent: 2, rate: "93.3%" },
    { name: "Physics", present: 27, absent: 3, rate: "90.0%" },
    { name: "Computer Science", present: 29, absent: 1, rate: "96.7%" },
    { name: "English", present: 28, absent: 2, rate: "93.3%" },
  ],
}

export default function ViewAttendancePage() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState(studentAttendanceData)
  const [refreshing, setRefreshing] = useState(false)

  // Filter data based on search query and selected filters
  useEffect(() => {
    let filtered = studentAttendanceData

    if (searchQuery) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCourse && selectedCourse !== "all") {
      filtered = filtered.filter((student) => student.course === selectedCourse)
    }

    setFilteredData(filtered)
  }, [searchQuery, selectedCourse])

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate fetching new data
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isAdmin />
      <div className="flex-1 ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">View Student Attendance</h1>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing..." : "Refresh"}
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                {selectedDate || "Today"}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="daily">
            <TabsList className="mb-6">
              <TabsTrigger value="daily">Daily View</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="daily">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Attendance Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Courses</SelectItem>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        type="text"
                        placeholder="Search by name or roll number"
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Attendance Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.rollNumber}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.course}</TableCell>
                          <TableCell>{student.date}</TableCell>
                          <TableCell>{student.time}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                student.status === "Present"
                                  ? "default"
                                  : student.status === "Late"
                                    ? "warning"
                                    : "destructive"
                              }
                            >
                              {student.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Attendance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Students</span>
                        <span className="font-semibold">{attendanceSummary.totalStudents}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Present</span>
                        <span className="font-semibold text-green-600">{attendanceSummary.present}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Absent</span>
                        <span className="font-semibold text-red-600">{attendanceSummary.absent}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Attendance Rate</span>
                        <span className="font-semibold">{attendanceSummary.rate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course-wise Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Present</TableHead>
                          <TableHead>Absent</TableHead>
                          <TableHead>Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceSummary.courses.map((course, index) => (
                          <TableRow key={index}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell className="text-green-600">{course.present}</TableCell>
                            <TableCell className="text-red-600">{course.absent}</TableCell>
                            <TableCell>{course.rate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center">
                    <p className="text-gray-500">Attendance trend charts will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

