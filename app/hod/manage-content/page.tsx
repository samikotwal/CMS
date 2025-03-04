"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ManageContentPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [content, setContent] = useState([
    { id: 1, title: "Introduction to Calculus", type: "Course Material", status: "Published" },
    { id: 2, title: "Physics Lab Guidelines", type: "Guidelines", status: "Draft" },
    { id: 3, title: "Computer Science Project Ideas", type: "Resources", status: "Published" },
  ])

  const handleAddContent = () => {
    if (title && description && type) {
      setContent([...content, { id: content.length + 1, title, type, status: "Draft" }])
      setTitle("")
      setDescription("")
      setType("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Manage Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Content Title" />
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Course Material">Course Material</SelectItem>
                  <SelectItem value="Guidelines">Guidelines</SelectItem>
                  <SelectItem value="Resources">Resources</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                className="col-span-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Content Description"
              />
              <Button className="col-span-2" onClick={handleAddContent}>
                Add Content
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {content.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </TableCell>
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

