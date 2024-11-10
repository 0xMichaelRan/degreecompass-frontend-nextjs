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
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="md:w-1/2 relative overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/placeholder.svg?height=1080&width=1920" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-75"></div>
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Welcome Back</h1>
              <p className="text-xl md:text-2xl text-blue-200">Continue your journey with DegreeCompass</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <Card className="w-full max-w-md bg-black bg-opacity-50 border-gray-700 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Log in to Your Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gray-200">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <p className="text-pink-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="password" className="text-gray-200">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.password && <p className="text-pink-500 text-sm mt-1">{errors.password}</p>}
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
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Log in
                </Button>
              </form>
              <div className="mt-4 text-center space-y-2">
                <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 block">
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
        </div>
      </div>
      <footer className="bg-black py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 DegreeCompass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}