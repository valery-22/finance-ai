import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import { categorizeTransaction } from "@/lib/csv-import"

export async function POST(request: NextRequest) {
  try {
    // Get the current user
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the transaction data from the request
    const data = await request.json()
    const { description, amount, date, category, accountId } = data

    if (!description || amount === undefined || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Auto-categorize if no category provided
    const categories = category ? [category] : categorizeTransaction(description)

    // Insert into database
    const { error } = await supabase.from("transactions").insert({
      user_id: user.id,
      name: description,
      amount: Number.parseFloat(amount),
      date: new Date(date).toISOString(),
      category: categories,
      merchant_name: description.split(" ").slice(0, 2).join(" "), // Simple merchant extraction
      pending: false,
      created_at: new Date().toISOString(),
    })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      transactionId: Date.now().toString(),
    })
  } catch (error: any) {
    console.error("Add transaction error:", error)
    return NextResponse.json({ error: error.message || "Failed to add transaction" }, { status: 500 })
  }
}

