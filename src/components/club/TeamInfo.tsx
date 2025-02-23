"use client"

import { Shield, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useTeamDataStore } from "@/store"
import SkeletonTeamInfo from "./SkeletonTeamInfo"
import CustomShield from "../icon/CustomShield"
import PlayerWithBall from "../icon/PlayerWithBall"

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
        <div
            className={cn(
                " flex  flex-col md:flex-row  gap-4 items-start pt-4 md:py-0 md:p-6 transition-opacity duration-500 ease-in-out w-full",
                isVisible ? "opacity-100" : "opacity-0",
            )}
        >
            <div className="w-full md:w-32 h-32 rounded-lg flex items-center justify-center">
                {icon ? (
                    <img src={icon} alt={teamName} className="w-full h-full object-contain" />
                ) : (
                    <CustomShield className="w-full h-full text-primary" />
                )}
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col md:flex-row items-center md:justify-between">
                    <h1 className="text-3xl font-bold text-primary">{teamName}</h1>
                    <div className="flex flex-row gap-4  p-2 rounded-md text-sm md:test-base ">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <PlayerWithBall className="w-6 h-6 text-tertiary" />
                            <span className=" font-bold">Jugadores</span>
                            <span>{numberPlayers}</span>
                        </div>
                        <div className=" flex flex-row items-center gap-2">
                            <div className=" text-muted-foreground font-bold ">Capitán:</div>
                            <div className="font-medium">{nameCapitan}</div>
                        </div>

                    </div>
                </div>
                <hr className="w-full border-[1.5px] border-gray-600" />
                <div className="flex flex-row gap-4 mt-2">


                    <div className="flex flex-col  bg-primary-95 p-2 px-4 rounded-md flex-1">
                        <div className="text-md text-muted-foreground font-bold">Descripción:</div>
                        <div className="text-md">{description}</div>
                    </div>
                </div>


            </div>
        </div>

    )
}


