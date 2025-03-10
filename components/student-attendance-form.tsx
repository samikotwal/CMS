"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function StudentAttendanceForm() {
  const [course, setCourse] = useState("")
  const [attendanceCode, setAttendanceCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      if (attendanceCode === "1234") {
        setSuccess(true)
        setLoading(false)
        toast({
          title: "Attendance Marked",
          description: "Your attendance has been successfully recorded.",
          variant: "default",
        })

        // Reset form after 3 seconds
        setTimeout(() => {
          setSuccess(false)
          setCourse("")
          setAttendanceCode("")
        }, 3000)
      } else {
        setError("Invalid attendance code. Please try again.")
        setLoading(false)
      }
    }, 1500)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Mark Your Attendance</CardTitle>
          <CardDescription>
            Select your course and enter the attendance code provided by your instructor
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="flex flex-col items-center justify-center py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-green-700">Attendance Marked!</h3>
              <p className="text-gray-600 text-center mt-2">Your attendance has been successfully recorded.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course">Select Course</Label>
                <Select value={course} onValueChange={setCourse} required>
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendance-code">Attendance Code</Label>
                <Input
                  id="attendance-code"
                  type="text"
                  placeholder="Enter the code provided by your instructor"
                  value={attendanceCode}
                  onChange={(e) => setAttendanceCode(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading || !course || !attendanceCode}>
                {loading ? "Marking Attendance..." : "Mark Attendance"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

