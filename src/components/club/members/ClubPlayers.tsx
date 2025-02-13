import { getClubPlayers, ReturnPlayersClub } from "@/actions/club_management/club_players_actions"
import { useQuery } from "@tanstack/react-query"
import CardPlayer from "./CardPlayer"
import { Button } from "@/components/ui/button"

interface ClubPlayersProps {
    //players:ReturnPlayersClub
    idTeam: string
    teamName: string
}

const ClubPlayers = ({ idTeam, teamName }: ClubPlayersProps) => {
    const { data: players } = useQuery({
        queryKey: ["players", idTeam],
        queryFn: () => getClubPlayers(idTeam),
        staleTime: 1000 * 60,
    })
    return (
        <div className="w-full h-full flex flex-col p-4 md:p-4">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-bold">Jugadores de <span className="text-primary">{teamName}</span></h1>
                <Button variant="outline" className="border-2 border-destructive text-destructive font-bold hover:bg-destructive hover:text-white">
                    Salir del club
                </Button>
            </div>
            <div className="w-full mt-4 flex flex-row justify-between items-center gap-4">
                <hr className="flex-1 border-2 border-gray-300 rounded-lg" />
                <span className="text-sm text-gray-400">{players?.length} jugadores</span>
                <hr className="flex-1 border-2 border-gray-300 rounded-lg" />
            </div>
            <div className="flex flex-col mt-2 w-full gap-2">
                {players?.map((player) => (
                    <CardPlayer key={player.idPlayer} player={player} />
                ))}

            </div>

        </div>
    )
}

export default ClubPlayers