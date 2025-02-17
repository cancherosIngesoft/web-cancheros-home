"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { useGlobalStore, useShallow } from "@/store"
import MatchInformation from "./MatchInformation"
import TeamsInformation from "./TeamsInformation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  desJoinTeam,
  getTeams,
  joinTeam,
  type TeamReservationReturn,
} from "@/actions/reservation/club_reservation_action"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { XCircle } from "lucide-react"
import ReprogramationModal from "@/components/reservar_components/ReprogramationModal"

interface ModalInfoReservationProps {
  isOpen: boolean
  onClose: () => void
  reservation: TeamReservationReturn
  isPastReservation?: boolean
}

export default function ModalInfoReservation({ isOpen, onClose, reservation, isPastReservation = false }: ModalInfoReservationProps) {
  const [disabled, setDisabled] = useState(false)
  const [tooltipMessage, setTooltipMessage] = useState("")
  const [userTeam, setUserTeam] = useState<string | null>(null)
  const auth = useGlobalStore(useShallow((state) => state.auth))
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [showReprogramationModal, setShowReprogramationModal] = useState(false)
  const [diffHours, setDiffHours] = useState<number>(0)

  const isBooker = auth.id == reservation.idBooker
  const startDate = new Date(`${reservation.dateReservation}T${reservation.hours.startHour}:00`);
  const endDate = new Date(`${reservation.dateReservation}T${reservation.hours.endHour}:00`);
  const numHoursReservation = (endDate.getTime() - startDate.getTime()) / (1000 * 3600);

  useEffect(() => {
    const checkTimeConstraint = () => {
      const reservationDate = new Date(`${reservation.dateReservation} ${reservation.hours.startHour}`)
      const now = new Date()
      setDiffHours((reservationDate.getTime() - now.getTime()) / (1000 * 3600))

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

  const {
    data: teams,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["teams", reservation.idReservation],
    queryFn: () => getTeams(reservation.idReservation),
    enabled: !!reservation.idReservation,
    retry: 1,
  })

  useEffect(() => {
    if (auth.name && teams && teams.TeamA.members.includes(auth.name)) {
      setUserTeam(teams.TeamA.idTeam)
    } else if (auth.name && teams && teams.TeamB.members.includes(auth.name)) {
      setUserTeam(teams.TeamB.idTeam)
    } else {
      setUserTeam(null)
    }
  }, [teams, auth.name])

  const joinTeamMutation = useMutation({
    mutationFn: (id_team: string) => {
      if (!auth.id) {
        throw new Error("User ID is null")
      }
      if (isPastReservation) {
        throw new Error("No se puede unir a un equipo en una reserva pasada")
      }
      return joinTeam(reservation.idReservation, id_team, auth.id)
    },

    onSuccess: (_, id_team) => {
      queryClient.invalidateQueries({ queryKey: ["teams", reservation.idReservation] })
      setUserTeam(id_team)
      toast({
        title: "Éxito",
        description: "Te has unido al equipo correctamente.",
        variant: "default",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error al unirse al equipo",
        description: error.message || "No se pudo unir al equipo. Por favor, intenta de nuevo.",
        variant: "destructive",
        duration: 3000,
      })
    },

  })

  const leaveTeamMutation = useMutation({
    mutationFn: () => {
      if (!auth.id) {
        throw new Error("User ID is null")
      }
      if (isPastReservation) {
        throw new Error("No se puede desunir a un equipo en una reserva pasada")
      }
      return desJoinTeam(reservation.idReservation, auth.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams", reservation.idReservation] })
      setUserTeam(null)
      toast({
        title: "Éxito",
        description: "Has salido del equipo correctamente.",
        variant: "default",
        duration: 3000,
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error al salir del equipo",
        description: error.message || "No se pudo salir del equipo. Por favor, intenta de nuevo.",
        variant: "destructive",
        duration: 3000,
      })
    },
  })

  const handleReschedule = () => {
    if (isPastReservation) {
      toast({
        title: "Error",
        description: "No se puede reprogramar una reserva pasada.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }
    setShowReprogramationModal(true)
    console.log("Reprogramar")
  }

  const handleCancel = () => {
    if (isPastReservation) {
      throw new Error("No se puede unir a un equipo en una reserva pasada")
    }
    console.log("Cancelar")
  }

  const handleJoinTeam = (teamId: string, teamName: string) => {
    joinTeamMutation.mutate(teamId)
  }

  const handleLeaveTeam = () => {
    leaveTeamMutation.mutate()
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] max-w-5xl p-0 gap-0 max-h-[90vh] overflow-y-auto md:overflow-hidden">
          <DialogHeader className="p-4 m-0 flex flex-row items-center justify-between border-b max-h-16 bg-primary-70 rounded-t-md">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              {`${reservation.teamAName} vs ${reservation.teamBName}`}
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
                isPastReservation={isPastReservation}
              />
            </div>
            {isLoading ? (
              <div className="w-full md:w-1/2 h-full p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Skeleton className="w-full md:w-1/2 h-64 rounded-lg" />
                  <Skeleton className="w-full md:w-1/2 h-64 rounded-lg" />
                </div>
              </div>
            ) : isError ? (
              <div className="w-full md:w-1/2 h-full p-4 flex flex-col items-center justify-center text-center">
                <XCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Algo ha fallado</h3>
                <p className="text-sm text-gray-600">
                  {error instanceof Error
                    ? error.message
                    : "No se pudieron cargar los equipos. Por favor, intenta de nuevo."}
                </p>
              </div>
            ) : teams ? (
              <div className="w-full md:w-1/2 h-full">
                <TeamsInformation
                  teams={teams}
                  onJoinTeam={handleJoinTeam}
                  onLeaveTeam={handleLeaveTeam}
                  isLoading={joinTeamMutation.status === "pending" || leaveTeamMutation.status === "pending"}
                  userTeam={userTeam}
                  isPastReservation={isPastReservation}
                />
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
      <ReprogramationModal
        isOpen={showReprogramationModal}
        onClose={() => setShowReprogramationModal(false)}
        idReservation={reservation.idReservation}
        businessName={reservation.bussinesName}
        fieldType={reservation.FieldType}
        fieldImg={reservation.fieldImg}
        totalPrice={reservation.totalPrice}
        idField={reservation.idField}
        numHours={numHoursReservation}

      />

    </>

  )
}

