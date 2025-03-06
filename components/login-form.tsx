"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, User, Lock } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent, userType: string) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    // Updated authentication logic
    if (email === "student@example.com" && password === "111") {
      if (userType === "student") {
        router.push("/student-dashboard")
      } else {
        setError("Invalid credentials for selected user type")
      }
    } else if (email === "admin@example.com" && password === "222") {
      if (userType === "admin") {
        router.push("/admin-dashboard")
      } else {
        setError("Invalid credentials for selected user type")
      }
    } else if (email === "hod@example.com" && password === "333") {
      if (userType === "hod") {
        router.push("/hod-dashboard")
      } else {
        setError("Invalid credentials for selected user type")
      }
    } else {
      setError("Invalid credentials")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl flex bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/cms-image.jpg')" }}
        >
          <div className="h-full w-full bg-black bg-opacity-25 flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome to EduCMS</h1>
              <p className="text-xl">Empowering Education Through Technology</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Login to Your Account</CardTitle>
              <CardDescription className="text-center">
                Please enter your credentials to access the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                  <TabsTrigger value="hod">HOD</TabsTrigger>
                </TabsList>
                {["student", "admin", "hod"].map((userType) => (
                  <TabsContent key={userType} value={userType}>
                    <form onSubmit={(e) => handleSubmit(e, userType)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${userType}-email`}>Email</Label>
                        <div className="relative">
                          <Input
                            id={`${userType}-email`}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="pl-10"
                          />
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${userType}-password`}>Password</Label>
                        <div className="relative">
                          <Input
                            id={`${userType}-password`}
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="pl-10"
                          />
                          <Lock
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                      <Button type="submit" className="w-full">
                        Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
                      </Button>
                    </form>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}

