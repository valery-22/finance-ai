import { SupabaseClient, createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// Check if Supabase environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Flag to indicate if we're in demo mode (missing credentials)
export const isDemoMode = !supabaseUrl || !supabaseAnonKey

/**
 * Create a Supabase client
 * This function will return a real client if credentials are available,
 * or a mock client if they are missing
 */
export function createClient<T = Database>(): SupabaseClient<T> {
  if (isDemoMode) {
    console.warn(
      "⚠️ Using mock Supabase client. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables for production use.",
    )
    return createMockClient<T>() as unknown as SupabaseClient<T>
  }

  return createSupabaseClient<T>(supabaseUrl!, supabaseAnonKey!)
}

// Create a mock Supabase client for development/demo purposes
function createMockClient<T>() {
  // Mock user data
  const mockUser = {
    id: "mock-user-id",
    email: "demo@example.com",
    user_metadata: {
      first_name: "Demo",
      last_name: "User",
    },
  }

  // Mock profile data
  const mockProfile = {
    id: "mock-user-id",
    first_name: "Demo",
    last_name: "User",
    email: "demo@example.com",
    has_plaid_connection: true,
    created_at: new Date().toISOString(),
  }

  // Mock transactions data
  const mockTransactions = [
    {
      id: "tx1",
      user_id: "mock-user-id",
      name: "Starbucks",
      amount: -4.85,
      date: new Date().toISOString(),
      category: ["Food & Drink"],
      merchant_name: "Starbucks",
      pending: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "tx2",
      user_id: "mock-user-id",
      name: "Amazon",
      amount: -32.99,
      date: new Date(Date.now() - 86400000).toISOString(),
      category: ["Shopping"],
      merchant_name: "Amazon",
      pending: false,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "tx3",
      user_id: "mock-user-id",
      name: "Salary Deposit",
      amount: 2250.0,
      date: new Date(Date.now() - 3 * 86400000).toISOString(),
      category: ["Income"],
      merchant_name: "Employer",
      pending: false,
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
  ]

  // Mock accounts data
  const mockAccounts = [
    {
      id: "acc1",
      user_id: "mock-user-id",
      item_id: "item1",
      account_id: "account1",
      name: "Checking Account",
      type: "depository",
      subtype: "checking",
      balance_available: 9580,
      balance_current: 9580,
      created_at: new Date().toISOString(),
    },
    {
      id: "acc2",
      user_id: "mock-user-id",
      item_id: "item1",
      account_id: "account2",
      name: "Savings Account",
      type: "depository",
      subtype: "savings",
      balance_available: 3000,
      balance_current: 3000,
      created_at: new Date().toISOString(),
    },
  ]

  // Mock goals data
  const mockGoals = [
    {
      id: "goal1",
      user_id: "mock-user-id",
      title: "Emergency Fund",
      target: 15000,
      current: 8500,
      color: "purple",
      created_at: new Date().toISOString(),
    },
    {
      id: "goal2",
      user_id: "mock-user-id",
      title: "Vacation",
      target: 5000,
      current: 2300,
      color: "blue",
      created_at: new Date().toISOString(),
    },
  ]

  // Mock plaid_items data
  const mockPlaidItems = [
    {
      id: "item1",
      user_id: "mock-user-id",
      item_id: "plaid_item_id",
      access_token: "mock_access_token",
      created_at: new Date().toISOString(),
    },
  ]

  // Return a mock client with the necessary methods
  return {
    auth: {
      getSession: async () => ({ data: { session: { user: mockUser } }, error: null }),
      getUser: async () => ({ data: { user: mockUser }, error: null }),
      signUp: async () => ({ data: { user: mockUser }, error: null }),
      signInWithPassword: async () => ({ data: { user: mockUser, session: {} }, error: null }),
      signOut: async () => ({ error: null }),
      resetPasswordForEmail: async () => ({ error: null }),
      updateUser: async () => ({ data: { user: mockUser }, error: null }),
    },
    from: (table: string) => ({
      select: (columns = "*") => ({
        eq: (column: string, value: any) => ({
          single: async () => {
            if (table === "profiles" && column === "id" && value === "mock-user-id") {
              return { data: mockProfile, error: null }
            }
            return { data: null, error: null }
          },
          limit: (limit: number) => ({
            order: (column: string, { ascending = true } = {}) => {
              if (table === "transactions" && column === "user_id" && value === "mock-user-id") {
                return { data: mockTransactions.slice(0, limit), error: null }
              }
              if (table === "accounts" && column === "user_id" && value === "mock-user-id") {
                return { data: mockAccounts.slice(0, limit), error: null }
              }
              if (table === "goals" && column === "user_id" && value === "mock-user-id") {
                return { data: mockGoals.slice(0, limit), error: null }
              }
              if (table === "plaid_items" && column === "user_id" && value === "mock-user-id") {
                return { data: mockPlaidItems.slice(0, limit), error: null }
              }
              return { data: [], error: null }
            },
          }),
        }),
        gte: (column: string, value: any) => ({
          lte: (column: string, value: any) => ({
            order: (column: string, { ascending = true } = {}) => {
              if (table === "transactions") {
                return { data: mockTransactions, error: null }
              }
              return { data: [], error: null }
            },
          }),
        }),
        limit: (limit: number) => ({
          order: (column: string, { ascending = true } = {}) => {
            if (table === "transactions") {
              return { data: mockTransactions.slice(0, limit), error: null }
            }
            if (table === "accounts") {
              return { data: mockAccounts.slice(0, limit), error: null }
            }
            if (table === "goals") {
              return { data: mockGoals.slice(0, limit), error: null }
            }
            return { data: [], error: null }
          },
        }),
        order: (column: string, { ascending = true } = {}) => {
          if (table === "transactions") {
            return { data: mockTransactions, error: null }
          }
          if (table === "accounts") {
            return { data: mockAccounts, error: null }
          }
          if (table === "goals") {
            return { data: mockGoals, error: null }
          }
          return { data: [], error: null }
        },
      }),
      insert: (data: any) => ({
        select: (columns = "*") => {
          if (table === "profiles") {
            return { data: [mockProfile], error: null }
          }
          if (table === "transactions") {
            return { data: [mockTransactions[0]], error: null }
          }
          if (table === "accounts") {
            return { data: [mockAccounts[0]], error: null }
          }
          if (table === "goals") {
            return { data: [mockGoals[0]], error: null }
          }
          if (table === "plaid_items") {
            return { data: [mockPlaidItems[0]], error: null }
          }
          return { data: [data], error: null }
        },
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          select: (columns = "*") => {
            if (table === "profiles" && column === "id" && value === "mock-user-id") {
              return { data: [{ ...mockProfile, ...data }], error: null }
            }
            if (table === "goals" && column === "id") {
              const updatedGoal = mockGoals.find((goal) => goal.id === value)
              if (updatedGoal) {
                return { data: [{ ...updatedGoal, ...data }], error: null }
              }
            }
            return { data: [], error: null }
          },
        }),
      }),
      delete: () => ({
        eq: (column: string, value: any) => {
          return { error: null }
        },
      }),
    }),
    storage: {
      from: (bucket: string) => ({
        upload: async (path: string, file: any) => ({ data: { path }, error: null }),
        getPublicUrl: (path: string) => ({ data: { publicUrl: "/placeholder.svg" } }),
      }),
    },
  } as unknown as ReturnType<typeof createClient<T>>
}

