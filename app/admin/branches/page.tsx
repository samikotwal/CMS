"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function BranchesPage() {
  const [branches, setBranches] = useState([
    { id: 1, name: "Computer Science", code: "CS" },
    { id: 2, name: "Electrical Engineering", code: "EE" },
    { id: 3, name: "Mechanical Engineering", code: "ME" },
  ])
  const [newBranch, setNewBranch] = useState({ name: "", code: "" })

  const addBranch = () => {
    if (newBranch.name && newBranch.code) {
      setBranches([...branches, { id: branches.length + 1, ...newBranch }])
      setNewBranch({ name: "", code: "" })
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Branches</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Branch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Branch Name"
              value={newBranch.name}
              onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
            />
            <Input
              placeholder="Branch Code"
              value={newBranch.code}
              onChange={(e) => setNewBranch({ ...newBranch, code: e.target.value })}
            />
            <Button onClick={addBranch}>Add Branch</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Branches</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>{branch.id}</TableCell>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.code}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="ml-2">
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
  )
}

