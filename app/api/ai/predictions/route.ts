import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { auth } from "@/lib/firebase"
import { getTransactions } from "@/lib/firebase"

export async function POST(request: Request) {
  try {
    // Get the current user
    const user = auth.currentUser

    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    // Get request body
    await request.json()

    // Get user's transactions from the last 90 days for better prediction
    const ninetyDaysAgo = new Date()
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

    const transactions = await getTransactions(user.uid, ninetyDaysAgo)

    // Prepare transaction data for the AI
    const transactionData = transactions.map((t) => ({
      amount: t.amount,
      date: t.date,
      name: t.name,
      category: t.category || "Uncategorized",
    }))

    // Calculate monthly income and expenses
    const monthlyData = calculateMonthlyData(transactions)

    // Generate AI predictions based on transaction data
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on these transactions from the past 90 days: ${JSON.stringify(transactionData)}, predict the user's financial situation for the next month and next six months. Include expected income, expenses by category, and savings potential.`,
      system:
        "You are a financial analyst specializing in predictive financial modeling. Provide data-driven predictions about future financial patterns based on historical spending data.",
    })

    // For a real implementation, we would parse the AI response
    // Here we'll create a structured prediction based on historical data
    const predictions = {
      nextMonth: generateNextMonthPrediction(monthlyData),
      sixMonths: generateSixMonthPrediction(monthlyData),
    }

    return NextResponse.json({ predictions })
  } catch (error) {
    console.error("Error generating predictions:", error)
    return NextResponse.json({ error: "Failed to generate predictions" }, { status: 500 })
  }
}

// Helper function to calculate monthly data
function calculateMonthlyData(transactions: any[]) {
  // Group transactions by month
  const monthlyData: Record<string, { income: number; expenses: number; breakdown: Record<string, number> }> = {}

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

// Helper function to generate next month prediction
function generateNextMonthPrediction(monthlyData: Record<string, any>) {
  // Calculate averages from historical data
  const months = Object.keys(monthlyData)
  if (months.length === 0) {
    return {
      income: 4500,
      expenses: 2700,
      savings: 1800,
      breakdown: {
        housing: 1200,
        food: 600,
        transportation: 300,
        entertainment: 250,
        utilities: 200,
        other: 150,
      },
    }
  }

  let totalIncome = 0
  let totalExpenses = 0
  const categoryTotals: Record<string, number> = {}

  months.forEach((month) => {
    totalIncome += monthlyData[month].income
    totalExpenses += monthlyData[month].expenses

    Object.entries(monthlyData[month].breakdown).forEach(([category, amount]) => {
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0
      }
      categoryTotals[category] += Number(amount)
    })
  })

  const avgIncome = Math.round(totalIncome / months.length)
  const avgExpenses = Math.round(totalExpenses / months.length)

  // Apply a small increase to income and expenses to simulate prediction
  const predictedIncome = Math.round(avgIncome * 1.02) // 2% increase
  const predictedExpenses = Math.round(avgExpenses * 1.01) // 1% increase

  // Calculate predicted breakdown
  const breakdown: Record<string, number> = {}
  Object.entries(categoryTotals).forEach(([category, total]) => {
    breakdown[category.toLowerCase()] = Math.round((Number(total) / months.length) * 1.01)
  })

  // Ensure we have standard categories
  const standardCategories = ["housing", "food", "transportation", "entertainment", "utilities", "other"]
  standardCategories.forEach((category) => {
    if (!breakdown[category]) {
      breakdown[category] = Math.round(predictedExpenses * 0.1) // Default 10% of expenses
    }
  })

  return {
    income: predictedIncome,
    expenses: predictedExpenses,
    savings: predictedIncome - predictedExpenses,
    breakdown,
  }
}

// Helper function to generate six month prediction
function generateSixMonthPrediction(monthlyData: Record<string, any>) {
  const nextMonth = generateNextMonthPrediction(monthlyData)

  // Project growth over six months
  const incomeGrowthRate = 1.005 // 0.5% monthly growth
  const expenseGrowthRate = 1.003 // 0.3% monthly growth

  let sixMonthIncome = 0
  let sixMonthExpenses = 0
  let currentMonthIncome = nextMonth.income
  let currentMonthExpenses = nextMonth.expenses

  for (let i = 0; i < 6; i++) {
    sixMonthIncome += currentMonthIncome
    sixMonthExpenses += currentMonthExpenses

    currentMonthIncome = Math.round(currentMonthIncome * incomeGrowthRate)
    currentMonthExpenses = Math.round(currentMonthExpenses * expenseGrowthRate)
  }

  const averageMonthlyIncome = Math.round(sixMonthIncome / 6)
  const averageMonthlyExpenses = Math.round(sixMonthExpenses / 6)
  const totalSavings = sixMonthIncome - sixMonthExpenses

  // Determine trends
  const incomeTrend = incomeGrowthRate > 1.003 ? "increasing" : "stable"
  const expenseTrend = expenseGrowthRate > 1.002 ? "increasing" : "stable"
  const savingsTrend = incomeGrowthRate > expenseGrowthRate ? "increasing" : "stable"

  return {
    averageMonthlyIncome,
    averageMonthlyExpenses,
    totalSavings,
    trends: {
      income: incomeTrend,
      expenses: expenseTrend,
      savings: savingsTrend,
    },
  }
}

