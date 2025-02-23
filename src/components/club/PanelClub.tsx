"use client"

import { Button } from "@/components/ui/button"
import { Shield, X } from "lucide-react"
import { useEffect, useState } from "react"
import { CreateClubModal } from "./CreateClubModal"
import CustomShield from "../icon/CustomShield"
import CreateTeamShieldIcon from "../icon/CreateTeamShield"
import { Card, CardContent } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { getClubs } from "@/actions/club_management/club"
import { Skeleton } from "@/components/ui/skeleton"
import CardClub from "./CardClub"
import CreateTeamShield from "../icon/CreateTeamShield"

interface Club {
  name: string
  players: number
  icon?: string
  idTeam: string
}

interface ClubsPanelProps {
  isOpen: boolean
  onClose: () => void
  navbarWidth: number
  navbarHeight: number 
}

export function PanelClub({ isOpen, onClose, navbarWidth,navbarHeight }: ClubsPanelProps) {
  const { data: session } = useSession()
  const userId = session?.user?.id ?? ""
  const [isClient, setIsClient] = useState(false);

  const {
    data: clubs,
    isLoading,
    isError,
    failureReason,
  } = useQuery({
    queryKey: ["clubs", userId],
    queryFn: () => getClubs(userId),
    enabled: !!userId,
    retry: 1,
  })
  const [isCreateClubOpen, setIsCreateClubOpen] = useState(false)
  useEffect(() => {
    // Este código solo se ejecuta en el navegador
    setIsClient(true);
  }, []);

  return (
    <>
      <div
        style={{
          left: isClient && window.innerWidth < 768 ? "0" : `${navbarWidth}px`, // Ajuste para móviles
          bottom: isClient && window.innerWidth < 768 ? `${navbarHeight}px` : "0", // Ajuste para móviles
        }}
        className={`fixed md:top-0 w-full h-[75vh] md:h-full md:w-[25vw]  bg-surface shadow-lg transform transition-all duration-300 ease-in-out py-4 ${isOpen ? "translate-y-0 md:translate-x-0 opacity-100 " : "translate-y-[120vh] md:-translate-x-[40vw] opacity-0  "
          } `}
      >
        <div className="flex flex-col h-full w-full p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CustomShield className="w-12 h-14" />
              <h2 className="text-xl font-semibold">Mis Clubes</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100 ">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <Button
            variant="outline"
            className="flex items-center justify-start font-semibold bg-transparent gap-2 mb-4 w-full h-14 border-[1px] border-tertiary-30"
            onClick={() => setIsCreateClubOpen(true)}
          >
            
              <CreateTeamShield className="w-full h-full size-20" /> {/* Asegúrate de usar w-full y h-full */}
          
            <span>Crear Equipo</span>
          </Button>
          <hr className="w-full border-gray-600 mb-2" />

          <p className="text-xs text-gray-600 mb-4">Estos son los clubes a los que perteneces actualmente</p>
          <div className="flex flex-row p-2 py-4 h-full overflow-y-auto w-full">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="w-full h-20 rounded-lg" />
                ))}
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Shield className="w-20 h-20 text-red-400" />
                <p className="text-sm text-red-400 mt-2">Error: {failureReason?.message}</p>
              </div>
            ) : !clubs || clubs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Shield className="w-20 h-20 text-gray-400" />
                <p className="text-sm text-gray-400">No perteneces a ningún club</p>
              </div>
            ) : (
              <div className="space-y-3 w-full">
                {clubs.map((club) => (
                  <CardClub key={club.idTeam} club={club} idUser={userId} onClosePanel={onClose}/>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
      <CreateClubModal isOpen={isCreateClubOpen} onClose={() => setIsCreateClubOpen(false)} />
    </>
  )
}

