import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, CreditCard, DollarSign, PiggyBank, Sparkles, Target, Zap } from "lucide-react"


export default function Home (){
  return(
    <div className="flex flex-col min-h-screen overflow-hidden">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-center border-b relative z-10 bg-background/80 backbrop-blur-sm">
        <Link className="flex items-center justify-center"href="#">
          <div className="gradient-bg rounded-full p-1.5">
            <DollarSign className="h-5 w-5 text-white"/>
          </div>
          <span className="ml-2 text-xl font-bold gradient-text">FinanceAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-finance-purple transition-colors" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-finance-blue transition-colors" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-finance-teal transition-colors" href="#">
            About
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <Link href="/login">
            <Button
              variant="outline"
              size="sm"
              className="border-finance-purple text-finance-purple hover:bg-finance-purple/10"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="gradient-bg hover:opacity-90 transition-opacity">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Project Name and Introduction Section */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-finance-purple/5 to-transparent text-center">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              <span className="gradient-text">FinanceAI</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              An AI-powered personal finance assistant that helps you track expenses, save money, and achieve your
              financial goals through intelligent recommendations and predictive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/signup">
                <Button size="lg" className="gradient-bg hover:opacity-90 transition-opacity gap-1">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-finance-purple text-finance-purple hover:bg-finance-purple/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage Your <span className="gradient-text">Finances</span> with AI
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our AI-powered assistant helps you track expenses, save money, and achieve your financial goals with
                    personalized recommendations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gradient-bg hover:opacity-90 transition-opacity gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-finance-purple text-finance-purple hover:bg-finance-purple/10"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[350px] rounded-lg overflow-hidden card-glow">
                  <div className="absolute inset-0 bg-gradient-to-br from-finance-purple/20 via-finance-blue/20 to-finance-teal/20 rounded-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-[250px] bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-6 flex flex-col gap-4 border border-white/20 animate-float">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Your Financial Overview</h3>
                        <BarChart3 className="h-5 w-5 text-finance-purple" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-finance-purple/10 to-finance-blue/10 p-3 rounded-md border border-white/10">
                          <p className="text-xs text-muted-foreground">Monthly Savings</p>
                          <p className="text-lg font-bold text-finance-purple">$1,250</p>
                        </div>
                        <div className="bg-gradient-to-r from-finance-teal/10 to-finance-green/10 p-3 rounded-md border border-white/10">
                          <p className="text-xs text-muted-foreground">Total Expenses</p>
                          <p className="text-lg font-bold text-finance-teal">$2,840</p>
                        </div>
                      </div>
                      <div className="mt-2 space-y-2">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-gradient-to-r from-finance-purple to-finance-blue rounded-full"></div>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full w-1/2 bg-gradient-to-r from-finance-teal to-finance-green rounded-full"></div>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full w-1/4 bg-gradient-to-r from-finance-yellow to-finance-orange rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-10 left-10 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-white/20 animate-bounce-small">
                    <DollarSign className="h-5 w-5 text-finance-green" />
                  </div>
                  <div
                    className="absolute bottom-20 right-10 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-white/20 animate-bounce-small"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <PiggyBank className="h-5 w-5 text-finance-pink" />
                  </div>
                  <div
                    className="absolute top-1/2 right-20 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-white/20 animate-bounce-small"
                    style={{ animationDelay: "1s" }}
                  >
                    <CreditCard className="h-5 w-5 text-finance-blue" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-finance-purple/5 relative"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-full bg-finance-purple/10 p-2 mb-4">
                <Sparkles className="h-6 w-6 text-finance-purple" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  <span className="gradient-text">Powerful</span> Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered platform offers everything you need to take control of your finances
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all hover:-translate-y-1 card-glow">
                <div className="rounded-full bg-finance-purple/10 p-3 mb-2">
                  <CreditCard className="h-8 w-8 text-finance-purple" />
                </div>
                <h3 className="text-xl font-bold">Expense Tracking</h3>
                <p className="text-center text-muted-foreground">
                  Automatically track and categorize your expenses through bank integration
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all hover:-translate-y-1 card-glow">
                <div className="rounded-full bg-finance-blue/10 p-3 mb-2">
                  <Zap className="h-8 w-8 text-finance-blue" />
                </div>
                <h3 className="text-xl font-bold">AI Recommendations</h3>
                <p className="text-center text-muted-foreground">
                  Get personalized savings recommendations based on your spending patterns
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all hover:-translate-y-1 card-glow">
                <div className="rounded-full bg-finance-teal/10 p-3 mb-2">
                  <BarChart3 className="h-8 w-8 text-finance-teal" />
                </div>
                <h3 className="text-xl font-bold">Predictive Analytics</h3>
                <p className="text-center text-muted-foreground">
                  Forecast upcoming expenses and identify financial trends
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all hover:-translate-y-1 card-glow">
                <div className="rounded-full bg-finance-green/10 p-3 mb-2">
                  <Target className="h-8 w-8 text-finance-green" />
                </div>
                <h3 className="text-xl font-bold">Financial Goals</h3>
                <p className="text-center text-muted-foreground">
                  Set and track your financial goals with gamified achievements
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all hover:-translate-y-1 card-glow">
                <div className="rounded-full bg-finance-yellow/10 p-3 mb-2">
                  <PiggyBank className="h-8 w-8 text-finance-yellow" />
                </div>
                <h3 className="text-xl font-bold">Smart Budgeting</h3>
                <p className="text-center text-muted-foreground">
                  Create intelligent budgets that adapt to your spending habits
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all hover:-translate-y-1 card-glow">
                <div className="rounded-full bg-finance-orange/10 p-3 mb-2">
                  <DollarSign className="h-8 w-8 text-finance-orange" />
                </div>
                <h3 className="text-xl font-bold">Investment Insights</h3>
                <p className="text-center text-muted-foreground">
                  Get AI-powered insights on your investments and potential opportunities
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6 bg-background/80 backdrop-blur-sm relative z-10">
        <p className="text-xs text-muted-foreground">© 2024 FinanceAI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-finance-purple transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-finance-blue transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
      
      

    </div>
  )
}