"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, UserIcon, Trash2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase/config"
import { toast } from "react-hot-toast"
import { useState } from "react"
import UserProfileModal from "@/components/UserProfileModal" // Import the modal

interface ProfileDropdownProps {
  isMobile?: boolean
}

export default function ProfileDropdown({ isMobile = false }: ProfileDropdownProps) {
  const { user, userProfile, loading, deleteUserAccount } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      toast.success("Signed out successfully!")
    } catch (error: any) {
      console.error("Error signing out:", error)
      toast.error(`Sign out failed: ${error.message}`)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      await deleteUserAccount()
    }
  }

  if (loading) {
    return <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" /> // Placeholder for loading
  }

  if (!user) {
    return null // Should not be rendered if user is null, but a safeguard
  }

  const displayName = userProfile?.fullName || user.email || "User"
  const avatarFallback = displayName.charAt(0).toUpperCase()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={`relative h-8 w-8 rounded-full ${isMobile ? "w-full justify-start" : ""}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt={displayName} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            {isMobile && <span className="ml-2 text-base font-medium">{displayName}</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDeleteAccount} className="text-red-600 focus:text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete Account</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
