import { AlertCircle } from "lucide-react"
import CardReservation from "./CardReservation"
import type { ReservationActiveReturn } from "@/actions/reservation/reservation_action"
import { useSession } from "next-auth/react"
import LoadingReservation from "@/app/(bookerFlow)/mis_reservas/loading"
import { useEffect, useState } from "react"
import { is } from "date-fns/locale"

interface ReservationsListProps {
  isActive: boolean
  reservations: ReservationActiveReturn[] | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
}

export default function ReservationsList({ isActive, reservations, isLoading, isError, error }: ReservationsListProps) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const userId = session?.user?.id ?? ""
 

  useEffect(() => {
    if(reservations){
      setLoading(false)
    }
    if(isError){
      setLoading(false)
    }
  }, [reservations, isError])

  return loading ? (
    <LoadingReservation />
  ) : isError ? (
    <div className="flex items-center gap-2">
      <AlertCircle className="h-4 w-4 text-primary-40" />
      <span>Error al cargar las reservas: {error?.message}</span>
    </div>
  ) : !isLoading && (!reservations || reservations.length === 0) ? (
    <div className="flex items-center gap-2">
      <AlertCircle className="h-4 w-4 text-primary-40" />
      <span>No hay reservas {isActive ? "activas" : "pasadas"}</span>
    </div>
  ) : (
    <div className="space-y-4">
      {reservations?.map((reservation) => (
        <CardReservation key={reservation.idReservation} {...reservation} currentUserId={userId} isActive={isActive} />
      ))}
    </div>
  )
}
