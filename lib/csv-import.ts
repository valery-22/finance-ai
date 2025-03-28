import Papa from "papaparse"

// Move this function to the top of the file
function categorizeTransaction(description: string): string[] {
  const lowerDesc = description.toLowerCase()

  // Simple keyword-based categorization
  if (lowerDesc.includes("grocery") || lowerDesc.includes("food") || lowerDesc.includes("restaurant")) {
    return ["Food & Dining"]
  }

  if (lowerDesc.includes("gas") || lowerDesc.includes("uber") || lowerDesc.includes("lyft")) {
    return ["Transportation"]
  }

  if (lowerDesc.includes("netflix") || lowerDesc.includes("spotify") || lowerDesc.includes("subscription")) {
    return ["Entertainment", "Subscriptions"]
  }

  if (lowerDesc.includes("salary") || lowerDesc.includes("deposit") || lowerDesc.includes("payroll")) {
    return ["Income"]
  }

  if (lowerDesc.includes("rent") || lowerDesc.includes("mortgage") || lowerDesc.includes("housing")) {
    return ["Housing"]
  }

  // Default category
  return ["Uncategorized"]
}

// Define the expected CSV format for transactions
export interface TransactionCSVRow {
  date: string
  description: string
  amount: string
  category?: string
  [key: string]: any // Allow for additional fields
}

// Define the expected CSV format for accounts
export interface AccountCSVRow {
  name: string
  type: string
  subtype?: string
  balance: string
  [key: string]: any // Allow for additional fields
}

/**
 * Parse a CSV file containing transactions
 */
export function parseTransactionsCSV(csvContent: string): Promise<TransactionCSVRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing error: ${results.errors[0].message}`))
          return
        }

        // Validate required fields
        const data = results.data as TransactionCSVRow[]
        const missingFields = data.some((row) => !row.date || !row.description || row.amount === undefined)

        if (missingFields) {
          reject(new Error("CSV file is missing required fields (date, description, amount)"))
          return
        }

        resolve(data)
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`))
      },
    })
  })
}

/**
 * Parse a CSV file containing account information
 */
export function parseAccountsCSV(csvContent: string): Promise<AccountCSVRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing error: ${results.errors[0].message}`))
          return
        }

        // Validate required fields
        const data = results.data as AccountCSVRow[]
        const missingFields = data.some((row) => !row.name || !row.type || row.balance === undefined)

        if (missingFields) {
          reject(new Error("CSV file is missing required fields (name, type, balance)"))
          return
        }

        resolve(data)
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`))
      },
    })
  })
}

/**
 * Generate a sample transactions CSV template
 */
export function generateTransactionsTemplate(): string {
  const headers = ["date", "description", "amount", "category"]
  const sampleRows = [
    ["2023-01-15", "Grocery Store", "-120.50", "Food & Dining"],
    ["2023-01-16", "Salary Deposit", "2000.00", "Income"],
    ["2023-01-18", "Gas Station", "-45.00", "Transportation"],
  ]

  return Papa.unparse({
    fields: headers,
    data: sampleRows,
  })
}

/**
 * Generate a sample accounts CSV template
 */
export function generateAccountsTemplate(): string {
  const headers = ["name", "type", "subtype", "balance"]
  const sampleRows = [
    ["Checking Account", "depository", "checking", "5000.00"],
    ["Savings Account", "depository", "savings", "10000.00"],
    ["Credit Card", "credit", "", "-500.00"],
  ]

  return Papa.unparse({
    fields: headers,
    data: sampleRows,
  })
}

/**
 * Map CSV transaction data to our database format
 */
export function mapTransactionFromCSV(row: TransactionCSVRow, userId: string): any {
  // Parse amount and convert to cents
  const amount = Number.parseFloat(row.amount)

  // Generate categories array
  const categories = row.category ? [row.category] : []

  return {
    user_id: userId,
    name: row.description,
    amount: amount,
    date: new Date(row.date).toISOString(),
    category: categories,
    merchant_name: extractMerchantName(row.description),
    pending: false,
    created_at: new Date().toISOString(),
  }
}

/**
 * Map CSV account data to our database format
 */
export function mapAccountFromCSV(row: AccountCSVRow, userId: string): any {
  // Parse balance and convert to cents if needed
  const balance = Number.parseFloat(row.balance)

  // Generate a unique account ID
  const accountId = `manual-${Date.now()}-${Math.floor(Math.random() * 1000)}`

  return {
    user_id: userId,
    item_id: "manual-import",
    account_id: accountId,
    name: row.name,
    type: row.type,
    subtype: row.subtype || null,
    balance_available: balance,
    balance_current: balance,
    created_at: new Date().toISOString(),
  }
}

/**
 * Extract merchant name from transaction description
 */
function extractMerchantName(description: string): string {
  // Simple extraction - take the first few words
  const words = description.split(" ")
  return words.slice(0, Math.min(3, words.length)).join(" ")
}

// Then export it at the end of the file
export { categorizeTransaction };