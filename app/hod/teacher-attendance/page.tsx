"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TeacherAttendancePage() {
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Dr. Smith", present: true },
    { id: 2, name: "Prof. Johnson", present: false },
    { id: 3, name: "Ms. Williams", present: true },
  ])

  const handleAttendanceChange = (teacherId) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.id === teacherId ? { ...teacher, present: !teacher.present } : teacher
      )
    )
  }

  const handleSubmit = () => {
    console.log("Submitting teacher attendance:", { selectedDepartment, selectedDate, teachers })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Teacher Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Department</label>
                <Select onValueChange={(value) => setSelectedDepartment(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Present</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={teacher.present}
                          onChange={() => handleAttendanceChange(teacher.id)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span>{teacher.name}</span>
                      </label>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button className="mt-6" onClick={handleSubmit}>
              Submit Attendance
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
