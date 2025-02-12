"use client"

import { Button } from "@/components/ui/button"
import type { TeamReservationReturn } from "@/actions/reservation/reservation_action"

interface TeamsInformationProps {
  reservation: TeamReservationReturn
  onJoinTeam: (teamId: string, teamName: string) => void
  onLeaveTeam: (teamId: string, teamName: string) => void
  isLoading: boolean
}

export default function TeamsInformation({ reservation, onJoinTeam, onLeaveTeam, isLoading }: TeamsInformationProps) {
  return (
    <div className="flex-1 flex flex-col md:border-l-2 md:border-gray-200 h-full">
      <div className="overflow-hidden md:h-[80%] relative">
        <div className="flex flex-col md:grid md:grid-cols-2 h-full w-full">
          {/* Team A */}
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg md:h-full">
            <h3 className="text-lg sm:text-xl font-bold text-blue-600 mb-4">Equipo A</h3>
            <div className="flex-1 flex flex-col w-full space-y-1 bg-blue-600/30 rounded-lg p-2 justify-between">
              <div className="flex flex-col gap-1 overflow-y-auto max-h-80 ">
                {reservation.TeamA.members.map((member, index) => (
                  <div
                    key={index}
                    className="text-sm text-center p-2 flex flex-row items-center gap-2 bg-blue-600/20 rounded"
                  >
                    <div className="rounded-full bg-white w-4 h-4"></div>
                    {member}
                  </div>
                ))}
              </div>
              <Button
                className="mt-4 w-full border-blue-500 border-2 bg-transparent hover:bg-blue-400 font-bold"
                variant="outline"
                onClick={() => onJoinTeam(reservation.TeamA.idTeam, reservation.TeamA.teamName)}
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Unirme"}
              </Button>
            </div>
          </div>

          {/* VS for mobile */}
          <div className="flex md:hidden justify-center items-center h-16 my-4">
            <div className="rounded-full bg-white bg-opacity-70 ">
              <h1 className="font-bold text-3xl bg-gradient-to-t from-green-900 to-green-500 bg-opacity-70  text-transparent bg-clip-text p-2 rounded-full">
                VS
              </h1>
            </div>
          </div>

          {/* VS for desktop */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none ">
            <div className="rounded-full bg-white bg-opacity-70 ">
              <h1 className="font-bold text-3xl bg-gradient-to-t from-green-900 to-green-500 bg-opacity-70  text-transparent bg-clip-text p-2 rounded-full">
                VS
              </h1>
            </div>
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center p-4 bg-orange-50 rounded-lg md:h-full">
            <h3 className="text-lg sm:text-xl font-bold text-orange-600 mb-4">Equipo B</h3>
            <div className="flex-1 flex flex-col w-full space-y-1 bg-orange-600/30 rounded-lg p-2 justify-between">
              <div className="flex flex-col gap-1 overflow-y-auto max-h-80">
                {reservation.TeamB.members.map((member, index) => (
                  <div
                    key={index}
                    className="text-sm text-center p-2 flex flex-row items-center gap-2 bg-orange-400/20 rounded"
                  >
                    <div className="rounded-full bg-white w-4 h-4" />
                    {member}
                  </div>
                ))}
              </div>
              <Button
                className="mt-4 w-full border-orange-500 border-2 bg-transparent hover:bg-orange-600 hover:text-white font-bold"
                variant="outline"
                onClick={() => onJoinTeam(reservation.TeamB.idTeam, reservation.TeamB.teamName)}
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Unirme"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-20 flex justify-center">
        <Button
          variant="ghost"
          className="w-full mx-4 my-2 bg-gray-200 hover:bg-gray-300"
          onClick={() => onLeaveTeam(reservation.idReservation, "Ambos equipos")}
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Quitar selección"}
        </Button>
      </div>
    </div>
  )
}

