import { ref, set, get, push, remove, onValue, off, DataSnapshot, query, orderByChild, limitToLast } from "firebase/database"
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

// Contact form interface
interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
}

// Feature interaction interface
interface FeatureInteraction {
  userId: string
  featureId: string
  action: 'view' | 'like' | 'share' | 'contact'
  timestamp: string
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
      
      toast.success("User data saved successfully!")
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
      
      toast.success("User data updated successfully!")
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
      
      toast.success("User data deleted successfully!")
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

  // Save contact form data
  saveContactForm: async (formData: ContactFormData): Promise<boolean> => {
    try {
      if (!navigator.onLine) {
        throw new Error("You are offline. Please check your internet connection.")
      }

      const contactRef = ref(realtimeDb, 'contactForms')
      const newContactRef = push(contactRef)
      
      await set(newContactRef, {
        ...formData,
        createdAt: new Date().toISOString(),
        id: newContactRef.key
      })
      
      toast.success("Contact form submitted successfully!")
      return true
    } catch (error: any) {
      console.error("Error saving contact form:", error)
      toast.error(error.message || "Failed to submit contact form")
      return false
    }
  },

  // Get all contact forms (admin function)
  getContactForms: async (): Promise<ContactFormData[]> => {
    try {
      if (!navigator.onLine) {
        throw new Error("You are offline. Please check your internet connection.")
      }

      const contactRef = ref(realtimeDb, 'contactForms')
      const contactQuery = query(contactRef, orderByChild('createdAt'), limitToLast(50))
      const snapshot = await get(contactQuery)
      
      if (snapshot.exists()) {
        const forms: ContactFormData[] = []
        snapshot.forEach((childSnapshot) => {
          forms.push(childSnapshot.val() as ContactFormData)
        })
        return forms.reverse() // Most recent first
      }
      
      return []
    } catch (error: any) {
      console.error("Error getting contact forms:", error)
      toast.error(error.message || "Failed to get contact forms")
      return []
    }
  },

  // Listen to contact forms in real-time (admin function)
  listenToContactForms: (callback: (forms: ContactFormData[]) => void) => {
    try {
      const contactRef = ref(realtimeDb, 'contactForms')
      const contactQuery = query(contactRef, orderByChild('createdAt'), limitToLast(50))
      
      const unsubscribe = onValue(contactQuery, (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const forms: ContactFormData[] = []
          snapshot.forEach((childSnapshot) => {
            forms.push(childSnapshot.val() as ContactFormData)
          })
          callback(forms.reverse()) // Most recent first
        } else {
          callback([])
        }
      }, (error) => {
        console.error("Error listening to contact forms:", error)
        toast.error("Failed to listen to contact forms")
        callback([])
      })

      return unsubscribe
    } catch (error: any) {
      console.error("Error setting up contact forms listener:", error)
      toast.error("Failed to set up contact forms listener")
      return () => {}
    }
  },

  // Save feature interaction
  saveFeatureInteraction: async (interaction: FeatureInteraction): Promise<boolean> => {
    try {
      if (!navigator.onLine) {
        throw new Error("You are offline. Please check your internet connection.")
      }

      const interactionRef = ref(realtimeDb, 'featureInteractions')
      const newInteractionRef = push(interactionRef)
      
      await set(newInteractionRef, {
        ...interaction,
        timestamp: new Date().toISOString(),
        id: newInteractionRef.key
      })
      
      return true
    } catch (error: any) {
      console.error("Error saving feature interaction:", error)
      return false
    }
  },

  // Get feature interactions for analytics
  getFeatureInteractions: async (featureId?: string): Promise<FeatureInteraction[]> => {
    try {
      if (!navigator.onLine) {
        throw new Error("You are offline. Please check your internet connection.")
      }

      const interactionRef = ref(realtimeDb, 'featureInteractions')
      const interactionQuery = query(interactionRef, orderByChild('timestamp'), limitToLast(100))
      const snapshot = await get(interactionQuery)
      
      if (snapshot.exists()) {
        const interactions: FeatureInteraction[] = []
        snapshot.forEach((childSnapshot) => {
          const interaction = childSnapshot.val() as FeatureInteraction
          if (!featureId || interaction.featureId === featureId) {
            interactions.push(interaction)
          }
        })
        return interactions.reverse() // Most recent first
      }
      
      return []
    } catch (error: any) {
      console.error("Error getting feature interactions:", error)
      return []
    }
  },

  // Listen to feature interactions in real-time
  listenToFeatureInteractions: (callback: (interactions: FeatureInteraction[]) => void) => {
    try {
      const interactionRef = ref(realtimeDb, 'featureInteractions')
      const interactionQuery = query(interactionRef, orderByChild('timestamp'), limitToLast(100))
      
      const unsubscribe = onValue(interactionQuery, (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const interactions: FeatureInteraction[] = []
          snapshot.forEach((childSnapshot) => {
            interactions.push(childSnapshot.val() as FeatureInteraction)
          })
          callback(interactions.reverse()) // Most recent first
        } else {
          callback([])
        }
      }, (error) => {
        console.error("Error listening to feature interactions:", error)
        callback([])
      })

      return unsubscribe
    } catch (error: any) {
      console.error("Error setting up feature interactions listener:", error)
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
  },

  // Listen to database connectivity
  listenToConnectivity: (callback: (isConnected: boolean) => void) => {
    try {
      const connectedRef = ref(realtimeDb, '.info/connected')
      
      const unsubscribe = onValue(connectedRef, (snapshot: DataSnapshot) => {
        callback(snapshot.val() === true)
      }, (error) => {
        console.error("Error listening to connectivity:", error)
        callback(false)
      })

      return unsubscribe
    } catch (error: any) {
      console.error("Error setting up connectivity listener:", error)
      return () => {}
    }
  }
}

export default databaseUtils 