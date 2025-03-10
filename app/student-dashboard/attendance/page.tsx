import { Sidebar } from "@/components/sidebar"
import { StudentAttendanceForm } from "@/components/student-attendance-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StudentAttendancePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6">Attendance</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <StudentAttendanceForm />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-md border border-green-200">
                  <div>
                    <p className="font-medium">Mathematics</p>
                    <p className="text-sm text-gray-500">March 10, 2025 - 09:30 AM</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">Present</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-md border border-green-200">
                  <div>
                    <p className="font-medium">Physics</p>
                    <p className="text-sm text-gray-500">March 9, 2025 - 11:00 AM</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">Present</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-red-50 rounded-md border border-red-200">
                  <div>
                    <p className="font-medium">Computer Science</p>
                    <p className="text-sm text-gray-500">March 8, 2025 - 02:00 PM</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">Absent</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-md border border-green-200">
                  <div>
                    <p className="font-medium">English</p>
                    <p className="text-sm text-gray-500">March 7, 2025 - 10:30 AM</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">Present</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

