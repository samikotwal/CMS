"use client"

import { useState } from "react"
import { Upload, Search, Image, File, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function MediaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [media, setMedia] = useState([
    { id: 1, name: "hero-image.jpg", type: "image", size: "1.2 MB", uploadDate: "2025-02-10" },
    { id: 2, name: "report.pdf", type: "document", size: "3.5 MB", uploadDate: "2025-02-09" },
    { id: 3, name: "product-video.mp4", type: "video", size: "15.7 MB", uploadDate: "2025-02-08" },
    { id: 4, name: "logo.png", type: "image", size: "0.5 MB", uploadDate: "2025-02-07" },
  ])

  const filteredMedia = media.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleDelete = (id: number) => {
    setMedia(media.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload New File
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search files..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMedia.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                    {item.type === "image" ? (
                      <Image className="h-12 w-12 text-gray-400" />
                    ) : (
                      <File className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.size}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(item.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

