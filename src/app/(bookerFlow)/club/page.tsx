"use client"

import TeamInfo from "@/components/club/TeamInfo"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useTeamDataStore } from "@/store"
import { Card, CardContent } from "@/components/ui/card"
import UpcomingMatch from "@/components/club/UpcomingMatch"

const TeamPage = () => {
  const { teamName } = useTeamDataStore()

  const NoTeamSelected = () => (
    <Card className="border-0 shadow-none">
      <CardContent className="flex items-center justify-center h-64">
        <p className="text-xl text-muted-foreground text-center">No has seleccionado ningún equipo aún, ve a al panel de equipos y obesrva el equipos que deseas.</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="w-full h-full">
      <Tabs defaultValue="mi-club" className="w-full">
        <TabsList className="w-full justify-start border-b">
          <TabsTrigger value="mi-club">Mi club</TabsTrigger>
          <TabsTrigger value="partidos-pasados">Partidos pasados</TabsTrigger>
          <TabsTrigger value="participantes">Participantes</TabsTrigger>
        </TabsList>
        {teamName?
        <>
        <TabsContent value="mi-club" className="space-y-6">
            <TeamInfo />
          <UpcomingMatch />
        </TabsContent>

        <TabsContent value="partidos-pasados">
          <div className="p-6">
            <h2 className="text-2xl font-bold">Partidos Pasados</h2>
            {/* Contenido de partidos pasados */}
          </div>
        </TabsContent>

        <TabsContent value="participantes">
          <div className="p-6">
            <h2 className="text-2xl font-bold">Participantes</h2>
            {/* Contenido de participantes */}
          </div>
        </TabsContent>
        </>:
        <NoTeamSelected />
            
        }
        
      </Tabs>
    </div>
  )
}

export default TeamPage

