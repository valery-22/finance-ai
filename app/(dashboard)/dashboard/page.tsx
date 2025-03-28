"use client"

import { useState } from "react"
import { Plus, ArrowUpRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

import { MetricsOverview } from "@/components/dashboard/metrics-overview"
import { ExpenseBreakdown } from "@/components/dashboard/expense-breakdown"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { FinancialGoals } from "@/components/dashboard/financial-goals"
import { BudgetProgress } from "@/components/dashboard/budget-progress"
import { InsightCard } from "@/components/dashboard/insight-card"
import { AddWidgetDialog } from "@/components/dashboard/add-widget-dialog"
import { ConnectBankSection } from "@/components/dashboard/connect-bank-section"

import { useFinancialData } from "@/hooks/use-financial-data"

export default function DashboardPage() {
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Use our custom hook for financial data
  const {
    isConnected,
    isLoadingFinancialData,
    accounts,
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    savingsRate,
    transactions,
    error: financialError,
    isDemoMode,
  } = useFinancialData()

  // No bank connection yet, show connect bank UI
  if (!isConnected) {
    return <ConnectBankSection onConnect={() => window.location.reload()} />
  }

  const insights = [
    {
      title: "Spending Insight",
      description: "Your restaurant spending is 15% higher than last month. Consider adjusting your dining budget.",
      type: "warning",
      action: "View Details",
    },
    {
      title: "Savings Opportunity",
      description: "You could save $45/month by consolidating your subscription services.",
      type: "success",
      action: "See How",
    },
    {
      title: "Bill Reminder",
      description: "Your electricity bill of $89.50 is due in 3 days.",
      type: "info",
      action: "Pay Now",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Here's an overview of your finances.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsAddWidgetOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Widget
          </Button>
          <Button>
            <ArrowUpRight className="mr-2 h-4 w-4" /> Financial Report
          </Button>
        </div>
      </div>

      {isDemoMode && (
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Demo Mode Active</h3>
              <div className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                You're viewing sample data. Connect your bank accounts to see your actual financial information.
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Tabs Navigation */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          <Badge variant="outline" className="gap-1">
            <Sparkles className="h-3 w-3 text-purple-500" />
            <span className="text-xs">Last updated: Just now</span>
          </Badge>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <MetricsOverview
            totalBalance={totalBalance}
            monthlyIncome={monthlyIncome}
            monthlyExpenses={monthlyExpenses}
            savingsRate={savingsRate}
            isLoading={isLoadingFinancialData}
          />

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Left Column */}
            <div className="col-span-2 space-y-6">
              <ExpenseBreakdown isLoading={isLoadingFinancialData} />
              <BudgetProgress
                monthlyIncome={monthlyIncome}
                monthlyExpenses={monthlyExpenses}
                isLoading={isLoadingFinancialData}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <RecentActivity transactions={transactions} isLoading={isLoadingFinancialData} />
              <FinancialGoals isLoading={isLoadingFinancialData} />
            </div>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight, index) => (
              <InsightCard
                key={insight.title}
                title={insight.title}
                description={insight.description}
                type={insight.type as any}
                action={insight.action}
              />
            ))}
          </div>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <FinancialGoals isLoading={isLoadingFinancialData} expanded />
        </TabsContent>

        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-6">
          <BudgetProgress
            monthlyIncome={monthlyIncome}
            monthlyExpenses={monthlyExpenses}
            isLoading={isLoadingFinancialData}
            expanded
          />
        </TabsContent>
      </Tabs>

      <AddWidgetDialog open={isAddWidgetOpen} onOpenChange={setIsAddWidgetOpen} />
    </div>
  )
}

