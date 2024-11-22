'use client'

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass, Menu, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)

  const handleLinkClick = (link: string) => {
    setActiveLink(link)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="bg-black py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Compass className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">小高AI报考助手</span>
            </Link>
            {isLoggedIn ? (
              <>
                <nav className="hidden md:flex items-center space-x-4">
                  <Link href="/majors" className={`text-gray-300 hover:text-white ${activeLink === '/majors' ? 'text-white font-bold' : ''}`} onClick={() => handleLinkClick('/majors')}>Majors</Link>
                  <Link href="/compare" className={`text-gray-300 hover:text-white ${activeLink === '/compare' ? 'text-white font-bold' : ''}`} onClick={() => handleLinkClick('/compare')}>Compare</Link>
                  <Link href="/resources" className={`text-gray-300 hover:text-white ${activeLink === '/resources' ? 'text-white font-bold' : ''}`} onClick={() => handleLinkClick('/resources')}>Resources</Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" alt="@username" />
                          <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">username</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            user@example.com
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => {
                        setIsLoggedIn(false);
                        setMobileMenuOpen(false);
                      }}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </nav>
                <div className="md:hidden">
                  <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </div>
              </>
            ) : (
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 py-2">
          <nav className="container mx-auto px-4 flex flex-col space-y-2">
            <Link href="/majors" className={`text-gray-300 hover:text-white py-2 ${activeLink === '/majors' ? 'text-white font-bold' : ''}`} onClick={() => handleLinkClick('/majors')}>Majors</Link>
            <Link href="/compare" className={`text-gray-300 hover:text-white py-2 ${activeLink === '/compare' ? 'text-white font-bold' : ''}`} onClick={() => handleLinkClick('/compare')}>Compare</Link>
            <Link href="/resources" className={`text-gray-300 font-semibold py-2 ${activeLink === '/resources' ? 'text-white font-bold' : ''}`} onClick={() => handleLinkClick('/resources')}>Resources</Link>
            <Link href="/profile" className={`text-gray-300 hover:text-white py-2 ${activeLink === '/profile' ? 'text-white font-bold' : ''}`} onClick={() => handleLinkClick('/profile')}>Profile</Link>
            <Link href="/settings" className={`text-gray-300 hover:text-white py-2 ${activeLink === '/settings' ? 'text-white font-bold' : ''}`} onClick={() => handleLinkClick('/settings')}>Settings</Link>
            <Button
              variant="ghost"
              className="justify-start px-0 hover:bg-transparent hover:text-white"
              onClick={() => {
                setIsLoggedIn(false);
                setMobileMenuOpen(false);
              }}
            >Log out
            </Button>
          </nav>
        </div>
      )}
    </>
  )
} 