import { deleteMember, ReturnPlayersClub } from "@/actions/club_management/club_players_actions";
import SoccerShoe from "@/components/icon/SoccerShoe";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useGlobalStore, useShallow, useTeamDataStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from 'lucide-react';
import { useState } from "react";
import { UserRoundX } from 'lucide-react';

interface CardPlayerProps {
    player: ReturnPlayersClub;
}

const CardPlayer = ({ player }: { player: ReturnPlayersClub }) => {
    const auth = useGlobalStore(useShallow((state) => state.auth));
    const idCaptain = useTeamDataStore((state) => state.idCaptain);
    const idTeam = useTeamDataStore((state) => state.idTeam);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const { toast } = useToast()
    const queryClient = useQueryClient()


    const deleteUser = useMutation({
        mutationFn: ({ idTeam, idUser, idUserWhoDelete }: { idTeam: string, idUser: string, idUserWhoDelete: string | null }) => {
            if (idUserWhoDelete === null) {
                throw new Error("Usuario no logueado")
            }
            return deleteMember(idTeam, idUser, idUserWhoDelete);
        },
        onSuccess: () => {
            queryClient.refetchQueries({queryKey:["players", idTeam]})
            toast({
                title: "Usuario eliminado",
                description: "el usuario ha sido eliminado del club correctamente",
            })
           

        },
        onError: (error: Error) => {
            toast({
                title: "Error al eliminar",
                description: error.message,
                variant: "destructive",
            })
        },
    })


    return (
        <div className="w-full flex flex-col gap-2 md:flex-row items-center justify-between  bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-row items-center gap-4">
                <div className="rounded-full  w-8 aspect-square  bg-blue-300 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{player.name.charAt(0)}</span>
                </div>
                <span className="text-md font-medium">{player.name}</span>
                {player.isCaptain === true ? (

                    <span className="text-sm font-bold text-tertiary">Capitan</span>

                ) : (
                    <SoccerShoe className="w-8 h-8 text-tertiary" />
                )}
            </div>
            <div>
                {auth.id == idCaptain &&
                    <Button
                        size="icon"
                        className="bg-destructive/30 hover:bg-destructive/70 text-destructive"
                        onClick={() => setIsOpenConfirmation(true)}
                    >
                        <Trash2 className="w-8 h-8 x" />
                    </Button>
                }

            </div>
            <ConfirmationModal
                title="Eliminar jugador"
                isOpen={isOpenConfirmation}
                onClose={() => setIsOpenConfirmation(false)}
                description={`¿Estás seguro de que deseas rescindir el contrato a ${player.name} del club?`}
                onConfirm={() => deleteUser.mutate({ idTeam, idUser: player.idPlayer, idUserWhoDelete: auth.id })}
                icon={<UserRoundX className="w-12 h-12 text-destructive" />}
            />

        </div>
    );
}

export default CardPlayer;