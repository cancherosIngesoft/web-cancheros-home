"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { TeamReservationReturn } from "@/actions/reservation/reservation_action"
import { useState, useEffect } from "react"
import { useGlobalStore, useShallow } from "@/store"
import MatchInformation from "./MatchInformation"
import TeamsInformation from "./TeamsInformation"
import { useMutation, useQueryClient } from "@tanstack/react-query"


import { desJoinTeam, joinTeam } from "@/actions/reservation/club_reservation_action"
import { useToast } from "@/hooks/use-toast"

interface ModalInfoReservationProps {
  isOpen: boolean
  onClose: () => void
  reservation: TeamReservationReturn
}

export default function ModalInfoReservation({ isOpen, onClose, reservation }: ModalInfoReservationProps) {
  const [disabled, setDisabled] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState("")
  const auth = useGlobalStore(useShallow((state) => state.auth))
  const queryClient = useQueryClient()
  const { toast } = useToast()

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

  const joinTeamMutation = useMutation({
    mutationFn: (id_team: string) => {
      if (!auth.id) {
        throw new Error("User ID is null");
      }
      return joinTeam(reservation.idReservation, id_team, auth.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservation", reservation.idReservation] });
      toast({
        title: "Éxito",
        description: "Te has unido al equipo correctamente.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al unirse al equipo",
        description: error.message || "No se pudo unir al equipo. Por favor, intenta de nuevo.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const leaveTeamMutation = useMutation({
    mutationFn: () => {
      if (!auth.id) {
        throw new Error("User ID is null");
      }
      return desJoinTeam(reservation.idReservation, auth.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservation", reservation.idReservation] });
      toast({
        title: "Éxito",
        description: "Has salido del equipo correctamente.",
        variant: "default",
        duration: 3000,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al salir del equipo",
        description: error.message || "No se pudo salir del equipo. Por favor, intenta de nuevo.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const handleReschedule = () => {
    console.log("Reprogramar")
  }

  const handleCancel = () => {
    console.log("Cancelar")
  }

  const handleJoinTeam = (teamId: string, teamName: string) => {
    joinTeamMutation.mutate(teamId)
  }

  const handleLeaveTeam = () => {
    leaveTeamMutation.mutate()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-5xl p-0 gap-0 max-h-[90vh] overflow-y-auto md:overflow-hidden">
        <DialogHeader className="p-4 m-0 flex flex-row items-center justify-between border-b max-h-16 bg-primary-70 rounded-t-md">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            {reservation.TeamA.teamName} vs {reservation.TeamB.teamName}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-1/2 h-full">
            <MatchInformation
              reservation={reservation}
              isBooker={isBooker}
              disabled={disabled}
              tooltipMessage={tooltipMessage}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
            />
          </div>
          <div className="w-full md:w-1/2 h-full">
            <TeamsInformation
              reservation={reservation}
              onJoinTeam={handleJoinTeam}
              onLeaveTeam={handleLeaveTeam}
              isLoading={joinTeamMutation.status === 'pending' || leaveTeamMutation.status === 'pending'}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

