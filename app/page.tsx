import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Student and Admin Login</h1>
      <LoginForm />
    </main>
  )
}

