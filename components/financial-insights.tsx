"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const monthlyData = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 9800 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "Jun", income: 2390, expenses: 3800 },
]

const categoryData = [
  { name: "Housing", value: 35 },
  { name: "Food", value: 20 },
  { name: "Transportation", value: 15 },
  { name: "Entertainment", value: 10 },
  { name: "Utilities", value: 10 },
  { name: "Other", value: 10 },
]

const COLORS = ["#8B5CF6", "#3B82F6", "#14B8A6", "#10B981", "#FBBF24", "#F97316"]

export function FinancialInsights() {
  const [activeTab, setActiveTab] = useState("monthly")

  return (
    <div className="space-y-4">
      <Tabs defaultValue="monthly" onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white/50 backdrop-blur-sm p-1 w-full justify-start">
          <TabsTrigger value="monthly" className="data-[state=active]:gradient-bg-teal data-[state=active]:text-white">
            Monthly
          </TabsTrigger>
          <TabsTrigger
            value="categories"
            className="data-[state=active]:gradient-bg-orange data-[state=active]:text-white"
          >
            Categories
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:gradient-bg-pink data-[state=active]:text-white">
            Trends
          </TabsTrigger>
        </TabsList>
        <TabsContent value="monthly" className="pt-4">
          <Card className="p-4 bg-white/50 backdrop-blur-sm border-0">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="#14B8A6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#F97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="pt-4">
          <Card className="p-4 bg-white/50 backdrop-blur-sm border-0">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="pt-4">
          <Card className="p-4 bg-white/50 backdrop-blur-sm border-0">
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Trend analysis will be displayed here</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

