import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const transactions = [
  {
    id: "1",
    name: "Starbucks",
    date: "Today, 10:30 AM",
    amount: -4.85,
    category: "Food & Drink",
    icon: "SB",
    iconColor: "bg-finance-green",
    iconTextColor: "text-white",
  },
  {
    id: "2",
    name: "Amazon",
    date: "Yesterday, 2:45 PM",
    amount: -32.99,
    category: "Shopping",
    icon: "AZ",
    iconColor: "bg-finance-orange",
    iconTextColor: "text-white",
  },
  {
    id: "3",
    name: "Uber",
    date: "Yesterday, 9:15 AM",
    amount: -12.5,
    category: "Transportation",
    icon: "UB",
    iconColor: "bg-black",
    iconTextColor: "text-white",
  },
  {
    id: "4",
    name: "Salary Deposit",
    date: "Mar 1, 2024",
    amount: 2250.0,
    category: "Income",
    icon: "SD",
    iconColor: "bg-finance-blue",
    iconTextColor: "text-white",
  },
  {
    id: "5",
    name: "Netflix",
    date: "Feb 28, 2024",
    amount: -15.99,
    category: "Entertainment",
    icon: "NF",
    iconColor: "bg-finance-red",
    iconTextColor: "text-white",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-white/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
              <AvatarFallback className={`${transaction.iconColor} ${transaction.iconTextColor}`}>
                {transaction.icon}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{transaction.name}</div>
              <div className="text-xs text-muted-foreground">{transaction.date}</div>
            </div>
          </div>
          <div className="text-right">
            <div className={transaction.amount > 0 ? "text-finance-green font-medium" : "font-medium"}>
              {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
            </div>
            <Badge variant="outline" className="text-xs font-normal bg-white/50">
              {transaction.category}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

