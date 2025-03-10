"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { getActiveReservation, getPastReservation } from "@/actions/reservation/reservation_action"
import ReservationsList from "@/components/reservation/ReservationList"

const queryClient = new QueryClient()

function MisReservasContent() {
  const { data: session } = useSession()
  const userId = session?.user?.id ?? ""

  const {
    data: activeReservationsQuery,
    isLoading: activeReservationsLoading,
    isError: activeReservationsError,
    failureReason: activeReservationsFailureReason,
  } = useQuery({
    queryKey: ["activeReservations", userId],
    queryFn: () => getActiveReservation(userId),
    enabled: !!userId,
  })

  const {
    data: pastReservationsQuery,
    isLoading: pastReservationsLoading,
    isError: pastReservationsError,
    failureReason: pastReservationsFailureReason,
  } = useQuery({
    queryKey: ["pastReservations", userId],
    queryFn: () => getPastReservation(userId),
    enabled: !!userId,
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl text-primary-40 font-bold">Tus Reservas</h1>
          <p className="text-gray-500 mt-2">
            Aquí podrás ver todas tus reservas, incluyendo detalles de fechas, horarios y canchas utilizadas. ¡Mantén
            todo bajo control!
          </p>
        </div>
        <Link href="/reservar_cancha">
          <Button className="font-bold w-40">Ve a reservar</Button>
        </Link>
      </div>

      <Tabs defaultValue="active" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full flex flex-row flex-shrink-0 gap-2 px-2 items-center h-12">
          <TabsTrigger

            className="data-[state=active]:bg-green-100 h-8 data-[state=active]:text-green-700 text-xs sm:text-sm md:text-base py-2 sm:py-3"
            value="active">
            Reservas Activas
          </TabsTrigger>
          <TabsTrigger

            className="data-[state=active]:bg-green-100 h-8 data-[state=active]:text-green-700 text-xs sm:text-sm md:text-base py-2 sm:py-3"
            value="past">
            Reservas Pasadas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <ReservationsList
            isActive={true}
            reservations={activeReservationsQuery}
            isLoading={activeReservationsLoading}
            isError={activeReservationsError}
            error={activeReservationsFailureReason}
          />
        </TabsContent>
        <TabsContent value="past">
          <ReservationsList
            isActive={false}
            reservations={pastReservationsQuery}
            isLoading={pastReservationsLoading}
            isError={pastReservationsError}
            error={pastReservationsFailureReason}

          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function MisReservas() {
  return (
    <QueryClientProvider client={queryClient}>
      <MisReservasContent />
    </QueryClientProvider>
  )
}

