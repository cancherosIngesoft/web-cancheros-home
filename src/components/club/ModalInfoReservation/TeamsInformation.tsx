"use client"


import { TeamsReturn } from "@/actions/reservation/club_reservation_action"
import { Button } from "@/components/ui/button"
import { isPast } from "date-fns"


interface TeamsInformationProps {
  teams: TeamsReturn
  onJoinTeam: (teamId: string, teamName: string) => void
  onLeaveTeam: () => void
  isLoading: boolean
  userTeam: string | null
  isPastReservation: boolean

}

export default function TeamsInformation({
  teams,
  onJoinTeam,
  onLeaveTeam,
  isLoading,
  userTeam,
  isPastReservation,

}: TeamsInformationProps) {
  return (
    <div className="flex-1 flex flex-col md:border-l-2 md:border-gray-200 h-full">
      <div className={`overflow-hidden  relative ${isPastReservation ? "md:h-[100%]" : "md:h-[90%]"}`}>
        <div className="flex flex-col md:grid md:grid-cols-2 h-full w-full">
          {/* Team A */}
          <div className=" bg-[url(/CampinAzul.jpg)] bg-cover  md:h-full">
            <div className=" p-4 w-full h-full gap-2 flex flex-col items-center rounded-lg md:h-full">
              <div className=" w-4/5 bg-blue-200/70 rounded-lg p-2  flex flex-row gap-4 items-center justify-center text-center h-contain text-lg sm:text-lg font-bold text-blue-600 ">
                <h3 >{teams.TeamA.teamName}</h3>
                {teams.TeamA.score && teams.TeamB.score &&
                  <div className="w-8 h-8 bg-white/50 rounded-md flex justify-center items-center">
                    <span className={`text-xl ${teams.TeamA.score == teams.TeamB.score ? "text-yellow-500" : teams.TeamA.score > teams.TeamB.score ? "text-primary" : "text-destructive"}`}>{teams.TeamA.score} </span>
                  </div>
                }
              </div>

              <div className="flex-1 flex flex-col w-full md:h-[22rem] md:flex-none space-y-1 bg-blue-600/30 rounded-lg p-2 justify-between border-2 border-blue-600">
                <div className="flex flex-col gap-1 overflow-y-auto max-h-80 ">
                  {teams.TeamA.members.map((member: string, index: number) => (
                    <div
                      key={index}
                      className="text-xs text-center p-2 flex flex-row items-center gap-2 bg-blue-600/80 text-white font-semibold rounded"
                    >
                      <div className="rounded-full bg-white min-h-2 min-w-2 max-w-2 max-h-2 " />
                      <span className="truncate">{member}</span>
                    </div>
                  ))}
                </div>
                {!isPastReservation &&
                  <Button
                    className="mt-4 w-full border-blue-500 border-2 bg-transparent hover:bg-blue-700 font-bold text-white bg-blue-500"
                    variant="outline"
                    onClick={() => onJoinTeam(teams.TeamA.idTeam, teams.TeamA.teamName)}
                    disabled={isLoading || userTeam !== null}
                  >
                    {isLoading ? "Cargando..." : userTeam === teams.TeamA.idTeam ? "Unido" : "Unirme"}
                  </Button>
                }

              </div>
            </div>

          </div>

          {/* VS for mobile */}
          <div className="flex md:hidden justify-center items-center h-16 my-4">
            <div className="rounded-full bg-white/70 ">
              <h1 className="font-bold text-3xl bg-gradient-to-t from-green-900 to-green-500 bg-opacity-70  text-transparent bg-clip-text p-2 rounded-full">
                VS
              </h1>
            </div>
          </div>

          {/* VS for desktop */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none ">
            <div className="rounded-full bg-white/70 ">
              <h1 className="font-bold text-3xl bg-gradient-to-t from-green-900 to-green-500 bg-opacity-70  text-transparent bg-clip-text p-2 rounded-full">
                VS
              </h1>
            </div>
          </div>

          {/* Team B */}
          <div className=" bg-[url(/CampinRojo.jpg)] bg-cover  md:h-full">
            <div className=" gap-2 p-4 w-full h-full  flex flex-col items-center rounded-lg md:h-full">
              <div className=" w-4/5 bg-orange-200/70 rounded-lg p-2  flex flex-row gap-4 items-center justify-center text-center h-contain text-lg sm:text-lg font-bold text-orange-600 ">
                {teams.TeamA.score && teams.TeamB.score &&
                  <div className="w-8 h-8 bg-white/50 rounded-md flex justify-center items-center">
                    <span className={`text-xl ${teams.TeamA.score == teams.TeamB.score ? "text-yellow-500" : teams.TeamA.score < teams.TeamB.score ? "text-primary" : "text-destructive"}`}>{teams.TeamB.score} </span>
                  </div>
                }
                <h3 >{teams.TeamB.teamName}</h3>

              </div>
              <div className="flex-1  md:h-[22rem] md:flex-none flex flex-col w-full space-y-1 bg-orange-600/30 rounded-lg p-2 justify-between border-2 border-orange-600">
                <div className="flex flex-col gap-1 overflow-y-auto max-h-80">
                  {teams.TeamB.members.map((member, index) => (
                    <div
                      key={index}
                      className="text-xs text-center p-2 flex flex-row items-center gap-2 bg-orange-400/80 text-white font-semibold rounded"
                    >
                      <div className="rounded-full bg-white min-h-2 min-w-2 max-w-2 max-h-2 " />
                      <span className="truncate">{member}</span>
                    </div>
                  ))}
                </div>
                {!isPastReservation &&
                  <Button
                    className="mt-4 w-full border-orange-500 border-2 bg-transparent hover:bg-orange-600 hover:text-white font-bold text-white bg-orange-300"
                    variant="outline"
                    onClick={() => onJoinTeam(teams.TeamB.idTeam, teams.TeamB.teamName)}
                    disabled={isLoading || userTeam !== null}
                  >
                    {isLoading ? "Cargando..." : userTeam === teams.TeamB.idTeam ? "Unido" : "Unirme"}
                  </Button>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
      {!isPastReservation &&
        <div className="w-full flex-1 flex justify-center items-center rounded-b-lg">


          <Button
            variant="outline"
            className="w-full border-2 border-primary-50 mx-4 my-2 bg-primary-90 hover:bg-primary-60 font-bold hover:text-white"
            onClick={onLeaveTeam}
            disabled={isLoading || userTeam === null}
          >
            {isLoading ? "Cargando..." : "Quitar selección"}
          </Button>


        </div>
      }
    </div>
  )
}

