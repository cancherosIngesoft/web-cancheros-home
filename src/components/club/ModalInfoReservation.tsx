"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { TeamReservationReturn } from "@/actions/reservation/reservation_action"
import { MapPin, Clock, Timer, Users } from "lucide-react"

interface ModalInfoReservationProps {
  isOpen: boolean
  onClose: () => void
  reservation: TeamReservationReturn
}

export default function ModalInfoReservation({ isOpen, onClose, reservation }: ModalInfoReservationProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Detalles de la Reservación</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <img
            src={
              reservation.fieldImg ||
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oTx3jv9ZNbcOTDVDd8WDGYv95ogdbA.png"
            }
            alt={`Campo de ${reservation.FieldType}`}
            className="w-full aspect-video object-cover rounded-lg"
          />
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{reservation.bussinesName}</h3>
                <div className="text-2xl font-bold text-green-600">$ {reservation.totalPrice.toLocaleString()}</div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold">Equipo A</h4>
                <p>{reservation.TeamA.teamName}</p>
                <p className="text-sm text-muted-foreground">{reservation.TeamA.members.length} jugadores</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Equipo B</h4>
                <p>{reservation.TeamB.teamName}</p>
                <p className="text-sm text-muted-foreground">{reservation.TeamB.members.length} jugadores</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{reservation.bussinessDirection}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {reservation.hours.horaInicio} - {reservation.hours.horaFin}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <span>2 horas</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Capacidad: {reservation.capacity} jugadores</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

