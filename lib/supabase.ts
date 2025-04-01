import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Type for the Supabase client
export type TypedSupabaseClient = ReturnType<typeof createTypedSupabaseClient>;

// Define types for our data structures
type Profile = Record<string, unknown>;
type Account = Record<string, unknown>;
type Transaction = Record<string, unknown>;
type Goal = Record<string, unknown>;

/**
 * Creates a typed Supabase client
 */
function createTypedSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing, using mock client');
    return createMockClient();
  }
  
  // Create the Supabase client
  return createClient(supabaseUrl, supabaseAnonKey);
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
    from: (_tableName: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          order: () => ({
            limit: () => ({
              range: () => ({
                data: [],
                error: null
              })
            })
          })
        }),
        data: [],
        error: null
      }),
      insert: () => ({ data: null, error: null }),
      update: () => ({
        eq: () => ({ data: null, error: null })
      }),
      delete: () => ({
        eq: () => ({ data: null, error: null })
      })
    }),
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicURL: '' } })
      })
    }
  } as unknown as ReturnType<typeof createClient>;
}

// Create a singleton instance of the Supabase client
const supabase = createTypedSupabaseClient();

export { supabase };

/**
 * Helper functions for common Supabase operations
 */

// Fetch user profile
export async function fetchUserProfile(userId: string): Promise<Profile | null> {
  const response = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (response.error) {
    console.error('Error fetching user profile:', response.error);
    return null;
  }
  
  return response.data;
}

// Fetch user accounts
export async function fetchUserAccounts(userId: string): Promise<Account[]> {
  const response = await supabase
    .from('accounts')
    .select('*')
    .eq('user_id', userId);
  
  if (response.error) {
    console.error('Error fetching accounts:', response.error);
    return [];
  }
  
  return response.data || [];
}

// Fetch user transactions with optional filters
export async function fetchUserTransactions(
  userId: string, 
  limit = 50, 
  startDate?: string, 
  endDate?: string,
  category?: string
): Promise<Transaction[]> {
  let query = supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit);
  
  if (startDate) {
    query = query.gte('date', startDate);
  }
  
  if (endDate) {
    query = query.lte('date', endDate);
  }
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const response = await query;
  
  if (response.error) {
    console.error('Error fetching transactions:', response.error);
    return [];
  }
  
  return response.data || [];
}

// Fetch user goals
export async function fetchUserGoals(userId: string): Promise<Goal[]> {
  const response = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', userId);
  
  if (response.error) {
    console.error('Error fetching goals:', response.error);
    return [];
  }
  
  return response.data || [];
}

// Update user profile
export async function updateUserProfile(userId: string, updates: Record<string, unknown>): Promise<boolean> {
  const response = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  
  if (response.error) {
    console.error('Error updating profile:', response.error);
    return false;
  }
  
  return true;
}

// Create a new transaction
export async function createTransaction(transaction: Record<string, unknown>): Promise<boolean> {
  const response = await supabase
    .from('transactions')
    .insert(transaction);
  
  if (response.error) {
    console.error('Error creating transaction:', response.error);
    return false;
  }
  
  return true;
}

// Update a transaction
export async function updateTransaction(transactionId: string, updates: Record<string, unknown>): Promise<boolean> {
  const response = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', transactionId);
  
  if (response.error) {
    console.error('Error updating transaction:', response.error);
    return false;
  }
  
  return true;
}

// Delete a transaction
export async function deleteTransaction(transactionId: string): Promise<boolean> {
  const response = await supabase
    .from('transactions')
    .delete()
    .eq('id', transactionId);
  
  if (response.error) {
    console.error('Error deleting transaction:', response.error);
    return false;
  }
  
  return true;
}

// Create a new account
export async function createAccount(account: Record<string, unknown>): Promise<boolean> {
  const response = await supabase
    .from('accounts')
    .insert(account);
  
  if (response.error) {
    console.error('Error creating account:', response.error);
    return false;
  }
  
  return true;
}

// Update an account
export async function updateAccount(accountId: string, updates: Record<string, unknown>): Promise<boolean> {
  const response = await supabase
    .from('accounts')
    .update(updates)
    .eq('id', accountId);
  
  if (response.error) {
    console.error('Error updating account:', response.error);
    return false;
  }
  
  return true;
}

// Delete an account
export async function deleteAccount(accountId: string): Promise<boolean> {
  const response = await supabase
    .from('accounts')
    .delete()
    .eq('id', accountId);
  
  if (response.error) {
    console.error('Error deleting account:', response.error);
    return false;
  }
  
  return true;
}

// Upload a file to Supabase Storage
export async function uploadFile(bucketName: string, path: string, file: File): Promise<string | null> {
  const uploadResponse = await supabase.storage
    .from(bucketName)
    .upload(path, file);
  
  if (uploadResponse.error) {
    console.error('Error uploading file:', uploadResponse.error);
    return null;
  }
  
  const urlResponse = supabase.storage
    .from(bucketName)
    .getPublicUrl(path);
  
  // Make sure we're using the correct property name (publicURL not publicUrl)
  return urlResponse.data.publicURL;
}