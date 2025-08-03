// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmiIZNYcfFlDMSZnDgbKH7biW_ieffzVQ",
  authDomain: "webdevelopement-28228.firebaseapp.com",
  databaseURL: "https://webdevelopement-28228-default-rtdb.firebaseio.com",
  projectId: "webdevelopement-28228",
  storageBucket: "webdevelopement-28228.firebasestorage.app",
  messagingSenderId: "192414535922",
  appId: "1:192414535922:web:025b22ed65ff85c303406b",
  measurementId: "G-H9Q1R7K207",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const realtimeDb = getDatabase(app)

export { app, auth, db, realtimeDb }
