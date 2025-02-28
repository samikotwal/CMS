"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    // Updated authentication logic
    if (email === "student@example.com" && password === "studentpass") {
      if (userType === "student") {
        router.push("/student-dashboard")
      } else {
        setError("Invalid credentials for selected user type")
      }
    } else if (email === "admin@example.com" && password === "adminpass") {
      if (userType === "admin") {
        router.push("/admin-dashboard")
      } else {
        setError("Invalid credentials for selected user type")
      }
    } else if (email === "hod@example.com" && password === "hodpass123") {
      if (userType === "hod") {
        router.push("/hod-dashboard")
      } else {
        setError("Invalid credentials for selected user type")
      }
    } else {
      setError("Invalid credentials")
    }
  }

  const handleLoginClick = (type: string) => {
    setUserType(type)
    setShowForm(true)
    setError("")
    setEmail("")
    setPassword("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{userType ? `${userType.charAt(0).toUpperCase() + userType.slice(1)} Login` : "Login"}</CardTitle>
        </CardHeader>
        <CardContent>
          {!showForm ? (
            <div className="space-y-4">
              <Button onClick={() => handleLoginClick("student")} className="w-full">
                Login as Student
              </Button>
              <Button onClick={() => handleLoginClick("admin")} className="w-full">
                Login as Admin
              </Button>
              <Button onClick={() => handleLoginClick("hod")} className="w-full">
                Login as HOD
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          {showForm && (
            <Button variant="link" onClick={() => setShowForm(false)} className="w-full">
              Back to selection
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

