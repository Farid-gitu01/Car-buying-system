"use client"

import { Toaster } from "react-hot-toast" // Using react-hot-toast for consistency

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car } from "lucide-react"
import { auth } from "@/firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-hot-toast"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Signed in successfully! Redirecting...")
      router.push("/home") // Redirect to homepage on success
    } catch (error: any) {
      console.error("Error signing in:", error)
      toast.error(`Sign in failed: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/home" className="flex items-center justify-center gap-2 text-3xl font-bold text-yellow-500 mb-4">
            <Car className="h-8 w-8" />
            <span>YeloCar</span>
          </Link>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="grid gap-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus-visible:ring-yellow-500"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="focus-visible:ring-yellow-500"
            />
            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="underline text-yellow-500 hover:text-yellow-600">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
      <Toaster position="bottom-right" />
    </div>
  )
}
