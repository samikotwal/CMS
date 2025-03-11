"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash, Eye, FileText, Image, File, Upload, Check, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data for content items
const contentItems = [
  {
    id: 1,
    title: "Introduction to Calculus",
    type: "Course Material",
    description: "Basic concepts of calculus",
    status: "Published",
    author: "Dr. Smith",
    lastModified: "2025-03-08",
  },
  {
    id: 2,
    title: "Lab Safety Guidelines",
    type: "Guidelines",
    description: "Safety rules for science labs",
    status: "Published",
    author: "Prof. Johnson",
    lastModified: "2025-03-05",
  },
  {
    id: 3,
    title: "Student Handbook",
    type: "Policy",
    description: "College policies and procedures",
    status: "Draft",
    author: "Admin Team",
    lastModified: "2025-03-10",
  },
  {
    id: 4,
    title: "Physics Formulas",
    type: "Reference",
    description: "Common physics formulas and equations",
    status: "Published",
    author: "Dr. Williams",
    lastModified: "2025-03-01",
  },
  {
    id: 5,
    title: "Programming Best Practices",
    type: "Course Material",
    description: "Coding standards and best practices",
    status: "Review",
    author: "Prof. Davis",
    lastModified: "2025-03-09",
  },
]

export default function ContentPage() {
  const [contentTitle, setContentTitle] = useState("")
  const [contentType, setContentType] = useState("")
  const [contentDescription, setContentDescription] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredContent, setFilteredContent] = useState(contentItems)
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter content based on search query and selected filters
  const handleSearch = () => {
    let filtered = contentItems

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedStatus && selectedStatus !== "all") {
      filtered = filtered.filter((item) => item.status === selectedStatus)
    }

    setFilteredContent(filtered)
  }

  const handleAddContent = () => {
    // In a real app, this would send data to the backend
    console.log("Adding content:", { contentTitle, contentType, contentDescription })
    setIsAddDialogOpen(false)
    setContentTitle("")
    setContentType("")
    setContentDescription("")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isAdmin />
      <div className="flex-1 ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Content Management</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Content
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Content</DialogTitle>
                  <DialogDescription>Create new content for your courses, policies, or guidelines.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={contentTitle}
                      onChange={(e) => setContentTitle(e.target.value)}
                      placeholder="Enter content title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Content Type</Label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Course Material">Course Material</SelectItem>
                        <SelectItem value="Guidelines">Guidelines</SelectItem>
                        <SelectItem value="Policy">Policy</SelectItem>
                        <SelectItem value="Reference">Reference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={contentDescription}
                      onChange={(e) => setContentDescription(e.target.value)}
                      placeholder="Enter content description"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddContent}>Add Content</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="course">Course Materials</TabsTrigger>
              <TabsTrigger value="policy">Policies & Guidelines</TabsTrigger>
              <TabsTrigger value="reference">References</TabsTrigger>
            </TabsList>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Search & Filter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="Search content..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Review">Under Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSearch}>Search</Button>
                </div>
              </CardContent>
            </Card>

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>All Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Last Modified</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContent.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.status === "Published"
                                  ? "bg-green-100 text-green-800"
                                  : item.status === "Draft"
                                    ? "bg-gray-100 text-gray-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </TableCell>
                          <TableCell>{item.author}</TableCell>
                          <TableCell>{item.lastModified}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="course">
              <Card>
                <CardHeader>
                  <CardTitle>Course Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredContent
                      .filter((item) => item.type === "Course Material")
                      .map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="h-32 bg-gray-100 flex items-center justify-center">
                            <FileText className="h-12 w-12 text-gray-400" />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold truncate">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                            <div className="flex justify-between items-center mt-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.status === "Published"
                                    ? "bg-green-100 text-green-800"
                                    : item.status === "Draft"
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {item.status}
                              </span>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="policy">
              <Card>
                <CardHeader>
                  <CardTitle>Policies & Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredContent
                      .filter((item) => item.type === "Policy" || item.type === "Guidelines")
                      .map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="h-32 bg-gray-100 flex items-center justify-center">
                            <File className="h-12 w-12 text-gray-400" />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold truncate">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                            <div className="flex justify-between items-center mt-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.status === "Published"
                                    ? "bg-green-100 text-green-800"
                                    : item.status === "Draft"
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {item.status}
                              </span>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reference">
              <Card>
                <CardHeader>
                  <CardTitle>References</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredContent
                      .filter((item) => item.type === "Reference")
                      .map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="h-32 bg-gray-100 flex items-center justify-center">
                            <Image className="h-12 w-12 text-gray-400" />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold truncate">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                            <div className="flex justify-between items-center mt-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.status === "Published"
                                    ? "bg-green-100 text-green-800"
                                    : item.status === "Draft"
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {item.status}
                              </span>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-500 mb-2">Drag and drop files here or click to browse</p>
                  <Input type="file" className="hidden" id="file-upload" />
                  <Button asChild>
                    <label htmlFor="file-upload">Select Files</label>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="mr-2 h-5 w-5" />
                  Content Approval
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-md border border-yellow-200">
                    <div>
                      <p className="font-medium">Programming Best Practices</p>
                      <p className="text-sm text-gray-500">Awaiting approval</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <X className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-md border border-yellow-200">
                    <div>
                      <p className="font-medium">Student Handbook</p>
                      <p className="text-sm text-gray-500">Awaiting approval</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <X className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

