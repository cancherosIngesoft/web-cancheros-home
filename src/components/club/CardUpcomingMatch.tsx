"use client"

import { Clock, MapPin, Timer, ChevronRight, Circle, ImageOff } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

import { useState } from "react"
import ModalInfoReservation from "./ModalInfoReservation/ModalInfoReservation"
import Image from 'next/image'
import { TeamReservationReturn } from '@/actions/reservation/club_reservation_action'
import { Button } from '../ui/button'

const CardUpcomingMatch = (reservation: TeamReservationReturn) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const startDate = new Date(`${reservation.dateReservation}T${reservation.hours.startHour}:00`);
    const endDate = new Date(`${reservation.dateReservation}T${reservation.hours.endHour}:00`);
    const diferenceHours = (endDate.getTime() - startDate.getTime()) / (1000 * 3600);

    return (
        <>
            <Card className="hover:shadow-md transition-shadow md:w-[30rem] max-w-3xl bg-gray-50">
                <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4  h-full">
                        {/* Contenedor de la imagen */}
                        <div className="md:w-52 w-full min-h-full flex flex-col justify-between flex-shrink-0 gap-4">
                            {reservation.fieldImg ? (
                                <Image
                                    src={
                                        reservation.fieldImg

                                        || "/placeholder.svg"}
                                    alt={`Campo de ${reservation.FieldType}`}
                                    className="w-full aspect-video object-cover rounded-lg"
                                    width={208}
                                    height={117}
                                />
                            ) : (
                                <div className="aspect-video w-full flex items-center rounded-md bg-gray-200">
                                    <ImageOff className="h-10 w-10 mx-auto text-primary-50" />
                                </div>
                            )
                            }

                            <div className="text-2xl font-bold text-green-600  left-2 bottom-2">
                                $ {reservation.totalPrice.toLocaleString()}
                            </div>
                        </div>

                        {/* Contenedor de la información */}
                        <div className="flex flex-col flex-grow gap-4">
                            {/* Encabezado con título y precio */}
                            <div className="flex justify-between items-start flex-wrap gap-2">
                                <h3 className="text-xl font-semibold">
                                    {reservation.teamAName} vs {reservation.teamBName}
                                </h3>

                            </div>

                            {/* Detalles del partido */}
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <Link
                                        href={`https://www.google.com/maps?q=${reservation.geoGraphicalLocation.lat},${reservation.geoGraphicalLocation.long}`}
                                        target="_blank"
                                        className="hover:underline break-words"
                                    >
                                        {reservation.bussinessDirection}
                                    </Link>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 flex-shrink-0" />
                                    <span>
                                        {reservation.hours.startHour} - {reservation.hours.endHour}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Timer className="w-4 h-4 flex-shrink-0" />
                                    <span>{diferenceHours} horas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Circle className={`w-4 h-4 flex-shrink-0 ${reservation.isParticipating ? "fill-green-500 text-green-500" : "fill-destructive text-destructive"}`} />
                                    <span>{reservation.isParticipating ? "Participando" : "No estas participando"}</span>
                                </div>
                            </div>

                            {/* Botón de más detalles */}
                            <div className="flex justify-end mt-auto">
                                <Button
                                    variant="ghost"
                                    className="text-green-600 hover:text-green-700 hover:bg-primary-90 p-2"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Mas detalles
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                    <span className="sr-only">sobre el partido</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <ModalInfoReservation
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                reservation={reservation}
                
            />
        </>
    )
}

export default CardUpcomingMatch
