"use client"

import TeamInfo from "@/components/club/TeamInfo"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useTeamDataStore } from "@/store"
import { Card, CardContent } from "@/components/ui/card"
import UpcomingMatch from "@/components/club/UpcomingMatch"
import { useQuery } from "@tanstack/react-query"
import { getClubPlayers } from "@/actions/club_management/club_players_actions"
import ClubPlayers from "@/components/club/members/ClubPlayers"
import PastMatchesPanel from "@/components/club/pastMatches/PastMatchesPanel"

const TeamPage = () => {
    const { teamName, idTeam } = useTeamDataStore()

    const NoTeamSelected = () => (
        <Card className="border-0 shadow-none">
            <CardContent className="flex items-center justify-center h-64">
                <p className="text-xl text-muted-foreground text-center">No has seleccionado ningún equipo aún, ve a al panel de equipos y selecciona el equipo que deseas ver.</p>
            </CardContent>
        </Card>
    )



    return (
        <div className="w-full h-full">
            <Tabs className="w-full h-full flex flex-col" defaultValue="club">
                <TabsList className="grid w-full grid-cols-3 h-12 flex-shrink-0 gap-2 px-2 m-0" >
                    <TabsTrigger
                        className="data-[state=active]:bg-green-100 h-8 data-[state=active]:text-green-700 text-xs sm:text-sm md:text-base py-2 sm:py-3"
                        value="club">Mi club</TabsTrigger>
                    <TabsTrigger
                        className="data-[state=active]:bg-green-100 h-8 data-[state=active]:text-green-700 text-xs sm:text-sm md:text-base py-2 sm:py-3"
                        value="partidos-pasados">Partidos pasados</TabsTrigger>
                    <TabsTrigger
                        className="data-[state=active]:bg-green-100 h-8 data-[state=active]:text-green-700 text-xs sm:text-sm md:text-base py-2 sm:py-3"
                        value="jugadores">Jugadores</TabsTrigger>
                </TabsList>
                {teamName ?
                    <div className="w-full  h-full">
                        <TabsContent value="club" className="space-y-6">
                            <TeamInfo />
                            <UpcomingMatch idTeam={idTeam} />
                        </TabsContent>

                        <TabsContent value="partidos-pasados">
                            <PastMatchesPanel idTeam={idTeam} />
                        </TabsContent>

                        <TabsContent value="jugadores">
                            <ClubPlayers idTeam={idTeam} teamName={teamName} />
                        </TabsContent>
                    </div> :
                    <NoTeamSelected />

                }

            </Tabs>
        </div>
    )
}

export default TeamPage

