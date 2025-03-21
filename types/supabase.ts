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
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          has_plaid_connection?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          has_plaid_connection?: boolean
          created_at?: string
          updated_at?: string | null
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

