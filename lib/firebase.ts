import { ref, set, get, push, remove, onValue, off, DataSnapshot } from "firebase/database"
import { realtimeDb } from "@/firebase/config"
import { toast } from "react-hot-toast"

// User interface for database operations
interface UserData {
  uid: string
  email: string
  fullName: string
  phoneNumber: string
  createdAt: string
}

// Database utility functions
export const databaseUtils = {
  // Save user data to Realtime Database
  saveUserData: async (userData: UserData): Promise<boolean> => {
    try {
      if (!navigator.onLine) {
        throw new Error("You are offline. Please check your internet connection.")
      }

      const userRef = ref(realtimeDb, `users/${userData.uid}`)
      await set(userRef, {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      return true
    } catch (error: any) {
      console.error("Error saving user data:", error)
      toast.error(error.message || "Failed to save user data")
      return false
    }
  },

  // Get user data from Realtime Database
  getUserData: async (uid: string): Promise<UserData | null> => {
    try {
      if (!navigator.onLine) {
        throw new Error("You are offline. Please check your internet connection.")
      }

      const userRef = ref(realtimeDb, `users/${uid}`)
      const snapshot = await get(userRef)
      
      if (snapshot.exists()) {
        return snapshot.val() as UserData
      }
      
      return null
    } catch (error: any) {
      console.error("Error getting user data:", error)
      toast.error(error.message || "Failed to get user data")
      return null
    }
  },

  // Update user data in Realtime Database
  updateUserData: async (uid: string, updates: Partial<UserData>): Promise<boolean> => {
    try {
      if (!navigator.onLine) {
        throw new Error("You are offline. Please check your internet connection.")
      }

      const userRef = ref(realtimeDb, `users/${uid}`)
      await set(userRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      }, { merge: true })
      
      return true
    } catch (error: any) {
      console.error("Error updating user data:", error)
      toast.error(error.message || "Failed to update user data")
      return false
    }
  },

  // Delete user data from Realtime Database
  deleteUserData: async (uid: string): Promise<boolean> => {
    try {
      if (!navigator.onLine) {
        throw new Error("You are offline. Please check your internet connection.")
      }

      const userRef = ref(realtimeDb, `users/${uid}`)
      await remove(userRef)
      
      return true
    } catch (error: any) {
      console.error("Error deleting user data:", error)
      toast.error(error.message || "Failed to delete user data")
      return false
    }
  },

  // Listen to user data changes in real-time
  listenToUserData: (uid: string, callback: (data: UserData | null) => void) => {
    try {
      const userRef = ref(realtimeDb, `users/${uid}`)
      
      const unsubscribe = onValue(userRef, (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.val() as UserData)
        } else {
          callback(null)
        }
      }, (error) => {
        console.error("Error listening to user data:", error)
        toast.error("Failed to listen to user data changes")
        callback(null)
      })

      return unsubscribe
    } catch (error: any) {
      console.error("Error setting up user data listener:", error)
      toast.error("Failed to set up user data listener")
      return () => {}
    }
  },

  // Check database connectivity
  checkConnectivity: async (): Promise<boolean> => {
    try {
      const testRef = ref(realtimeDb, '.info/connected')
      const snapshot = await get(testRef)
      return snapshot.val() === true
    } catch (error) {
      console.error("Database connectivity check failed:", error)
      return false
    }
  }
}

export default databaseUtils 