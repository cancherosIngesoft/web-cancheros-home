"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MapPin, Clock, Timer, Users, X } from "lucide-react"
import type { TeamReservationReturn } from "@/actions/reservation/reservation_action"
import { useState, useEffect } from "react"
import { useGlobalStore, useShallow } from "@/store"

interface ModalInfoReservationProps {
  isOpen: boolean
  onClose: () => void
  reservation: TeamReservationReturn

}

export default function ModalInfoReservation({
  isOpen,
  onClose,
  reservation,

}: ModalInfoReservationProps) {
  const [isReminder, setIsReminder] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState("")
  const auth = useGlobalStore(useShallow((state) => state.auth));
  

  const isBooker = auth.id == reservation.idBooker

  useEffect(() => {
    const checkTimeConstraint = () => {
      const reservationDate = new Date(`${reservation.dateReservation} ${reservation.hours.horaInicio}`)
      const now = new Date()
      const diffHours = (reservationDate.getTime() - now.getTime()) / (1000 * 60 * 60)

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

  const handleReschedule = () => {
    // Implementar lógica de reprogramación
    console.log("Reprogramar")
  }

  const handleCancel = () => {
    // Implementar lógica de cancelación
    console.log("Cancelar")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-4 flex flex-row items-center justify-between border-b">
          <div className="flex items-center gap-4">
            <DialogTitle className="text-xl font-bold">
              {reservation.TeamA.teamName} vs {reservation.TeamB.teamName}
            </DialogTitle>
            
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Left Column - Match Info */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" />
                Negocio: {reservation.bussinesName}
              </h3>
              <img
                src={
                  reservation.fieldImg ||
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dNcJMOO2DRKaZ5PWmGhBuzegBFip2B.png"
                }
                alt={`Campo de ${reservation.FieldType}`}
                className="w-full aspect-video object-cover rounded-lg"
              />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Jugadores por equipo: {Math.floor(reservation.capacity / 2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {reservation.hours.horaInicio} - {reservation.hours.horaFin}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                <span>2 horas</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Ubicación:</span>
              </div>
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${reservation.geoGraphicalLocation.lat},${reservation.geoGraphicalLocation.long}&zoom=15&size=400x200&markers=${reservation.geoGraphicalLocation.lat},${reservation.geoGraphicalLocation.long}&key=YOUR_GOOGLE_MAPS_KEY`}
                alt="Ubicación del campo"
                className="w-full rounded-lg"
              />
            </div>
          </div>

          {/* Right Column - Teams */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Team A */}
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Equipo A</h3>
                <div className="flex-1 w-full space-y-2">
                  {reservation.TeamA.members.map((member, index) => (
                    <div key={index} className="text-sm text-center p-2 bg-white rounded">
                      {member}
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full" variant="outline">
                  Unirme
                </Button>
              </div>

              {/* Team B */}
              <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg">
                <h3 className="text-xl font-bold text-red-600 mb-4">Equipo B</h3>
                <div className="flex-1 w-full space-y-2">
                  {reservation.TeamB.members.map((member, index) => (
                    <div key={index} className="text-sm text-center p-2 bg-white rounded">
                      {member}
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full" variant="outline">
                  Unirme
                </Button>
              </div>
            </div>

            <Button variant="ghost" className="w-full mt-4">
              Quitar selección
            </Button>
          </div>
        </div>

        {/* Footer - Conditional Buttons */}
        {isBooker && (
          <div className="border-t p-4">
            <div className="flex gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex-1">
                      <Button variant="outline" onClick={handleReschedule} disabled={disabled} className="w-full">
                        Reprogramar Reserva
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {disabled && (
                    <TooltipContent className="bg-surface shadow-md max-w-48 mb-2">{tooltipMessage}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex-1">
                      <Button variant="destructive" onClick={handleCancel} disabled={disabled} className="w-full">
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
      </DialogContent>
    </Dialog>
  )
}

