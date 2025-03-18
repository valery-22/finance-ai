import { NextResponse } from "next/server"
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid"
import { auth } from "@/lib/firebase"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

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
    // Get the current user
    const user = auth.currentUser

    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // Get the user's Plaid items
    const itemsQuery = query(collection(db, "plaid_items"), where("userId", "==", user.uid))

    const itemsSnapshot = await getDocs(itemsQuery)

    if (itemsSnapshot.empty) {
      return NextResponse.json({ accounts: [] })
    }

    // Get accounts for each item
    const accounts = []

    for (const itemDoc of itemsSnapshot.docs) {
      const { accessToken } = itemDoc.data()

      const accountsResponse = await plaidClient.accountsGet({
        access_token: accessToken,
      })

      accounts.push(
        ...accountsResponse.data.accounts.map((account) => ({
          id: account.account_id,
          name: account.name,
          type: account.type,
          subtype: account.subtype,
          balances: account.balances,
          itemId: itemDoc.id,
        })),
      )
    }

    return NextResponse.json({ accounts })
  } catch (error) {
    console.error("Error fetching accounts:", error)
    return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 })
  }
}

