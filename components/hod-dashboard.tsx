"use client"
import { useRouter } from "next/navigation"
import { Bell, Search, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"

export function HODDashboard() {
  const router = useRouter()

  const handleSignOut = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="md:ml-64">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="md:hidden w-8" /> {/* Spacer for mobile */}
            <div className="flex-1 flex items-center justify-end space-x-4">
              <div className="relative max-w-xs w-full hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input type="text" placeholder="Search..." className="pl-10 pr-4" />
              </div>
              <Button variant="ghost" size="icon">
                <Bell />
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>HOD</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut />
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Keep your existing dashboard content here */}
        </main>
      </div>
    </div>
  )
}

