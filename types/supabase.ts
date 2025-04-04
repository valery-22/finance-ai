export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          email: string | null
          has_plaid_connection: boolean
          created_at: string
          updated_at: string | null
          avatar_url: string | null
          subscription_tier: string | null
          subscription_status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          has_plaid_connection?: boolean
          created_at?: string
          updated_at?: string | null
          avatar_url?: string | null
          subscription_tier?: string | null
          subscription_status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          has_plaid_connection?: boolean
          created_at?: string
          updated_at?: string | null
          avatar_url?: string | null
          subscription_tier?: string | null
          subscription_status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          name: string
          amount: number
          date: string
          category: string[] | null
          merchant_name: string | null
          pending: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          amount: number
          date: string
          category?: string[] | null
          merchant_name?: string | null
          pending?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          amount?: number
          date?: string
          category?: string[] | null
          merchant_name?: string | null
          pending?: boolean
          created_at?: string
        }
      }
      accounts: {
        Row: {
          id: string
          user_id: string
          item_id: string
          account_id: string
          name: string
          type: string
          subtype: string | null
          balance_available: number | null
          balance_current: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          item_id: string
          account_id: string
          name: string
          type: string
          subtype?: string | null
          balance_available?: number | null
          balance_current: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          item_id?: string
          account_id?: string
          name?: string
          type?: string
          subtype?: string | null
          balance_available?: number | null
          balance_current?: number
          created_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          target: number
          current: number
          color: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          target: number
          current?: number
          color?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          target?: number
          current?: number
          color?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      plaid_items: {
        Row: {
          id: string
          user_id: string
          item_id: string
          access_token: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          item_id: string
          access_token: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          item_id?: string
          access_token?: string
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_subscription_id: string
          stripe_customer_id: string
          status: string
          tier: string
          current_period_start: string
          current_period_end: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          stripe_subscription_id: string
          stripe_customer_id: string
          status: string
          tier: string
          current_period_start: string
          current_period_end: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          stripe_subscription_id?: string
          stripe_customer_id?: string
          status?: string
          tier?: string
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export interface Profile {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  avatar_url?: string
  subscription?: "free" | "premium" | "business"
  subscriptionStatus?: "active" | "trialing" | "past_due" | "canceled" | "incomplete"
  stripe_customer_id?: string
  created_at?: string
  updated_at?: string
}

export interface Transaction {
  id: string
  user_id: string
  account_id: string
  date: string
  amount: number
  description: string
  category?: string
  subcategory?: string
  pending: boolean
  created_at: string
}

export interface Account {
  id: string
  user_id: string
  plaid_account_id: string
  plaid_item_id: string
  name: string
  official_name?: string
  type: string
  subtype?: string
  balance: number
  created_at: string
}

export interface Item {
  id: string
  user_id: string
  plaid_item_id: string
  institution_name: string
  status: "active" | "error" | "pending"
  error?: string
  created_at: string
}

