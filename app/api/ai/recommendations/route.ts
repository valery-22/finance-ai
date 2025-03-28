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
    const { userData } = await request.json()

    // Get user's transactions from the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const transactions = await getTransactions(user.uid, thirtyDaysAgo)

    // Prepare transaction data for the AI
    const transactionData = transactions.map((t) => ({
      amount: t.amount,
      date: t.date,
      name: t.name,
      category: t.category || "Uncategorized",
    }))

    // Generate AI recommendations based on transaction data
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on these recent transactions: ${JSON.stringify(transactionData)}, provide 3 specific, actionable financial recommendations. Format each recommendation with a title and brief explanation.`,
      system:
        "You are a financial advisor specializing in personal finance optimization. Provide concise, practical advice for saving money and improving financial health based on spending patterns.",
    })

    // Parse the response into structured recommendations
    const recommendations = text
      .split("\n\n")
      .filter((rec) => rec.trim().length > 0)
      .map((rec, index) => {
        const lines = rec.split("\n")
        const title = lines[0].replace(/^\d+\.\s*/, "").trim()
        const description = lines.slice(1).join(" ").trim()

        return {
          id: `rec-${index + 1}`,
          title,
          description,
          color: ["yellow", "purple", "green", "blue"][index % 4],
          potentialSavings: estimateSavings(title, description, transactionData),
          category: determineCategory(title, description),
        }
      })

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}

// Helper function to estimate potential savings
function estimateSavings(title: string, description: string, transactions: any[]) {
  // This is a simplified estimation logic
  // In a real implementation, you would use more sophisticated analysis

  if (description.includes("subscription")) {
    return Math.floor(Math.random() * 30) + 10 // $10-40 for subscription-related tips
  } else if (description.includes("grocery") || description.includes("food")) {
    return Math.floor(Math.random() * 80) + 40 // $40-120 for food-related tips
  } else if (description.includes("emergency fund") || description.includes("saving")) {
    return 0 // No direct savings for saving recommendations
  } else {
    return Math.floor(Math.random() * 50) + 20 // $20-70 for other recommendations
  }
}

// Helper function to determine category
function determineCategory(title: string, description: string) {
  const text = (title + " " + description).toLowerCase()

  if (text.includes("subscription") || text.includes("service")) {
    return "subscriptions"
  } else if (text.includes("grocery") || text.includes("food") || text.includes("restaurant")) {
    return "food"
  } else if (text.includes("emergency fund") || text.includes("saving")) {
    return "savings"
  } else if (text.includes("bill") || text.includes("utility")) {
    return "bills"
  } else {
    return "general"
  }
}


