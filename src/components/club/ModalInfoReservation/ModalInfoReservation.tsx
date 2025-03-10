"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useGlobalStore, useShallow, useTeamDataStore } from "@/store";
import MatchInformation from "./MatchInformation";
import TeamsInformation from "./TeamsInformation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  desJoinTeam,
  getTeams,
  joinTeam,
  type TeamReservationReturn,
} from "@/actions/reservation/club_reservation_action";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarOff, XCircle } from "lucide-react";
import ReprogramationModal from "@/components/reservar_components/ReprogramationModal";
import { cancelarReserva } from "@/actions/reservation/reservation_action";
import ConfirmationModal from "@/components/modals/ConfirmationModal";

interface ModalInfoReservationProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: TeamReservationReturn;
  isPastReservation?: boolean;
}

export default function ModalInfoReservation({
  isOpen,
  onClose,
  reservation,
  isPastReservation = false,
}: ModalInfoReservationProps) {
  const [userTeam, setUserTeam] = useState<string | null>(null);
  const auth = useGlobalStore(useShallow((state) => state.auth));
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [showReprogramationModal, setShowReprogramationModal] = useState(false);
  const [isOpenConfirmationCancelModal, setIsOpenConfirmationCancelModal] =
    useState(false);
  const currentUserId = auth.id;

  const currentTeam = useTeamDataStore(useShallow((state) => state.idTeam));

  const [isBooker, setIsBooker] = useState(false);
  const startDate = new Date(reservation.hours.horaInicio);
  const endDate = new Date(reservation.hours.horaFin);
  const numHoursReservation =
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600);

  const {
    data: teams,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["teams", reservation.idReservation],
    queryFn: () => getTeams(reservation.idReservation),
    enabled: !!reservation.idReservation,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  useEffect(() => {
    if (auth.name && teams && teams.teamA.members.includes(auth.name)) {
      setUserTeam(teams.teamA.idTeam);
    } else if (auth.name && teams && teams.teamB.members.includes(auth.name)) {
      setUserTeam(teams.teamB.idTeam);
    } else {
      setUserTeam(null);
    }
  }, [teams, auth.name]);

  useEffect(() => {
    if (auth.id == reservation.idBooker) {
      setIsBooker(true);
    }
  }, [auth.id]);

  const joinTeamMutation = useMutation({
    mutationFn: (id_team: string) => {
      if (!auth.id) {
        throw new Error("User ID is null");
      }
      if (isPastReservation) {
        throw new Error("No se puede unir a un equipo en una reserva pasada");
      }
      return joinTeam(reservation.idReservation, id_team, auth.id);
    },

    onSuccess: (_, id_team) => {
      queryClient.invalidateQueries({
        queryKey: ["teams", reservation.idReservation],
      });
      setUserTeam(id_team);
      toast({
        title: "Éxito",
        description: "Te has unido al equipo correctamente.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al unirse al equipo",
        description:
          error.message ||
          "No se pudo unir al equipo. Por favor, intenta de nuevo.",
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
      if (isPastReservation) {
        throw new Error(
          "No se puede desunir a un equipo en una reserva pasada"
        );
      }
      return desJoinTeam(reservation.idReservation, auth.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teams", reservation.idReservation],
      });
      setUserTeam(null);
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
        description:
          error.message ||
          "No se pudo salir del equipo. Por favor, intenta de nuevo.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const handleReschedule = () => {
    if (isPastReservation) {
      toast({
        title: "Error",
        description: "No se puede reprogramar una reserva pasada.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    setShowReprogramationModal(true);
    console.log("Reprogramar");
  };

  const handleJoinTeam = (teamId: string, teamName: string) => {
    joinTeamMutation.mutate(teamId);
  };

  const { mutate: cancel } = useMutation({
    mutationFn: () => {
      if (!currentUserId) return Promise.reject("Error en los datos");
      if (isPastReservation)
        return Promise.reject("No se puede cancelar una reserva pasada");
      return cancelarReserva(reservation.idReservation, currentUserId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["upcomingMatch", currentTeam, currentUserId],
      });
      toast({
        title: "Reserva cancelada",
        description: "La reserva ha sido cancelada exitosamente.",
        variant: "default",
      });
      setIsOpenConfirmationCancelModal(false);
      onClose();
    },

    onError: (error: Error) => {
      console.error(error);
      toast({
        title: "Error",
        description: ` ${error.message} Hubo un problema al cancelar la reserva por favor vuelva a interntarlo`,
        variant: "destructive",
      });
    },
  });

  const handleCancel = () => {
    cancel();
  };

  const handleLeaveTeam = () => {
    leaveTeamMutation.mutate();
  };

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
                onReschedule={handleReschedule}
                onCancel={() => setIsOpenConfirmationCancelModal(true)}
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
                  isLoading={
                    joinTeamMutation.status === "pending" ||
                    leaveTeamMutation.status === "pending"
                  }
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
        businessName={reservation.businessName}
        fieldType={reservation.FieldType}
        fieldImg={reservation.fieldImg}
        totalPrice={reservation.totalPrice}
        idField={reservation.idField}
        numHours={numHoursReservation}
        date={reservation.dateReservation}
        hour={
          startDate.toISOString().split("T")[1].substring(0, 5) +
          "-" +
          endDate.toISOString().split("T")[1].substring(0, 5)
        }
      />
      <ConfirmationModal
        isOpen={isOpenConfirmationCancelModal}
        onClose={() => setIsOpenConfirmationCancelModal(false)}
        onConfirm={handleCancel}
        title={`¿Estás seguro de cancelar la reserva hecha en ${reservation.businessName}?`}
        description="Al cancelar la reserva, se liberará el espacio para que otro usuario pueda reservarlo"
        icon={<CalendarOff className="w-14 h-14 text-red-500" />}
      />
    </>
  );
}
