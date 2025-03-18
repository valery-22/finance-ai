"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign } from "lucide-react"
import { signIn } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    try {
      setLoading(true)
      const user = await signIn(email, password)
      if (user) {
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Error signing in:", error)
      setError(error.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-finance-purple/5 to-finance-blue/5 p-4 overflow-hidden">
      <div className="absolute top-8 left-0 right-0 text-center">
        <h1 className="text-3xl font-bold gradient-text">FinanceAI</h1>
        <p className="text-sm text-gray-500 mt-2">Your AI-powered personal finance assistant</p>
      </div>

      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden card-glow">
        <form onSubmit={handleLogin}>
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center">
              <div className="rounded-full gradient-bg p-2 animate-pulse-slow">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl gradient-text">Welcome back</CardTitle>
            <CardDescription>Enter your email and password to login to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <div className="p-3 rounded-md bg-finance-red/10 text-finance-red text-sm">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                className="bg-white/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-finance-purple hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                required
                type="password"
                className="bg-white/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full gradient-bg hover:opacity-90 transition-opacity" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-finance-purple hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

