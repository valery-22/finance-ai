import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Get financial recommendations
export async function getFinancialRecommendations(userData: any) {
  try {
    const response = await fetch("/api/ai/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userData }),
    })

    if (!response.ok) {
      throw new Error("Failed to get recommendations")
    }

    const data = await response.json()
    return data.recommendations
  } catch (error) {
    console.error("Error getting recommendations:", error)
    throw error
  }
}

// Get financial predictions
export async function getFinancialPredictions(userData: any) {
  try {
    const response = await fetch("/api/ai/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userData }),
    })

    if (!response.ok) {
      throw new Error("Failed to get predictions")
    }

    const data = await response.json()
    return data.predictions
  } catch (error) {
    console.error("Error getting predictions:", error)
    throw error
  }
}

// Generate savings tips based on transaction data
export async function generateSavingsTips(transactions: any[]) {
  try {
    // Prepare transaction data for the AI
    const transactionSummary = transactions.map((t) => ({
      amount: t.amount,
      date: t.date,
      name: t.name,
      category: t.category,
    }))

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on these recent transactions: ${JSON.stringify(transactionSummary)}, provide 3 specific, actionable savings tips. Format each tip with a title and brief explanation.`,
      system:
        "You are a financial advisor specializing in personal finance optimization. Provide concise, practical advice for saving money based on spending patterns.",
    })

    // Parse the response into structured tips
    const tips = text
      .split("\n\n")
      .filter((tip) => tip.trim().length > 0)
      .map((tip, index) => {
        const lines = tip.split("\n")
        const title = lines[0].replace(/^\d+\.\s*/, "").trim()
        const description = lines.slice(1).join(" ").trim()

        return {
          id: `tip-${index + 1}`,
          title,
          description,
          color: ["yellow", "purple", "green", "blue"][index % 4],
        }
      })

    return tips
  } catch (error) {
    console.error("Error generating savings tips:", error)
    throw error
  }
}

// Generate budget recommendations
export async function generateBudgetRecommendations(income: number, expenses: any) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on a monthly income of $${income} and these expense categories: ${JSON.stringify(expenses)}, recommend an optimal budget allocation following the 50/30/20 rule (50% needs, 30% wants, 20% savings). Provide specific dollar amounts for each category.`,
      system:
        "You are a financial planner specializing in budget optimization. Provide practical budget allocations based on income and current spending patterns.",
    })

    return text
  } catch (error) {
    console.error("Error generating budget recommendations:", error)
    throw error
  }
}

// Analyze spending patterns
export async function analyzeSpendingPatterns(transactions: any[], timeframe = "month") {
  try {
    // Prepare transaction data for the AI
    const transactionSummary = transactions.map((t) => ({
      amount: t.amount,
      date: t.date,
      name: t.name,
      category: t.category,
    }))

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Analyze these transactions over the past ${timeframe}: ${JSON.stringify(transactionSummary)}. Identify spending patterns, unusual expenses, and potential areas for saving. Provide a concise summary with 3-4 key insights.`,
      system:
        "You are a financial analyst specializing in personal spending patterns. Provide clear, data-driven insights about spending behaviors.",
    })

    return text
  } catch (error) {
    console.error("Error analyzing spending patterns:", error)
    throw error
  }
}

