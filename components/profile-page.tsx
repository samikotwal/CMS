"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically send the updated profile to your backend
    console.log("Saving profile:", profile)
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Personal Information</span>
            {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <div className="relative w-40 h-40 mx-auto">
                <img src="/placeholder.svg?height=160&width=160" alt="Profile" className="rounded-full object-cover" />
                {isEditing && (
                  <Button size="icon" className="absolute bottom-0 right-0 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <Input id="name" name="name" value={profile.name} onChange={handleInputChange} />
                    ) : (
                      <span>{profile.name}</span>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <Input id="email" name="email" type="email" value={profile.email} onChange={handleInputChange} />
                    ) : (
                      <span>{profile.email}</span>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <Input id="phone" name="phone" value={profile.phone} onChange={handleInputChange} />
                    ) : (
                      <span>{profile.phone}</span>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                    {isEditing ? (
                      <Input id="location" name="location" value={profile.location} onChange={handleInputChange} />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea id="bio" name="bio" value={profile.bio} onChange={handleInputChange} rows={4} />
                  ) : (
                    <p>{profile.bio}</p>
                  )}
                </div>
              </div>
              {isEditing && (
                <div className="mt-6 flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

