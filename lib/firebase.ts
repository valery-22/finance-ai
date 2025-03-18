import { initializeApp, getApps, getApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
  orderBy,
  type DocumentData,
} from "firebase/firestore"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Authentication functions
export const createUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`)
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error: any) {
    throw new Error(`Failed to sign in: ${error.message}`)
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return true
  } catch (error: any) {
    throw new Error(`Failed to sign out: ${error.message}`)
  }
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

// Firestore functions
export const createUserProfile = async (userId: string, data: any) => {
  try {
    await setDoc(doc(db, "users", userId), {
      ...data,
      createdAt: Timestamp.now(),
    })
    return true
  } catch (error: any) {
    throw new Error(`Failed to create user profile: ${error.message}`)
  }
}

export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      return null
    }
  } catch (error: any) {
    throw new Error(`Failed to get user profile: ${error.message}`)
  }
}

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
      ...data,
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error: any) {
    throw new Error(`Failed to update user profile: ${error.message}`)
  }
}

// Transaction functions
export const addTransaction = async (userId: string, transaction: any) => {
  try {
    const transactionData = {
      ...transaction,
      userId,
      createdAt: Timestamp.now(),
      date: Timestamp.fromDate(new Date(transaction.date)),
    }

    const docRef = await addDoc(collection(db, "transactions"), transactionData)
    return { id: docRef.id, ...transactionData }
  } catch (error: any) {
    throw new Error(`Failed to add transaction: ${error.message}`)
  }
}

export const getTransactions = async (userId: string, startDate?: Date, endDate?: Date) => {
  try {
    let q = query(collection(db, "transactions"), where("userId", "==", userId), orderBy("date", "desc"))

    if (startDate && endDate) {
      q = query(
        collection(db, "transactions"),
        where("userId", "==", userId),
        where("date", ">=", Timestamp.fromDate(startDate)),
        where("date", "<=", Timestamp.fromDate(endDate)),
        orderBy("date", "desc"),
      )
    }

    const querySnapshot = await getDocs(q)
    const transactions: DocumentData[] = []

    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() })
    })

    return transactions
  } catch (error: any) {
    throw new Error(`Failed to get transactions: ${error.message}`)
  }
}

// Account functions
export const addAccount = async (userId: string, account: any) => {
  try {
    const accountData = {
      ...account,
      userId,
      createdAt: Timestamp.now(),
    }

    const docRef = await addDoc(collection(db, "accounts"), accountData)
    return { id: docRef.id, ...accountData }
  } catch (error: any) {
    throw new Error(`Failed to add account: ${error.message}`)
  }
}

export const getAccounts = async (userId: string) => {
  try {
    const q = query(collection(db, "accounts"), where("userId", "==", userId))

    const querySnapshot = await getDocs(q)
    const accounts: DocumentData[] = []

    querySnapshot.forEach((doc) => {
      accounts.push({ id: doc.id, ...doc.data() })
    })

    return accounts
  } catch (error: any) {
    throw new Error(`Failed to get accounts: ${error.message}`)
  }
}

// Goals functions
export const addGoal = async (userId: string, goal: any) => {
  try {
    const goalData = {
      ...goal,
      userId,
      createdAt: Timestamp.now(),
      progress: 0,
    }

    const docRef = await addDoc(collection(db, "goals"), goalData)
    return { id: docRef.id, ...goalData }
  } catch (error: any) {
    throw new Error(`Failed to add goal: ${error.message}`)
  }
}

export const getGoals = async (userId: string) => {
  try {
    const q = query(collection(db, "goals"), where("userId", "==", userId))

    const querySnapshot = await getDocs(q)
    const goals: DocumentData[] = []

    querySnapshot.forEach((doc) => {
      goals.push({ id: doc.id, ...doc.data() })
    })

    return goals
  } catch (error: any) {
    throw new Error(`Failed to get goals: ${error.message}`)
  }
}

export const updateGoal = async (goalId: string, data: any) => {
  try {
    const goalRef = doc(db, "goals", goalId)
    await updateDoc(goalRef, {
      ...data,
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error: any) {
    throw new Error(`Failed to update goal: ${error.message}`)
  }
}

export { auth, db }