// Initialize the Supabase client
const supabase = isDemoMode
  ? createMockClient<Database>()
  : createSupabaseClient<Database>(supabaseUrl!, supabaseAnonKey!)

export { supabase }

// Type definitions for user profile
export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  hasPlaidConnection: boolean
  createdAt: string
  updatedAt?: string
  subscription?: string
  subscriptionStatus?: string
}

/**
 * Get transactions for a user
 */
export async function getTransactions(userId: string, startDate?: Date, endDate?: Date) {
  try {
    let query = supabase.from("transactions").select("*").eq("user_id", userId).order("date", { ascending: false })

    if (startDate) {
      query = query.gte("date", startDate.toISOString())
    }

    if (endDate) {
      query = query.lte("date", endDate.toISOString())
    }

    const { data, error } = await query

    if (error) throw error

    // Transform to match the expected format
    return data.map((transaction) => ({
      id: transaction.id,
      userId: transaction.user_id,
      name: transaction.name,
      amount: transaction.amount,
      date: transaction.date,
      category: transaction.category || [],
      merchantName: transaction.merchant_name,
      pending: transaction.pending,
      createdAt: transaction.created_at,
    }))
  } catch (error: any) {
    console.error("Get transactions error:", error.message)
    throw new Error(`Failed to get transactions: ${error.message}`)
  }
}

