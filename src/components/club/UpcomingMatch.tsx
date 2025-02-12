"use client"
import { AlertCircle } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import CardUpcomingMatch from "./CardUpcomingMatch"
import { Skeleton } from "@/components/ui/skeleton"
import { useGlobalStore, useShallow } from "@/store"
import { getTeamActiveReservation } from "@/actions/reservation/club_reservation_action"


interface UpcomingMatchProps {
  idTeam: string
}

export default function UpcomingMatch({ idTeam }: UpcomingMatchProps) {
  const auth = useGlobalStore(useShallow((state) => state.auth));

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["upcomingMatch", idTeam, auth.id],
    queryFn: () => getTeamActiveReservation(idTeam, auth.id ?? ""),
    enabled: !!auth.id,
    retry: 1,
  })

  return (
    <div className="w-full rounded-lg flex flex-col gap-2 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold">Próximos partidos</h2>
      {isLoading ? (
        <Skeleton className="w-full h-32 md:h-40 rounded-md" />
      ) : isError ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-red-100 text-red-500 rounded-md p-4 md:p-6">

          <AlertCircle className="h-12 w-12" />
          <span className="text-md font-medium">
            {error instanceof Error ? error.message : "An error occurred while fetching the data."}
          </span>
          <span className="text-sm mt-2 text-gray-500">Por favor vuelva a intentarlo.</span>



        </div>

      ) : (
        <div className="bg-white p-4 md:p-6 rounded-md shadow-sm flex flex-row flex-wrap gap-4 justify-around">
          {data && data.length > 0 ? (
            data.map((reservation) => <CardUpcomingMatch key={reservation.idReservation} {...reservation} />)
          ) : (
            <p className="text-center text-gray-500">No hay partidos próximos.</p>
          )}
        </div>
      )}
    </div>
  )
}

