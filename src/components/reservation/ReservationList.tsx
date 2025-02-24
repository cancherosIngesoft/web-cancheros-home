import { AlertCircle } from "lucide-react";
import CardReservation from "./CardReservation";
import type { ReservationActiveReturn } from "@/actions/reservation/reservation_action";
import { useSession } from "next-auth/react";
import LoadingReservation from "@/app/(bookerFlow)/mis_reservas/loading";
import { useEffect, useState } from "react";

interface ReservationsListProps {
  isActive: boolean;
  reservations: ReservationActiveReturn[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export default function ReservationsList({
  isActive,
  reservations,
  isLoading,
  isError,
  error,
}: ReservationsListProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const userId = session?.user?.id ?? "";

  useEffect(() => {
    if (reservations || isError) {
      setLoading(false);
    }
  }, [reservations, isError]);

  // Ordenar las reservas (si existen)
  const sortedReservations = reservations?.slice().sort((a, b) => {
    const dateA = new Date(a.hours.horaInicio).getTime();
    const dateB = new Date(b.hours.horaInicio).getTime();
    return dateA - dateB; // Orden descendente
  });

  return loading ? (
    <LoadingReservation />
  ) : isError ? (
    <div className="flex flex-col w-full h-full justify-center items-center gap-2 ">
      <AlertCircle className="h-20 w-20 text-gray-500" />
      <span className="text-xl text-gray-500">
        Error al cargar las reservas: {error?.message}
      </span>
    </div>
  ) : !isLoading && (!sortedReservations || sortedReservations.length === 0) ? (
    <div className="flex flex-col w-full h-full justify-center items-center gap-2 ">
      <AlertCircle className="h-20 w-20 text-gray-500" />
      <span className="text-xl text-gray-500">
        No hay reservas {isActive ? "activas" : "pasadas"}
      </span>
      <span className="text-xl font-bold text-primary-30">
        ¡Ve a reservas, y comienza en tu experiencia en cancheros!
      </span>
    </div>
  ) : (
    <div className="space-y-4">
      {sortedReservations?.map((reservation) => (
        <CardReservation
          key={reservation.idReservation}
          {...reservation}
          currentUserId={userId}
          isActive={isActive}
        />
      ))}
    </div>
  );
}
