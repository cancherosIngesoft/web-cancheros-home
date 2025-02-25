import { getPastMatches } from "@/actions/club_management/club_past_matches"
import { useQuery } from "@tanstack/react-query"
import CardPastMatch from "./CardPastMatch"
import { useGlobalStore, useTeamDataStore } from "@/store"

interface PastMatchesPanelProps {
    idTeam: string

}


const PastMatchesPanel = ({ idTeam }: PastMatchesPanelProps) => {
    const idUser = useGlobalStore((state) => state.auth.id)
    const teamId =useTeamDataStore((state) => state.idTeam)
    const { data: pastMatches, isLoading, isError, failureReason } = useQuery({
        queryKey: ["pastMatches", teamId],
        queryFn: () => getPastMatches(teamId, idUser ?? ""),
        staleTime: 1000 * 60 *5,
    })
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold">Partidos <span className="text-primary">Pasados</span></h2>
            <p className="text-sm text-gray-600">Observa los partido que ha jugado tu equipo</p>
            <hr className="w-full border-2 border-gray-300 rounded-full my-2"/>
            <div className="flex flex-col gap-2 mt-4">
                {pastMatches?.map((match) => (
                    <CardPastMatch key={match.idReservation} match={match} />
                ))}
            </div>

        </div>
    )
}

export default PastMatchesPanel