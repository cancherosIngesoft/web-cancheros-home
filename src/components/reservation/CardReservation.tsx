"use client"

import { Calendar, Clock, Users, MapPin, ImageOff, DollarSign, User, Users2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { ReservationActiveReturn } from "@/actions/reservation/reservation_action"
import BallIcon from "../icon/BallIcon"

interface CardReservationProps extends ReservationActiveReturn {
    currentUserId: string | undefined
    isActive: boolean
}

export default function CardReservation({
    idReservation,
    dateReservation,
    hours,
    inTeam,
    idBooker,
    bussinesName,
    FieldType,
    capacity,
    bussinessDirection,
    fieldImg,
    totalPrice,
    teamName,
    currentUserId,
    isActive,
}: CardReservationProps) {
    const isLessThan24Hours = () => {
        const reservationDate = new Date(`${dateReservation} ${hours.horaInicio}`)
        const now = new Date()
        const diffInHours = (reservationDate.getTime() - now.getTime()) / (1000 * 60 * 60)
        return diffInHours < 24
    }

    const disabled = isLessThan24Hours()
    const tooltipMessage = "No es posible realizar cambios cuando quedan menos de 24 horas para la reserva"

    const handleReschedule = () => {
        console.log("Reschedule", idReservation)
    }

    const handleCancel = () => {
        console.log("Cancel", idReservation)
    }

    const isBooker = currentUserId == idBooker

    return (
        <div className="relative flex flex-col items-start gap-4 p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-center w-full">
                <h2 className="font-bold text-lg text-primary">{bussinesName}</h2>
                <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-600">{new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              maximumFractionDigits: 0,
            }).format(totalPrice)}</span>
                </div>
            </div>
            <div className="flex items-start gap-4 w-full">
                <div className="relative w-24 h-24 rounded-lg shrink-0">
                    {fieldImg ? (
                        <Image src={fieldImg || "/placeholder.svg"} alt={bussinesName} fill className="object-cover rounded-lg" />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center rounded-lg bg-gray-200">
                            <ImageOff className="h-10 w-10 text-primary-50" />
                        </div>
                    )}
                </div>

                <div className="flex-1 flex flex-row min-w-0">
                    <div className="flex flex-row items-start gap-4 w-2/3 mb-4">
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{bussinessDirection}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <BallIcon className="w-4 h-4" />
                                <span>Grama: {FieldType}</span>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>{dateReservation}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(hours.horaInicio).toISOString().split("T")[1].substring(0, 5)  

                                +" - "+ 
                                new Date(hours.horaFin).toISOString().split("T")[1].substring(0, 5)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="w-4 h-4" />
                                <span>Capacidad: {capacity}</span>
                            </div>
                        </div>
                    </div>


                    {(isBooker && isActive) && (
                        <div className="flex justify-center items-center flex-1 gap-2">
                            <div className="flex-1">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div>
                                                <Button variant="outline" onClick={handleReschedule} disabled={disabled} className="w-full" >
                                                    Reprogramar
                                                </Button>
                                            </div>
                                            
                                        </TooltipTrigger>
                                        {disabled && <TooltipContent className="bg-surface shadow-md max-w-48 mb-2">{tooltipMessage}</TooltipContent>}
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="flex-1">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div>
                                                <Button variant="destructive" onClick={handleCancel} disabled={disabled} className="w-full">
                                                    Cancelar
                                                </Button>
                                            </div>
                                        </TooltipTrigger>
                                        {disabled && <TooltipContent className="bg-surface shadow-md max-w-48 mb-2">{tooltipMessage}</TooltipContent>}
                                    </Tooltip>
                                </TooltipProvider>
                            </div>


                        </div>
                    )}

                    <div className="flex absolute right-4 bottom-4 items-center gap-2 text-sm font-bold text-muted-foreground">
                        {inTeam ? (
                            <>
                                <Users2 className="w-4 h-4" />
                                <span>Reservado con {teamName}</span>
                            </>
                        ) : (
                            <>
                                <User className="w-4 h-4" />
                                <span>Reservado en solitario</span>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

