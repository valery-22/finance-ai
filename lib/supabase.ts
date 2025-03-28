import { SupabaseClient, createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "'types/database'" 

// Check if Supabase environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Flag to indicate if we're in demo mode (missing credentials)
export const isDemoMode = !supabaseUrl || !supabaseAnonKey

/**
 * Create a Supabase client
 */
export function createClient(): SupabaseClient {
  if (isDemoMode) {
    console.warn(
      "⚠️ Using mock Supabase client. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables for production use.",
    )
    return createMockClient() as unknown as SupabaseClient
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Create a mock Supabase client for development/demo purposes
function createMockClient() {
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
