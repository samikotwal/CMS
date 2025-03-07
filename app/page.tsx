import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <img src="/cms-image.jpg" alt="CMS Image" />

      <LoginForm />
    </main>
  )
}

