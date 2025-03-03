"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function AttendancePage() {
  const [selectedBranch, setSelectedBranch] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [date, setDate] = useState("")

  const branches = ["CS", "EE", "ME"]
  const subjects = ["Mathematics", "Physics", "Programming"]

  const students = [
    { id: 1, name: "John Doe", rollNumber: "CS001" },
    { id: 2, name: "Jane Smith", rollNumber: "CS002" },
    { id: 3, name: "Alice Johnson", rollNumber: "CS003" },
  ]

  const [attendance, setAttendance] = useState({})

  const toggleAttendance = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }))
  }

  const submitAttendance = () => {
    console.log("Submitting attendance:", { selectedBranch, selectedSubject, date, attendance })
    // Here you would typically send this data to your backend
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Attendance</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded p-2" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Present</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={attendance[student.id] || false}
                      onCheckedChange={() => toggleAttendance(student.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={submitAttendance} className="mt-4">
            Submit Attendance
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

