import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: "purple" | "blue" | "teal" | "green" | "yellow" | "orange" | "red" | "pink"
}

export function FeatureCard({ title, description, icon: Icon, color }: FeatureCardProps) {
  return (
    <div
      className={`
      group flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm 
      bg-white/80 backdrop-blur-sm hover:shadow-md transition-all hover:-translate-y-1 
      card-glow hover:border-finance-${color}/50
    `}
    >
      <div
        className={`
        rounded-full bg-finance-${color}/10 p-3 mb-2 
        transition-colors group-hover:bg-finance-${color}/20
      `}
      >
        <Icon className={`h-8 w-8 text-finance-${color}`} />
      </div>
      <h3 className={`text-xl font-bold transition-colors group-hover:text-finance-${color}`}>{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
    </div>
  )
}

