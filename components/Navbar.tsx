"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, Menu, X, Search, User, Phone, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import ProfileDropdown from "@/components/ProfileDropdown"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { user, loading } = useAuth()

  // Handle scroll effect with proper SSR handling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Add event listener only on client side
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      
      // Set initial state
      handleScroll()
      
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Features", href: "/features" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ]

  // Do not render Navbar on auth pages
  if (pathname.startsWith("/auth")) {
    return null
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-theme-accent-200/20" 
        : "bg-transparent"
    }`}>
      <div className="container flex h-16 md:h-20 items-center justify-between px-4 md:px-6 mx-auto">
        {/* Logo */}
        <Link 
          href="/home" 
          className="flex items-center gap-3 text-xl md:text-2xl font-display font-bold group transition-all duration-300"
        >
          <div className="relative">
            <Car className="h-8 w-8 md:h-10 md:w-10 text-theme-primary-500 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-theme-secondary-400 rounded-full animate-pulse"></div>
          </div>
          <span className="gradient-text-primary">
            YeloCar
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative transition-all duration-300 hover:text-theme-primary-600 ${
                pathname === link.href 
                  ? "text-theme-primary-600 font-semibold" 
                  : "text-theme-accent-700 hover:text-theme-primary-600"
              } group`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-theme-primary-500 to-theme-secondary-500 transition-all duration-300 group-hover:w-full ${
                pathname === link.href ? "w-full" : ""
              }`}></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-theme-accent-600 hover:text-theme-primary-600 hover:bg-theme-primary-50"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Auth Buttons */}
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-theme-accent-200 animate-pulse" />
              <div className="h-4 w-16 bg-theme-accent-200 rounded animate-pulse" />
            </div>
          ) : user ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link href="/auth/signin">
                <Button 
                  variant="ghost" 
                  className="text-theme-accent-700 hover:text-theme-primary-600 hover:bg-theme-primary-50 transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-primary hover:bg-gradient-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-theme-accent-700 hover:text-theme-primary-600 hover:bg-theme-primary-50 transition-all duration-300"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white/95 backdrop-blur-md border-l border-theme-accent-200/20">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between pb-6 border-b border-theme-accent-200/20">
                <Link
                  href="/home"
                  className="flex items-center gap-3 text-xl font-display font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  <Car className="h-8 w-8 text-theme-primary-500" />
                  <span className="gradient-text-primary">
                    YeloCar
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-theme-accent-600 hover:text-theme-primary-600"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-2 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                      pathname === link.href 
                        ? "bg-theme-primary-50 text-theme-primary-600 font-semibold border-l-4 border-theme-primary-500" 
                        : "text-theme-accent-700 hover:bg-theme-accent-50 hover:text-theme-primary-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Contact Info */}
              <div className="mt-auto pt-6 border-t border-theme-accent-200/20">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm text-theme-accent-600">
                    <Phone className="h-4 w-4" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-theme-accent-600">
                    <Mail className="h-4 w-4" />
                    <span>info@yelocar.com</span>
                  </div>
                </div>

                {/* Mobile Auth Section */}
                {loading ? (
                  <div className="space-y-3">
                    <div className="h-12 w-full bg-theme-accent-200 rounded-xl animate-pulse" />
                    <div className="h-12 w-full bg-theme-accent-200 rounded-xl animate-pulse" />
                  </div>
                ) : user ? (
                  <div className="px-4">
                    <ProfileDropdown isMobile={true} />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                      <Button 
                        variant="outline" 
                        className="w-full text-theme-accent-700 hover:text-theme-primary-600 hover:bg-theme-primary-50 border-theme-accent-300 hover:border-theme-primary-300 transition-all duration-300"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-primary hover:bg-gradient-primary text-white shadow-lg hover:shadow-xl transition-all duration-300">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
