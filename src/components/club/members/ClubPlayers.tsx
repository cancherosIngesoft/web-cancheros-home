"use client"

import { getClubPlayers, LeaveClub } from "@/actions/club_management/club_players_actions"
import { useQuery } from "@tanstack/react-query"
import CardPlayer from "./CardPlayer"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CircleAlert, LogOut } from "lucide-react"
import { useState } from "react"

import { useShallow } from "zustand/react/shallow"
import { useRouter } from "next/navigation"
import { useGlobalStore } from "@/store"
import { useToast } from "@/hooks/use-toast"
import ConfirmationModal from "@/components/modals/ConfirmationModal"
import { FilePen } from 'lucide-react';
import AddPlayersModal from "./AddPlayersModal"

interface ClubPlayersProps {
  idTeam: string
  teamName: string
}

const ClubPlayers = ({ idTeam, teamName }: ClubPlayersProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const auth = useGlobalStore(useShallow((state) => state.auth))
  const [isOpenAddPlayersModal, setIsOpenAddPlayersModal] = useState(false)

  const {
    data: players,
    isLoading,
    isError,
    failureReason,
  } = useQuery({
    queryKey: ["players", idTeam],
    queryFn: () => getClubPlayers(idTeam),
    staleTime: 1000 * 60,
    retry: 2,
  })

  const handleLeaveClub = () => {
    setIsModalOpen(true)
  }

  const confirmLeaveClub = async () => {
    try {
      if (auth.id) {
        await LeaveClub(idTeam, auth.id)
      } else {
        throw new Error("User ID is null")
      }
      toast({
        title: "Exitoso",
        description: "Has salido del club exitosamente",
        variant: "default",
      })
      router.push("/reservar_cancha")
    } catch (error) {
      toast({
        title: "Error",
        description: `Fallo al salir del club: ${error}`,
        variant: "destructive",
      })
    }
    setIsModalOpen(false)
  }

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <h1 className="text-2xl md:text-3xl font-bold">
          Jugadores de <span className="text-primary">{teamName}</span>
        </h1>
        <Button
          variant="outline"
          className="border-2 border-destructive text-destructive font-bold hover:bg-destructive hover:text-white"
          onClick={handleLeaveClub}
        >
          Salir del club
        </Button>
      </div>
      <div className="w-full mt-4 flex flex-row justify-between items-center gap-4">
        <hr className="flex-1 border-2 border-gray-300 rounded-lg" />
        <span className="text-sm text-gray-400">{players?.length} jugadores</span>
        <hr className="flex-1 border-2 border-gray-300 rounded-lg" />
      </div>
      <Button variant="outline"
        className="border-2 flex flex-row p-0 border-primary w-40 h-12 text-primary font-bold mt-4"
        onClick={() => setIsOpenAddPlayersModal(true)}
      >
        <FilePen className="min-w-6 min-h-6" />
        Realizar fichajes

      </Button>
      <div className="flex flex-col mt-2 w-full gap-2">
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="w-full h-12 bg-gray-300" />)}
        {isError && (
          <div className="w-full h-full flex flex-col gap-2 items-center justify-center rounded-lg">
            <CircleAlert className="w-12 h-12 text-red-500" />
            <p className="text-red-500">{failureReason?.toString()}</p>
          </div>
        )}
        {players?.map((player) => (
          <CardPlayer key={player.idPlayer} player={player} />
        ))}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmLeaveClub}
        title="Salir del Club"
        description="¿Estás seguro de que quieres salir de este club? Esta acción no se puede deshacer."
        icon={<LogOut className="w-16 h-16 text-destructive my-4" />}
      />
      <AddPlayersModal
        isOpen={isOpenAddPlayersModal}
        onClose={() => setIsOpenAddPlayersModal(false)} 
        idTeam={idTeam} 
        idUserWhoAdd={auth.id}
        />
    </div>
  )
}

export default ClubPlayers

