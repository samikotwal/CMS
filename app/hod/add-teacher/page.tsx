"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogOut } from "lucide-react"

export default function AddTeacherPage() {
  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    employeeId: "",
    department: "",
    specialization: "",
  })
  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTeacherData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDepartmentChange = (value) => {
    setTeacherData((prev) => ({ ...prev, department: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitting teacher data:", teacherData)
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
        <h1 className="text-3xl font-bold">Add New Teacher</h1>
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <LogOut />
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Teacher Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input id="name" name="name" value={teacherData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={teacherData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                Employee ID
              </label>
              <Input
                id="employeeId"
                name="employeeId"
                value={teacherData.employeeId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <Select value={teacherData.department} onValueChange={handleDepartmentChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS">Computer Science</SelectItem>
                  <SelectItem value="EE">Electrical Engineering</SelectItem>
                  <SelectItem value="ME">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                Specialization
              </label>
              <Input
                id="specialization"
                name="specialization"
                value={teacherData.specialization}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Add Teacher</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

