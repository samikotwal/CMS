import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const activities = [
  { id: 1, name: "Science Fair", date: "2025-06-15", type: "Academic", status: "Upcoming" },
  { id: 2, name: "Basketball Tournament", date: "2025-05-20", type: "Sports", status: "Registered" },
  { id: 3, name: "Debate Club Meeting", date: "2025-05-18", type: "Club", status: "Ongoing" },
  { id: 4, name: "Art Exhibition", date: "2025-06-01", type: "Cultural", status: "Open for Registration" },
]

export function ActivitiesPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Extracurricular Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((activity) => (
          <Card key={activity.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{activity.name}</span>
                <Badge variant={activity.status === "Upcoming" ? "default" : "secondary"}>{activity.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Date:</strong> {activity.date}
              </p>
              <p>
                <strong>Type:</strong> {activity.type}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

