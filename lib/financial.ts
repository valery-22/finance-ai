export interface Account {
    id: string
    name: string
    type: string
    subtype: string | null
    balances: {
      available: number | null
      current: number
      isoCurrencyCode: string
    }
    mask: string | null
    institution: string | null
  }
  
  export interface Transaction {
    id: string
    accountId: string
    amount: number
    date: string
    name: string
    merchantName: string | null
    category: string[]
    pending: boolean
    paymentChannel: string
  }
  
  export interface Category {
    name: string
    value: number
    color?: string
  }
  
  /**
   * Get balances for all accounts
   */
  export async function getBalances(): Promise<Account[]> {
    try {
      const response = await fetch("/api/financial/balances", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch balances")
      }
  
      const data = await response.json()
      return data.accounts
    } catch (error: any) {
      console.error("Error fetching balances:", error.message)
      throw error
    }
  }
  
  /**
   * Get transactions for a date range
   */
  export async function getTransactions(startDate: string, endDate: string): Promise<Transaction[]> {
    try {
      const response = await fetch(`/api/financial/transactions?startDate=${startDate}&endDate=${endDate}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch transactions")
      }
  
      const data = await response.json()
      return data.transactions
    } catch (error: any) {
      console.error("Error fetching transactions:", error.message)
      throw error
    }
  }
  
  /**
   * Calculate total balance across all accounts
   */
  export function calculateTotalBalance(accounts: Account[]): number {
    return accounts.reduce((total, account) => {
      return total + account.balances.current
    }, 0)
  }
  
  /**
   * Group transactions by category
   */
  export function groupTransactionsByCategory(transactions: Transaction[]): Category[] {
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
  
  /**
   * Format currency for display
   */
  export function formatCurrency(amount: number, currencyCode = "USD"): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }
  
  /**
   * Format date for display
   */
  export function formatDate(dateString: string, format: "short" | "medium" | "long" = "medium"): string {
    const date = new Date(dateString)
  
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: format === "short" ? "2-digit" : "short",
      day: "2-digit",
    }
  
    if (format === "long") {
      options.weekday = "short"
    }
  
    return new Intl.DateTimeFormat("en-US", options).format(date)
  }
  
  /**
   * Calculate monthly data from transactions
   */
  export function calculateMonthlyData(transactions: Transaction[]) {
    // Group transactions by month
    const monthlyData: Record<
      string,
      {
        income: number
        expenses: number
        breakdown: Record<string, number>
      }
    > = {}
  
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
  
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          income: 0,
          expenses: 0,
          breakdown: {},
        }
      }
  
      // Negative amounts are expenses, positive are income
      if (transaction.amount < 0) {
        monthlyData[monthKey].expenses += Math.abs(transaction.amount)
  
        // Track expenses by category
        const category = transaction.category?.[0] || "Other"
        if (!monthlyData[monthKey].breakdown[category]) {
          monthlyData[monthKey].breakdown[category] = 0
        }
        monthlyData[monthKey].breakdown[category] += Math.abs(transaction.amount)
      } else {
        monthlyData[monthKey].income += transaction.amount
      }
    })
  
    return monthlyData
  }
  
  