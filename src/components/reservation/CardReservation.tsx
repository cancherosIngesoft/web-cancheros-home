"use client"

import { Calendar, Clock, Users, MapPin, ImageOff, DollarSign, User, Users2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cancelReservation, type ReservationActiveReturn } from "@/actions/reservation/reservation_action"
import BallIcon from "../icon/BallIcon"
import ReprogramationModal from "../reservar_components/ReprogramationModal"
import { useState } from "react"
import ConfirmationModal from "../modals/ConfirmationModal"
import { CalendarOff } from 'lucide-react';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

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
    idField,
}: CardReservationProps) {

    const [isOpenReprogramationModal, setIsOpenReprogramationModal] = useState(false)
    const [isOpenConfirmationCancelModal, setIsOpenConfirmationCancelModal] = useState(false)	
    const startDate = new Date(hours.horaInicio);
    const endDate = new Date(hours.horaFin);
    const numHoursReservation = ((endDate.getTime() - startDate.getTime()) / (1000 * 3600));
    const { toast} = useToast()
    const  queryClient  = useQueryClient()

    const isLessThan24Hours = () => {
        const reservationDate = new Date(`${dateReservation} ${hours.horaInicio}`)
        const now = new Date()
        const diffInHours = (reservationDate.getTime() - now.getTime()) / (1000 * 60 * 60)
        return diffInHours < 24
    }

    const disabled = isLessThan24Hours()
    const tooltipMessage = "No es posible realizar cambios cuando quedan menos de 24 horas para la reserva"

    const {
        mutate: cancel,
        
    }=useMutation({
        mutationFn:()=>{ 
            if(!currentUserId)  return Promise.reject("Error en los datos")
            return cancelReservation(idReservation,currentUserId)},
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["activeReservations", currentUserId]})
            toast({
                title: "Reserva cancelada",
                description: "La reserva ha sido cancelada exitosamente.",
                variant: "default",
            })
            setIsOpenConfirmationCancelModal(false)
        },
        
        onError: (error:Error) => {
            console.error(error)
            toast({
                title: "Error",
                description: ` ${error.message} Hubo un problema al cancelar la reserva por favor vuelva a interntarlo`,
                variant: "destructive",
            })
        }
    })

    const handleCancel = () => {
        cancel()
        console.log("Cancel", idReservation)
    }

    const isBooker = currentUserId == idBooker

    return (
        <div className="relative flex flex-col items-start gap-4 p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-center w-full">
                <h2 className="font-bold text-lg text-primary">{bussinesName}</h2>
                <div className="flex items-center gap-2">
                    
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
                                                <Button variant="outline" onClick={()=>setIsOpenReprogramationModal(true)} disabled={disabled} className="w-full" >
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
                                                <Button variant="destructive" onClick={()=>setIsOpenConfirmationCancelModal(true)} disabled={disabled} className="w-full">
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

            <ReprogramationModal
                isOpen={isOpenReprogramationModal}
                onClose={() => setIsOpenReprogramationModal(false)}
                idReservation={idReservation}
                businessName={bussinesName}
                fieldType={FieldType}
                fieldImg={fieldImg}
                totalPrice={totalPrice}
                idField={idField}
                numHours={numHoursReservation}
            />
            <ConfirmationModal
                isOpen={isOpenConfirmationCancelModal}
                onClose={() => setIsOpenConfirmationCancelModal(false)}
                onConfirm={handleCancel}
                title={`¿Estás seguro de cancelar la reserva hecha en ${bussinesName}?`}
                description="Al cancelar la reserva, se liberará el espacio para que otro usuario pueda reservarlo"
                icon= {<CalendarOff className="w-14 h-14 text-red-500" />}
            />
        </div>
    )
}

