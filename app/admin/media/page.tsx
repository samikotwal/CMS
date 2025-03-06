"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash, Eye } from "lucide-react"

export default function MediaPage() {
  const [mediaTitle, setMediaTitle] = useState("")
  const [mediaType, setMediaType] = useState("")
  const [mediaFile, setMediaFile] = useState(null)
  const [media, setMedia] = useState([
    { id: 1, title: "Campus Tour Video", type: "Video", filename: "campus_tour.mp4" },
    { id: 2, title: "College Brochure", type: "Document", filename: "brochure.pdf" },
    { id: 3, title: "Lab Equipment Guide", type: "Image", filename: "lab_equipment.jpg" },
  ])

  const handleAddMedia = () => {
    if (mediaTitle && mediaType && mediaFile) {
      setMedia([...media, { id: media.length + 1, title: mediaTitle, type: mediaType, filename: mediaFile.name }])
      setMediaTitle("")
      setMediaType("")
      setMediaFile(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isAdmin />
      <div className="flex-1 ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Media Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Input value={mediaTitle} onChange={(e) => setMediaTitle(e.target.value)} placeholder="Media Title" />
                <Select value={mediaType} onValueChange={setMediaType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Media Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Video">Video</SelectItem>
                    <SelectItem value="Document">Document</SelectItem>
                    <SelectItem value="Image">Image</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="file" onChange={(e) => setMediaFile(e.target.files[0])} />
                <Button className="col-span-3" onClick={handleAddMedia}>
                  <Plus className="mr-2 h-4 w-4" /> Add Media
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Filename</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {media.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.filename}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="mr-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

