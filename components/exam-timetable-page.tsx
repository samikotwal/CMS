import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const examTimetable = [
  { date: "2025-05-10", time: "09:00 AM", subject: "Mathematics", duration: "3 hours", venue: "Hall A" },
  { date: "2025-05-12", time: "10:00 AM", subject: "Science", duration: "2 hours", venue: "Lab 1" },
  { date: "2025-05-14", time: "09:30 AM", subject: "English", duration: "2.5 hours", venue: "Hall B" },
  { date: "2025-05-16", time: "11:00 AM", subject: "History", duration: "2 hours", venue: "Room 101" },
]

export function ExamTimetablePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upcoming Exams</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Venue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {examTimetable.map((exam, index) => (
            <TableRow key={index}>
              <TableCell>{exam.date}</TableCell>
              <TableCell>{exam.time}</TableCell>
              <TableCell>{exam.subject}</TableCell>
              <TableCell>{exam.duration}</TableCell>
              <TableCell>{exam.venue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