/**
 * Get accounts for a user
 */
export async function getAccounts(userId: string) {
  try {
    const { data, error } = await supabase.from("accounts").select("*").eq("user_id", userId)

    if (error) throw error

    // Transform to match the expected format
    return data.map((account) => ({
      id: account.id,
      userId: account.user_id,
      itemId: account.item_id,
      accountId: account.account_id,
      name: account.name,
      type: account.type,
      subtype: account.subtype,
      balances: {
        available: account.balance_available,
        current: account.balance_current,
      },
      createdAt: account.created_at,
    }))
  } catch (error: any) {
    console.error("Get accounts error:", error.message)
    throw new Error(`Failed to get accounts: ${error.message}`)
  }
}

/**
 * Get goals for a user
 */
export async function getGoals(userId: string) {
  try {
    const { data, error } = await supabase.from("goals").select("*").eq("user_id", userId)

    if (error) throw error

    // Transform to match the expected format
    return data.map((goal) => ({
      id: goal.id,
      userId: goal.user_id,
      title: goal.title,
      target: goal.target,
      current: goal.current,
      color: goal.color,
      createdAt: goal.created_at,
    }))
  } catch (error: any) {
    console.error("Get goals error:", error.message)
    throw new Error(`Failed to get goals: ${error.message}`)
  }
}

/**
 * Get plaid items for a user
 */
export async function getPlaidItems(userId: string) {
  try {
    const { data, error } = await supabase.from("plaid_items").select("*").eq("user_id", userId)

    if (error) throw error

    // Transform to match the expected format
    return data.map((item) => ({
      id: item.id,
      userId: item.user_id,
      itemId: item.item_id,
      accessToken: item.access_token,
      createdAt: item.created_at,
    }))
  } catch (error: any) {
    console.error("Get plaid items error:", error.message)
    throw new Error(`Failed to get plaid items: ${error.message}`)
  }
}

/**
 * Add a plaid item for a user
 */
export async function addPlaidItem(userId: string, itemId: string, accessToken: string) {
  try {
    const { data, error } = await supabase
      .from("plaid_items")
      .insert({
        user_id: userId,
        item_id: itemId,
        access_token: accessToken,
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) throw error
    return data[0]
  } catch (error: any) {
    console.error("Add plaid item error:", error.message)
    throw new Error(`Failed to add plaid item: ${error.message}`)
  }
}

/**
 * Add an account for a user
 */
export async function addAccount(userId: string, account: any) {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .insert({
        user_id: userId,
        item_id: account.itemId,
        account_id: account.id,
        name: account.name,
        type: account.type,
        subtype: account.subtype,
        balance_available: account.balances.available,
        balance_current: account.balances.current,
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) throw error
    return data[0]
  } catch (error: any) {
    console.error("Add account error:", error.message)
    throw new Error(`Failed to add account: ${error.message}`)
  }
}