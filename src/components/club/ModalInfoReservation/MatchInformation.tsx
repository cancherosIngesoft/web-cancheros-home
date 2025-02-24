"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MapPin, Clock, Timer, Users } from "lucide-react"
import PlayerWithBall from "@/components/icon/PlayerWithBall"
import CustomMap from "@/components/georeference/map"
import { TeamReservationReturn } from "@/actions/reservation/club_reservation_action"
import ReprogramacionModal from "@/components/reservar_components/ReprogramationModal"
import { useEffect, useState } from "react"


interface MatchInformationProps {
  reservation: TeamReservationReturn
  isBooker: boolean
  onReschedule: () => void
  onCancel: () => void
  isPastReservation: boolean
}

export default function MatchInformation({
  reservation,
  isBooker,
  onReschedule,
  onCancel,
  isPastReservation
}: MatchInformationProps) {

  const startDate = new Date(reservation.hours.startHour)
  const endDate = new Date(reservation.hours.endHour);
  const diferenceHours = (endDate.getTime() - startDate.getTime()) / (1000 * 3600);
  const diffHours = (endDate.getTime() - new Date().getTime()) / (1000 * 3600)
  const [disabled, setDisabled] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState("")
 
  const now = new Date()
  useEffect(() => {
    const checkTimeConstraint = () => {
  

      if (diffHours < 24) {
        setDisabled(true)
        setTooltipMessage("No se pueden realizar cambios 24 horas antes del partido")
      } else {
        setDisabled(false)
        setTooltipMessage("")
      }
    }

    checkTimeConstraint()
  }, [reservation])
  return (
    <div className="flex flex-col w-full  space-y-4 p-4 px-6">
      {isBooker && !isPastReservation && (
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="flex-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1">
                    <Button
                      variant="outline"
                      onClick={onReschedule}
                      disabled={disabled}
                      className="w-full bg-transparent border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-200"
                    >
                      Reprogramar Reserva
                    </Button>
                  </div>
                </TooltipTrigger>
                {disabled && (
                  <TooltipContent className="bg-surface shadow-md max-w-48 mb-2">{tooltipMessage}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1">
                    <Button
                      variant="destructive"
                      onClick={onCancel}
                      disabled={disabled}
                      className="w-full bg-transparent border-2 border-red-500 text-red-500"
                    >
                      Cancelar Reserva
                    </Button>
                  </div>
                </TooltipTrigger>
                {disabled && (
                  <TooltipContent className="bg-surface shadow-md max-w-48 mb-2">{tooltipMessage}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="font-semibold flex items-center gap-2">
          <Users className="h-4 w-4" />
          Negocio: <span className="font-normal">{reservation.bussinesName}</span>
        </h3>
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:items-center mt-2">
          <img
            src={
              reservation.fieldImg ||
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dNcJMOO2DRKaZ5PWmGhBuzegBFip2B.png"
            }
            alt={`Campo de ${reservation.FieldType}`}
            className="w-full sm:w-1/2 max-w-[200px] aspect-video object-cover rounded-lg"
          />
          <div className="space-y-2 text-sm w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <PlayerWithBall className="h-6 w-6 text-tertiary" />
              <span className="font-semibold">Cancha:</span> {Math.floor(reservation.capacity)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-tertiary" />
              <span className="font-semibold">Hora</span>
              {startDate.toISOString().split("T")[1].substring(0, 5)} - {endDate.toISOString().split("T")[1].substring(0, 5)}
            </div>
            <div className="flex items-center gap-2">
              <Timer className="h-6 w-6 text-tertiary" />
              <span className="font-semibold">Duracion</span>{diferenceHours}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-tertiary" />
          <span className="font-semibold">Ubicación:</span>
        </div>
        <div className="w-full h-[200px] sm:h-[250px] md:h-fit">
          <CustomMap
            center={{
              lat: reservation.geoGraphicalLocation.lat,
              lng: reservation.geoGraphicalLocation.long,
            }}
            markers={[
              {
                id: reservation.idBooker,
                lat: reservation.geoGraphicalLocation.lat,
                lng: reservation.geoGraphicalLocation.long,
              },
            ]}
            showInfoWindow={true}
            style={{ width: "30vh", height: "30vh" }}
            gestureHandling="auto"
          />
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${reservation.geoGraphicalLocation.lat},${reservation.geoGraphicalLocation.long}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-semibold text-sm underline"
        >
          📍 Mira cómo llegar en Google Maps
        </a>
      </div>
     
    </div>
  )
}

