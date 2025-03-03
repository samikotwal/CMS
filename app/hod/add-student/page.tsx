"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogOut } from "lucide-react"

export default function AddStudentPage() {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    branch: "",
  })
  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setStudentData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBranchChange = (value) => {
    setStudentData((prev) => ({ ...prev, branch: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitting student data:", studentData)
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
        <h1 className="text-3xl font-bold">Add New Student</h1>
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <LogOut />
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input id="name" name="name" value={studentData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={studentData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
                Roll Number
              </label>
              <Input
                id="rollNumber"
                name="rollNumber"
                value={studentData.rollNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                Branch
              </label>
              <Select value={studentData.branch} onValueChange={handleBranchChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS">Computer Science</SelectItem>
                  <SelectItem value="EE">Electrical Engineering</SelectItem>
                  <SelectItem value="ME">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Add Student</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

