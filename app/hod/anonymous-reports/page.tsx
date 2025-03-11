"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Eye, MessageCircle } from "lucide-react"

// Mock data for anonymous reports
const anonymousReports = [
  {
    id: 1,
    subject: "Classroom Concern",
    status: "New",
    date: "2025-03-10",
    preview: "I have a concern about the classroom environment...",
  },
  {
    id: 2,
    subject: "Course Material Feedback",
    status: "In Progress",
    date: "2025-03-09",
    preview: "I would like to provide feedback on the course materials...",
  },
  {
    id: 3,
    subject: "Exam Schedule Request",
    status: "New",
    date: "2025-03-08",
    preview: "I have a request regarding the upcoming exam schedule...",
  },
  {
    id: 4,
    subject: "Student Welfare Suggestion",
    status: "Resolved",
    date: "2025-03-07",
    preview: "I have a suggestion to improve student welfare...",
  },
  {
    id: 5,
    subject: "Academic Support Needed",
    status: "New",
    date: "2025-03-06",
    preview: "I am struggling with a particular subject and need support...",
  },
]

export default function AnonymousReportsPage() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReport, setSelectedReport] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")

  const filteredReports = anonymousReports.filter(
    (report) =>
      (selectedStatus === "all" || report.status === selectedStatus) &&
      (report.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.preview.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleViewReport = (report) => {
    setSelectedReport(report)
    setIsViewDialogOpen(true)
  }

  const handleReplyToReport = (report) => {
    setSelectedReport(report)
    setIsReplyDialogOpen(true)
  }

  const handleSendReply = () => {
    // Here you would typically send the reply to your backend
    console.log("Sending reply for report:", selectedReport.id)
    console.log("Reply message:", replyMessage)
    setIsReplyDialogOpen(false)
    setReplyMessage("")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold mb-6">Anonymous Student Reports</h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filter and Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Preview</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.subject}</TableCell>
                      <TableCell className="max-w-xs truncate">{report.preview}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            report.status === "New"
                              ? "destructive"
                              : report.status === "In Progress"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewReport(report)}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleReplyToReport(report)}>
                            <MessageCircle className="h-4 w-4 mr-1" /> Reply
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedReport?.subject}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Submitted on: {selectedReport?.date}</p>
                <p>{selectedReport?.preview}</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reply to Report</DialogTitle>
                <DialogDescription>
                  Your reply will be sent anonymously to the student who submitted this report.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <Label htmlFor="reply">Your Reply</Label>
                <Textarea
                  id="reply"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={5}
                  placeholder="Type your reply here..."
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendReply}>Send Reply</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </div>
  )
}

