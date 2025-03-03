import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const attendanceData = [
  { subject: "Math", present: 90, absent: 10 },
  { subject: "Science", present: 85, absent: 15 },
  { subject: "English", present: 95, absent: 5 },
  { subject: "History", present: 88, absent: 12 },
  { subject: "Art", present: 92, absent: 8 },
]

export function AttendancePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Attendance Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="present" stackId="a" fill="#8884d8" />
          <Bar dataKey="absent" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Overall Attendance: 90%</h3>
        <p className="text-sm text-gray-600">You're doing great! Keep it up to maintain good academic performance.</p>
      </div>
    </div>
  )
}

