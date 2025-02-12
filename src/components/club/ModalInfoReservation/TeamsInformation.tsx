"use client"


import { TeamsReturn } from "@/actions/reservation/club_reservation_action"
import { Button } from "@/components/ui/button"


interface TeamsInformationProps {
  teams: TeamsReturn
  onJoinTeam: (teamId: string, teamName: string) => void
  onLeaveTeam: () => void
  isLoading: boolean
  userTeam: string | null
}

export default function TeamsInformation({
  teams,
  onJoinTeam,
  onLeaveTeam,
  isLoading,
  userTeam,
}: TeamsInformationProps) {
  return (
    <div className="flex-1 flex flex-col md:border-l-2 md:border-gray-200 h-full">
      <div className="overflow-hidden md:h-[80%] relative">
        <div className="flex flex-col md:grid md:grid-cols-2 h-full w-full">
          {/* Team A */}
          <div className=" bg-[url(/CampinAzul.jpg)] bg-cover  md:h-full">
            <div className=" p-4 w-full h-full  flex flex-col items-center rounded-lg md:h-full">
              <h3 className="text-lg sm:text-xl font-bold text-blue-600 mb-4">Equipo A</h3>
              <div className="flex-1 flex flex-col w-full space-y-1 bg-blue-600/30 rounded-lg p-2 justify-between border-2 border-blue-600">
                <div className="flex flex-col gap-1 overflow-y-auto max-h-80 ">
                  {teams.TeamA.members.map((member: string, index: number) => (
                    <div
                      key={index}
                      className="text-sm text-center p-2 flex flex-row items-center gap-2 bg-blue-600/60 text-white font-semibold rounded"
                    >
                      <div className="rounded-full bg-white w-4 h-4"></div>
                      {member}
                    </div>
                  ))}
                </div>
                <Button
                  className="mt-4 w-full border-blue-500 border-2 bg-transparent hover:bg-blue-400 font-bold text-white"
                  variant="outline"
                  onClick={() => onJoinTeam(teams.TeamA.idTeam, teams.TeamA.teamName)}
                  disabled={isLoading || userTeam !== null}
                >
                  {isLoading ? "Cargando..." : userTeam === teams.TeamA.idTeam ? "Unido" : "Unirme"}
                </Button>
              </div>
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
          <div className=" bg-[url(/CampinRojo.jpg)] bg-cover  md:h-full">
            <div className=" p-4 w-full h-full  flex flex-col items-center rounded-lg md:h-full">
              <h3 className="text-lg sm:text-xl font-bold text-orange-600 mb-4">Equipo B</h3>
              <div className="flex-1 flex flex-col w-full space-y-1 bg-orange-600/30 rounded-lg p-2 justify-between border-2 border-orange-600">
                <div className="flex flex-col gap-1 overflow-y-auto max-h-80">
                  {teams.TeamB.members.map((member, index) => (
                    <div
                      key={index}
                      className="text-sm text-center p-2 flex flex-row items-center gap-2 bg-orange-400/60 text-white font-semibold rounded"
                    >
                      <div className="rounded-full bg-white w-4 h-4" />
                      {member}
                    </div>
                  ))}
                </div>
                <Button
                  className="mt-4 w-full border-orange-500 border-2 bg-transparent hover:bg-orange-600 hover:text-white font-bold"
                  variant="outline"
                  onClick={() => onJoinTeam(teams.TeamB.idTeam, teams.TeamB.teamName)}
                  disabled={isLoading || userTeam !== null}
                >
                  {isLoading ? "Cargando..." : userTeam === teams.TeamB.idTeam ? "Unido" : "Unirme"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-20 flex justify-center">
        <Button
          variant="ghost"
          className="w-full mx-4 my-2 bg-gray-200 hover:bg-gray-300"
          onClick={onLeaveTeam}
          disabled={isLoading || userTeam === null}
        >
          {isLoading ? "Cargando..." : "Quitar selección"}
        </Button>
      </div>
    </div>
  )
}

