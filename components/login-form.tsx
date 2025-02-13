"use client"

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
  const [isAdminLogin, setIsAdminLogin] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    // Here you would typically make an API call to verify credentials
    // For this example, we'll use simple checks
    if (email === "student@example.com" && password === "password") {
      if (isAdminLogin) {
        setError("Invalid admin credentials")
      } else {
        router.push("/student-dashboard")
      }
    } else if (email === "admin@example.com" && password === "adminpass") {
      if (isAdminLogin) {
        router.push("/admin-dashboard")
      } else {
        setError("Please use admin login for this account")
      }
    } else {
      setError("Invalid credentials")
    }
  }

  const handleLoginClick = (isAdmin: boolean) => {
    setIsAdminLogin(isAdmin)
    setShowForm(true)
    setError("")
    setEmail("")
    setPassword("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{isAdminLogin ? "Admin Login" : "Student Login"}</CardTitle>
        </CardHeader>
        <CardContent>
          {!showForm ? (
            <div className="space-y-4">
              <Button onClick={() => handleLoginClick(false)} className="w-full">
                Login as Student
              </Button>
              <Button onClick={() => handleLoginClick(true)} className="w-full">
                Login as Admin
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
                Login as {isAdminLogin ? "Admin" : "Student"}
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

