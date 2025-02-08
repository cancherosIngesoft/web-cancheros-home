"use client"
import { AlertCircle } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getTeamActiveReservation } from "@/actions/reservation/reservation_action"
import CardUpcomingMatch from "./CardUpcomingMatch"
import { Skeleton } from "@/components/ui/skeleton"


interface UpcomingMatchProps {
  idUser: string
  idTeam: string
}

export default function UpcomingMatch({ idUser, idTeam }: UpcomingMatchProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["upcomingMatch", idTeam, idUser],
    queryFn: () => getTeamActiveReservation(idTeam, idUser),
    enabled: true,
    retry: 1,
  })

  return (
    <div className="w-full rounded-lg flex flex-col gap-2 p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold">Próximos partidos</h2>
      {isLoading ? (
        <Skeleton className="w-full h-32 md:h-40 rounded-md" />
      ) : isError ? (
        <>

          <AlertCircle className="h-4 w-4" />

          {error instanceof Error ? error.message : "An error occurred while fetching the data."}

        </>

      ) : (
        <div className="bg-white p-4 md:p-6 rounded-md shadow-sm">
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

