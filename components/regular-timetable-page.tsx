import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const regularTimetable = [
  { day: "Monday", periods: ["Math", "Science", "English", "History", "PE"] },
  { day: "Tuesday", periods: ["Science", "Math", "Art", "English", "Computer Science"] },
  { day: "Wednesday", periods: ["History", "English", "Math", "Science", "Music"] },
  { day: "Thursday", periods: ["English", "Science", "Math", "Computer Science", "Art"] },
  { day: "Friday", periods: ["PE", "Math", "Science", "English", "History"] },
]

export function RegularTimetablePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Weekly Schedule</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Period 1</TableHead>
            <TableHead>Period 2</TableHead>
            <TableHead>Period 3</TableHead>
            <TableHead>Period 4</TableHead>
            <TableHead>Period 5</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {regularTimetable.map((day, index) => (
            <TableRow key={index}>
              <TableCell>{day.day}</TableCell>
              {day.periods.map((period, periodIndex) => (
                <TableCell key={periodIndex}>{period}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

