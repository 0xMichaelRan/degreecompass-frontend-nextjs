'use client'

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your login logic here
    console.log('Login data:', formData)
    // For demonstration, we'll just show a simple validation
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    setErrors(newErrors)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <header className="bg-black py-6">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Compass className="h-6 w-6 text-purple-400" />
            <span className="text-2xl font-bold text-white">DegreeCompass</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Log in to Your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: checked }))}
                />
                <Label htmlFor="rememberMe" className="text-gray-200">Remember me</Label>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                Log in
              </Button>
            </form>
            <div className="mt-4 text-center space-y-2">
              <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300 block">
                Forgot your password?
              </Link>
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link href="/register" className="text-purple-400 hover:text-purple-300">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-black py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 DegreeCompass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}