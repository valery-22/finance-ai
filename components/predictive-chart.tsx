"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Sparkles } from "lucide-react"

const predictiveData = [
  { month: "Jul", actual: 4000, predicted: 4200 },
  { month: "Aug", actual: 3000, predicted: 3500 },
  { month: "Sep", actual: 2000, predicted: 2800 },
  { month: "Oct", actual: null, predicted: 3200 },
  { month: "Nov", actual: null, predicted: 3800 },
  { month: "Dec", actual: null, predicted: 4100 },
]

const savingsData = [
  { month: "Jul", actual: 1200, predicted: 1300 },
  { month: "Aug", actual: 1500, predicted: 1600 },
  { month: "Sep", actual: 1800, predicted: 1900 },
  { month: "Oct", actual: null, predicted: 2100 },
  { month: "Nov", actual: null, predicted: 2400 },
  { month: "Dec", actual: null, predicted: 2700 },
]

export function PredictiveChart() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-finance-orange animate-pulse-slow" />
        <span className="text-sm text-finance-orange">AI-powered predictions</span>
      </div>

      <Tabs defaultValue="income" className="w-full">
        <TabsList className="bg-white/50 backdrop-blur-sm p-1 w-full justify-start">
          <TabsTrigger value="income" className="data-[state=active]:gradient-bg-orange data-[state=active]:text-white">
            Income & Expenses
          </TabsTrigger>
          <TabsTrigger value="savings" className="data-[state=active]:gradient-bg-green data-[state=active]:text-white">
            Savings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="income" className="pt-4">
          <Card className="p-4 bg-white/50 backdrop-blur-sm border-0">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictiveData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
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
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#F97316"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#F97316"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="savings" className="pt-4">
          <Card className="p-4 bg-white/50 backdrop-blur-sm border-0">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={savingsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
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
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                />
                </LineChart>
            </ResponsiveContainer>
            </div>
        </Card>
        </TabsContent>
    </Tabs>
    </div>
    )
}

