"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MarkAttendancePage() {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", present: true },
    { id: 2, name: "Jane Smith", present: false },
    { id: 3, name: "Alice Johnson", present: true },
    // Add more students as needed
  ])

  const handleAttendanceChange = (studentId) => {
    setStudents(
      students.map((student) => (student.id === studentId ? { ...student, present: !student.present } : student)),
    )
  }

  const handleSubmit = () => {
    console.log("Submitting attendance:", { selectedClass, selectedDate, students })
    // Here you would typically send this data to your backend
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isAdmin />
      <div className="flex-1 ml-64 p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Mark Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class-a">Class A</SelectItem>
                    <SelectItem value="class-b">Class B</SelectItem>
                    <SelectItem value="class-c">Class C</SelectItem>
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
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={student.present}
                        onChange={() => handleAttendanceChange(student.id)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
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

