"use client"

import { Shield, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useTeamDataStore } from "@/store"
import SkeletonTeamInfo from "./SkeletonTeamInfo"

export default function TeamInfo() {
  const { teamName, icon, numberPlayers, nameCapitan, description } = useTeamDataStore()
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(loadingTimer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const visibilityTimer = setTimeout(() => setIsVisible(true), 50)
      return () => clearTimeout(visibilityTimer)
    }
  }, [isLoading])

  if (isLoading) {
    return <SkeletonTeamInfo />
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent
        className={cn(
          "grid gap-6 md:grid-cols-[auto_1fr] items-start p-6 transition-opacity duration-500 ease-in-out",
          isVisible ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="w-32 h-32 bg-primary/10 rounded-lg flex items-center justify-center">
          {icon ? (
            <img src={icon || "/placeholder.svg"} alt={teamName} className="w-24 h-24" />
          ) : (
            <Shield className="w-16 h-16 text-primary" />
          )}
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{teamName}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{numberPlayers}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Capitán:</div>
            <div className="font-medium">{nameCapitan}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Descripción:</div>
            <div className="text-sm">{description}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


