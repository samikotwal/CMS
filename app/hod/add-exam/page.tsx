"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { LogOut } from "lucide-react"

export default function AddExamPage() {
  const [examData, setExamData] = useState({
    name: "",
    subject: "",
    date: "",
    startTime: "",
    duration: "",
    totalMarks: "",
    description: "",
  })
  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setExamData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubjectChange = (value) => {
    setExamData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitting exam data:", examData)
    // Here you would typically send this data to your backend
    // After successful submission, you might want to clear the form or show a success message
  }

  const handleSignOut = () => {
    // Implement sign-out logic here
    router.push("/")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add New Exam</h1>
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <LogOut />
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Exam Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Exam Name
              </label>
              <Input id="name" name="name" value={examData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <Select value={examData.subject} onValueChange={handleSubjectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MATH101">Mathematics</SelectItem>
                  <SelectItem value="CS101">Computer Science</SelectItem>
                  <SelectItem value="PHY101">Physics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Exam Date
              </label>
              <Input id="date" name="date" type="date" value={examData.date} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={examData.startTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration (in minutes)
              </label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={examData.duration}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="totalMarks" className="block text-sm font-medium text-gray-700">
                Total Marks
              </label>
              <Input
                id="totalMarks"
                name="totalMarks"
                type="number"
                value={examData.totalMarks}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea id="description" name="description" value={examData.description} onChange={handleInputChange} />
            </div>
            <Button type="submit">Add Exam</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

