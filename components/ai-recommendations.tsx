import { LightbulbIcon, Sparkles } from "lucide-react"

const recommendations = [
  {
    id: "1",
    title: "Reduce subscription costs",
    description: "You're spending $45/month on subscriptions you rarely use. Consider canceling Netflix and Spotify.",
    color: "yellow",
  },
  {
    id: "2",
    title: "Increase emergency fund",
    description: "Based on your spending patterns, we recommend adding $200 more to your emergency fund each month.",
    color: "purple",
  },
  {
    id: "3",
    title: "Optimize grocery spending",
    description: "You could save approximately $120/month by shopping at discount grocery stores for staple items.",
    color: "green",
  },
]

export function AIRecommendations() {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "purple":
        return "bg-finance-purple/10 text-finance-purple"
      case "blue":
        return "bg-finance-blue/10 text-finance-blue"
      case "green":
        return "bg-finance-green/10 text-finance-green"
      case "yellow":
        return "bg-finance-yellow/10 text-finance-yellow"
      default:
        return "bg-finance-yellow/10 text-finance-yellow"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-finance-purple animate-pulse-slow" />
        <span className="text-sm text-finance-purple">AI-powered insights</span>
      </div>
      {recommendations.map((recommendation) => (
        <div
          key={recommendation.id}
          className="rounded-lg border p-3 bg-white/50 backdrop-blur-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-2">
            <div className={`rounded-full p-1 ${getColorClasses(recommendation.color)}`}>
              <LightbulbIcon className="h-4 w-4" />
            </div>
            <span className="font-medium">{recommendation.title}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{recommendation.description}</p>
        </div>
      ))}
    </div>
  )
}

