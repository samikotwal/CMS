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
import { Plus, Edit, Trash } from "lucide-react"

export default function ActivitiesPage() {
  const [activityName, setActivityName] = useState("")
  const [activityDate, setActivityDate] = useState("")
  const [activityType, setActivityType] = useState("")
  const [activityDescription, setActivityDescription] = useState("")
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "Department Seminar",
      date: "2025-06-15",
      type: "Academic",
      description: "Annual department seminar",
    },
    {
      id: 2,
      name: "Faculty Meeting",
      date: "2025-07-10",
      type: "Administrative",
      description: "Monthly faculty meeting",
    },
    {
      id: 3,
      name: "Research Symposium",
      date: "2025-08-05",
      type: "Research",
      description: "Annual research symposium",
    },
  ])

  const handleAddActivity = () => {
    if (activityName && activityDate && activityType) {
      setActivities([
        ...activities,
        {
          id: activities.length + 1,
          name: activityName,
          date: activityDate,
          type: activityType,
          description: activityDescription,
        },
      ])
      setActivityName("")
      setActivityDate("")
      setActivityType("")
      setActivityDescription("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Manage Department Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Input
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  placeholder="Activity Name"
                />
                <Input
                  type="date"
                  value={activityDate}
                  onChange={(e) => setActivityDate(e.target.value)}
                  placeholder="Activity Date"
                />
                <Select value={activityType} onValueChange={setActivityType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Activity Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Administrative">Administrative</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  value={activityDescription}
                  onChange={(e) => setActivityDescription(e.target.value)}
                  placeholder="Activity Description"
                />
                <Button className="col-span-2" onClick={handleAddActivity}>
                  <Plus className="mr-2 h-4 w-4" /> Add Activity
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.name}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.type}</TableCell>
                      <TableCell>{activity.description}</TableCell>
                      <TableCell>
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

