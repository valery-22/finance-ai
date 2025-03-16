"use client"

import { useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { BanknoteIcon as Bank, CreditCard, Plus, Sparkles } from "lucide-react"

interface ConnectBankButtonProps extends ButtonProps {
  onConnect: () => void
}

export function ConnectBankButton({ onConnect, className, ...props }: ConnectBankButtonProps) {
  const [open, setOpen] = useState(false)

  const handleConnect = () => {
    setOpen(false)
    onConnect()
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={`gradient-bg hover:opacity-90 transition-opacity ${className}`}
        {...props}
      >
        <Plus className="mr-2 h-4 w-4" /> Connect Bank
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-white/90 backdrop-blur-sm border-white/20">
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <div className="rounded-full gradient-bg p-2">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center gradient-text">Connect your bank account</DialogTitle>
            <DialogDescription className="text-center">
              Choose your bank to securely connect your accounts. We use Plaid to ensure your credentials are never
              stored.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="h-auto flex-col p-4 justify-start items-start hover:bg-finance-blue/10 hover:border-finance-blue/30 transition-all"
              onClick={handleConnect}
            >
              <div className="rounded-full bg-finance-blue/10 p-2 mb-2">
                <Bank className="h-6 w-6 text-finance-blue" />
              </div>
              <div className="text-left">
                <div className="font-medium">Chase</div>
                <div className="text-xs text-muted-foreground">Connect checking and savings</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col p-4 justify-start items-start hover:bg-finance-red/10 hover:border-finance-red/30 transition-all"
              onClick={handleConnect}
            >
              <div className="rounded-full bg-finance-red/10 p-2 mb-2">
                <Bank className="h-6 w-6 text-finance-red" />
              </div>
              <div className="text-left">
                <div className="font-medium">Bank of America</div>
                <div className="text-xs text-muted-foreground">Connect checking and savings</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col p-4 justify-start items-start hover:bg-finance-green/10 hover:border-finance-green/30 transition-all"
              onClick={handleConnect}
            >
              <div className="rounded-full bg-finance-green/10 p-2 mb-2">
                <Bank className="h-6 w-6 text-finance-green" />
              </div>
              <div className="text-left">
                <div className="font-medium">Wells Fargo</div>
                <div className="text-xs text-muted-foreground">Connect checking and savings</div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col p-4 justify-start items-start hover:bg-finance-purple/10 hover:border-finance-purple/30 transition-all"
              onClick={handleConnect}
            >
              <div className="rounded-full bg-finance-purple/10 p-2 mb-2">
                <CreditCard className="h-6 w-6 text-finance-purple" />
              </div>
              <div className="text-left">
                <div className="font-medium">Other Bank</div>
                <div className="text-xs text-muted-foreground">Connect any other institution</div>
              </div>
            </Button>
          </div>
          <DialogFooter className="flex items-center">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

