import { NextResponse } from "next/server"
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid"
import { supabase } from "@/lib/supabase"
import { getPlaidItems } from "@/lib/supabase"

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

export async function GET(request: Request) {
  try {
    // Get the current user from Supabase
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // Get query parameters
    const url = new URL(request.url)
    const startDate =
      url.searchParams.get("startDate") || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    const endDate = url.searchParams.get("endDate") || new Date().toISOString().split("T")[0]

    // Get the user's Plaid items
    const plaidItems = await getPlaidItems(user.id)

    if (plaidItems.length === 0) {
      return NextResponse.json({ transactions: [] })
    }

    // Get transactions for each item
    const allTransactions = []

    for (const item of plaidItems) {
      const accessToken = item.access_token

      const transactionsResponse = await plaidClient.transactionsGet({
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate,
      })

      allTransactions.push(
        ...transactionsResponse.data.transactions.map((transaction) => ({
          id: transaction.transaction_id,
          accountId: transaction.account_id,
          name: transaction.name,
          amount: transaction.amount,
          date: transaction.date,
          category: transaction.category || [],
          categoryId: transaction.category_id,
          pending: transaction.pending,
          merchantName: transaction.merchant_name,
          paymentChannel: transaction.payment_channel,
          itemId: item.item_id,
        })),
      )
    }

    // Sort transactions by date (newest first)
    allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json({ transactions: allTransactions })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

