"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Camera, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <Label className="text-sm font-medium text-gray-700">{label}</Label>
    <div className="mt-1">{children}</div>
  </div>
)

const FileUpload = ({ label, id }: { label: string; id: string }) => (
  <FormField label={label}>
    <Input
      id={id}
      type="file"
      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
    />
  </FormField>
)

export function StudentProfile() {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="bg-indigo-600 p-6 sm:p-10 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Student Profile</h1>
          <Button variant="secondary">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center mb-8">
            <div className="relative mb-4 sm:mb-0 sm:mr-8">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer"
              >
                <Camera className="h-5 w-5" />
              </label>
              <input
                id="profile-image"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      setProfileImage(reader.result as string)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                accept="image/*"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
              <p className="text-gray-600">Student ID: STU2025001</p>
            </div>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label="Name">
                  <Input placeholder="Enter your name" />
                </FormField>
                <FormField label="Mobile Number">
                  <Input type="tel" placeholder="Enter your mobile number" />
                </FormField>
                <FormField label="Email">
                  <Input type="email" placeholder="Enter your email" />
                </FormField>
                <FormField label="Roll No">
                  <Input placeholder="Enter your roll number" />
                </FormField>
                <FormField label="Date of Joining">
                  <Input type="date" />
                </FormField>
              </div>
              <FormField label="About">
                <Textarea placeholder="Write something about yourself" className="h-32" />
              </FormField>
            </TabsContent>
            <TabsContent value="personal" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label="Date of Birth">
                  <Input type="date" />
                </FormField>
                <FormField label="Gender">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Nationality">
                  <Input placeholder="Enter your nationality" />
                </FormField>
                <FormField label="Blood Group">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Aadhar Number">
                  <Input placeholder="Enter your Aadhar number" />
                </FormField>
                <FormField label="PAN Number">
                  <Input placeholder="Enter your PAN number" />
                </FormField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                <FileUpload label="Aadhar Card Image" id="aadhar-card" />
                <FileUpload label="PAN Card Image" id="pan-card" />
                <FileUpload label="Digital Signature" id="digital-signature" />
              </div>
            </TabsContent>
            <TabsContent value="address" className="mt-6">
              <div className="grid grid-cols-1 gap-6">
                <FormField label="Permanent Address">
                  <Textarea placeholder="Enter your permanent address" className="h-24" />
                </FormField>
                <FormField label="Permanent Address PIN Code">
                  <Input placeholder="Enter PIN code" />
                </FormField>
                <FormField label="Correspondence Address">
                  <Textarea placeholder="Enter your correspondence address" className="h-24" />
                </FormField>
                <FormField label="Correspondence Address PIN Code">
                  <Input placeholder="Enter PIN code" />
                </FormField>
              </div>
            </TabsContent>
            <TabsContent value="education" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label="College/University Name">
                  <Input placeholder="Enter your college/university name" />
                </FormField>
                <FormField label="Marks in College (%)">
                  <Input type="number" placeholder="Enter your college marks in percentage" min="0" max="100" />
                </FormField>
                <FormField label="School Name">
                  <Input placeholder="Enter your school name" />
                </FormField>
                <FormField label="Marks in 10th">
                  <Input type="number" placeholder="Enter your 10th marks in percentage" min="0" max="100" />
                </FormField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <FileUpload label="College Result" id="college-result" />
                <FileUpload label="10th Marks Card" id="tenth-marks-card" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  )
}

