import { Configuration, PlaidApi, PlaidEnvironments } from "plaid"

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

// Create a link token
export async function createLinkToken(userId: string) {
  try {
    const response = await fetch("/api/plaid/create-link-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      throw new Error("Failed to create link token")
    }

    const data = await response.json()
    return data.linkToken
  } catch (error) {
    console.error("Error creating link token:", error)
    throw error
  }
}

// Exchange public token for access token
export async function exchangePublicToken(publicToken: string) {
  try {
    const response = await fetch("/api/plaid/exchange-public-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicToken }),
    })

    if (!response.ok) {
      throw new Error("Failed to exchange public token")
    }

    const data = await response.json()
    return data.accessToken
  } catch (error) {
    console.error("Error exchanging public token:", error)
    throw error
  }
}

// Get accounts
export async function getAccounts() {
  try {
    const response = await fetch("/api/plaid/accounts")

    if (!response.ok) {
      throw new Error("Failed to fetch accounts")
    }

    const data = await response.json()
    return data.accounts
  } catch (error) {
    console.error("Error fetching accounts:", error)
    throw error
  }
}

// Get transactions
export async function getTransactions(startDate: string, endDate: string) {
  try {
    const response = await fetch(`/api/plaid/transactions?startDate=${startDate}&endDate=${endDate}`)

    if (!response.ok) {
      throw new Error("Failed to fetch transactions")
    }

    const data = await response.json()
    return data.transactions
  } catch (error) {
    console.error("Error fetching transactions:", error)
    throw error
  }
}

// Get account balances
export async function getBalances() {
  try {
    const response = await fetch("/api/plaid/balances")

    if (!response.ok) {
      throw new Error("Failed to fetch balances")
    }

    const data = await response.json()
    return data.accounts
  } catch (error) {
    console.error("Error fetching balances:", error)
    throw error
  }
}

// Format currency
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Format date
export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

// Calculate total balance
export function calculateTotalBalance(accounts: any[]) {
  return accounts.reduce((total, account) => {
    return total + account.balances.current
  }, 0)
}

// Group transactions by category
export function groupTransactionsByCategory(transactions: any[]) {
  const categories: Record<string, number> = {}

  transactions.forEach((transaction) => {
    const category = transaction.category[0] || "Other"
    if (!categories[category]) {
      categories[category] = 0
    }
    categories[category] += Math.abs(transaction.amount)
  })

  return Object.entries(categories).map(([name, value]) => ({ name, value }))
}

