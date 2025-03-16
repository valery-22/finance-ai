import type { ReactNode } from "react"
import { Progress } from "@/components/ui/progress"

interface SavingsGoalCardProps {
  title: string
  current: number
  target: number
  progress: number
  icon: ReactNode
  color?: "purple" | "blue" | "teal" | "green" | "yellow" | "orange" | "pink"
}

export function SavingsGoalCard({ title, current, target, progress, icon, color = "purple" }: SavingsGoalCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "purple":
        return "bg-finance-purple/10 text-finance-purple"
      case "blue":
        return "bg-finance-blue/10 text-finance-blue"
      case "teal":
        return "bg-finance-teal/10 text-finance-teal"
      case "green":
        return "bg-finance-green/10 text-finance-green"
      case "yellow":
        return "bg-finance-yellow/10 text-finance-yellow"
      case "orange":
        return "bg-finance-orange/10 text-finance-orange"
      case "pink":
        return "bg-finance-pink/10 text-finance-pink"
      default:
        return "bg-finance-purple/10 text-finance-purple"
    }
  }

  const getProgressColor = () => {
    switch (color) {
      case "purple":
        return "bg-finance-purple"
      case "blue":
        return "bg-finance-blue"
      case "teal":
        return "bg-finance-teal"
      case "green":
        return "bg-finance-green"
      case "yellow":
        return "bg-finance-yellow"
      case "orange":
        return "bg-finance-orange"
      case "pink":
        return "bg-finance-pink"
      default:
        return "bg-finance-purple"
    }
  }

  return (
    <div className="rounded-lg border p-3 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`rounded-full p-1.5 ${getColorClasses()}`}>{icon}</div>
          <span className="font-medium">{title}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          ${current} / ${target}
        </span>
      </div>
      <Progress value={progress} className="mt-2" style={{ backgroundColor: `rgba(139, 92, 246, 0.1)` }}>
        <div
          className="h-full transition-all"
          style={{
            width: `${progress}%`,
            backgroundColor: getProgressColor(),
          }}
        />
      </Progress>
    </div>
  )
}

