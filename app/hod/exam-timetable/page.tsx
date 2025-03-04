"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExamTimetablePage() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [examDate, setExamDate] = useState("")
  const [examTime, setExamTime] = useState("")
  const [exams, setExams] = useState([
    { id: 1, course: "Mathematics", date: "2025-05-15", time: "09:00 AM" },
    { id: 2, course: "Physics", date: "2025-05-17", time: "02:00 PM" },
    { id: 3, course: "Computer Science", date: "2025-05-19", time: "10:00 AM" },
  ])

  const handleAddExam = () => {
    if (selectedCourse && examDate && examTime) {
      setExams([...exams, { id: exams.length + 1, course: selectedCourse, date: examDate, time: examTime }])
      setSelectedCourse("")
      setExamDate("")
      setExamTime("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Manage Exam Timetable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                placeholder="Exam Date"
              />
              <Input
                type="time"
                value={examTime}
                onChange={(e) => setExamTime(e.target.value)}
                placeholder="Exam Time"
              />
              <Button onClick={handleAddExam}>Add Exam</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>{exam.course}</TableCell>
                    <TableCell>{exam.date}</TableCell>
                    <TableCell>{exam.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

