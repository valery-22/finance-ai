import { NextResponse } from "next/server"
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid"
import { supabase } from "@/lib/supabase"
import { addPlaidItem, addAccount } from "@/lib/supabase"

// Initialize Plaid client
const configuration = new Configuration({
  basePath:
    PlaidEnvironments[process.env.NEXT_PUBLIC_PLAID_ENV as keyof typeof PlaidEnvironments] || PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.NEXT_PUBLIC_PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
})

const plaidClient = new PlaidApi(configuration)

export async function POST(request: Request) {
  try {
    // Get the current user from Supabase
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const { publicToken, userId } = await request.json()

    if (!publicToken || !userId) {
      return NextResponse.json({ error: "Public token and user ID are required" }, { status: 400 })
    }

    // Exchange public token for access token
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    })

    const accessToken = tokenResponse.data.access_token
    const itemId = tokenResponse.data.item_id

    // Store the access token in Supabase
    await addPlaidItem(userId, itemId, accessToken)

    // Get account information
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    })

    const accounts = accountsResponse.data.accounts

    // Store accounts in Supabase
    const savedAccounts = []
    for (const account of accounts) {
      const savedAccount = await addAccount(userId, {
        itemId,
        id: account.account_id,
        name: account.name,
        type: account.type,
        subtype: account.subtype,
        balances: account.balances,
      })
      savedAccounts.push(savedAccount)
    }

    return NextResponse.json({
      success: true,
      itemId,
      accounts: savedAccounts.map((account) => ({
        id: account.accountId,
        name: account.name,
        type: account.type,
        subtype: account.subtype,
        balances: account.balances,
      })),
    })
  } catch (error) {
    console.error("Error exchanging public token:", error)
    return NextResponse.json({ error: "Failed to exchange public token" }, { status: 500 })
  }
}

