import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldX, Home, ArrowLeft } from "lucide-react"
 const Page = () => {
  return (
   <div className="h-full bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50 shadow-none">
        <CardContent className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-destructive/10 border border-destructive/20">
              <ShieldX className="w-12 h-12 text-destructive" />
            </div>
          </div>

          {/* Error Code */}
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-destructive font-mono">403</h1>
            <h2 className="text-2xl font-semibold text-foreground">Access Forbidden</h2>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <p className="text-muted-foreground text-balance">
              You don't have permission to access this resource. This area is restricted to authorized users only.
            </p>
            <p className="text-sm text-muted-foreground">
              If you believe this is an error, please contact an administrator.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild variant="default" className="flex-1">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
          </div>

          {/* Movie-themed decoration */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground italic">
              "Access denied. This feature is not available in your current subscription."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page