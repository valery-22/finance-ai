import { createClient } from "@supabase/supabase-js"

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Type for the Supabase client
export type TypedSupabaseClient = ReturnType<typeof createTypedSupabaseClient>

/**
 * Creates a typed Supabase client
 */
function createTypedSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing, using mock client")
    return createMockClient()
  }

  // Create the Supabase client without generic type arguments
  return createClient(supabaseUrl, supabaseAnonKey)
}

/**
 * Creates a mock Supabase client for development/demo mode
 */
function createMockClient() {
  // Simple mock implementation that logs operations
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          order: () => ({
            limit: () => ({
              range: () => ({
                data: [],
                error: null,
              }),
            }),
          }),
        }),
        data: [],
        error: null,
      }),
      insert: () => ({ data: null, error: null }),
      update: () => ({
        eq: () => ({ data: null, error: null }),
      }),
      delete: () => ({
        eq: () => ({ data: null, error: null }),
      }),
    }),
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
  } as unknown as ReturnType<typeof createClient>
}

// Create a singleton instance of the Supabase client
const supabase = createTypedSupabaseClient()

export { supabase }

/**
 * Helper functions for common Supabase operations
 */

// Fetch user profile
export async function fetchUserProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

// Fetch user accounts
export async function fetchUserAccounts(userId: string) {
  const { data, error } = await supabase.from("accounts").select("*").eq("user_id", userId)

  if (error) {
    console.error("Error fetching accounts:", error)
    return []
  }

  return data
}

// Fetch user transactions with optional filters
export async function fetchUserTransactions(
  userId: string,
  limit = 50,
  startDate?: string,
  endDate?: string,
  category?: string,
) {
  let query = supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(limit)

  if (startDate) {
    query = query.gte("date", startDate)
  }

  if (endDate) {
    query = query.lte("date", endDate)
  }

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching transactions:", error)
    return []
  }

  return data
}

// Fetch user goals
export async function fetchUserGoals(userId: string) {
  const { data, error } = await supabase.from("goals").select("*").eq("user_id", userId)

  if (error) {
    console.error("Error fetching goals:", error)
    return []
  }

  return data
}

// Update user profile
export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId)

  if (error) {
    console.error("Error updating profile:", error)
    return false
  }

  return true
}

// Create a new transaction
export async function createTransaction(transaction: any) {
  const { data, error } = await supabase.from("transactions").insert(transaction)

  if (error) {
    console.error("Error creating transaction:", error)
    return false
  }

  return true
}

// Update a transaction
export async function updateTransaction(transactionId: string, updates: any) {
  const { data, error } = await supabase.from("transactions").update(updates).eq("id", transactionId)

  if (error) {
    console.error("Error updating transaction:", error)
    return false
  }

  return true
}

// Delete a transaction
export async function deleteTransaction(transactionId: string) {
  const { data, error } = await supabase.from("transactions").delete().eq("id", transactionId)

  if (error) {
    console.error("Error deleting transaction:", error)
    return false
  }

  return true
}

// Create a new account
export async function createAccount(account: any) {
  const { data, error } = await supabase.from("accounts").insert(account)

  if (error) {
    console.error("Error creating account:", error)
    return false
  }

  return true
}

// Update an account
export async function updateAccount(accountId: string, updates: any) {
  const { data, error } = await supabase.from("accounts").update(updates).eq("id", accountId)

  if (error) {
    console.error("Error updating account:", error)
    return false
  }

  return true
}

// Delete an account
export async function deleteAccount(accountId: string) {
  const { data, error } = await supabase.from("accounts").delete().eq("id", accountId)

  if (error) {
    console.error("Error deleting account:", error)
    return false
  }

  return true
}

// Upload a file to Supabase Storage
export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file)

  if (error) {
    console.error("Error uploading file:", error)
    return null
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path)

  return urlData.publicUrl
}

