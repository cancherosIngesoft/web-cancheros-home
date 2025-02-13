import { ReturnPlayersClub } from "@/actions/club_management/club_players_actions";
import SoccerShoe from "@/components/icon/SoccerShoe";

const CardPlayer = ({ player }: { player: ReturnPlayersClub }) => {
    return (
        <div className="w-full flex flex-row items-center justify-between  bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-row items-center gap-4">
                <div className="rounded-full  w-8 aspect-square  bg-blue-300 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{player.name.charAt(0)}</span>
                </div>
                <span className="text-md font-medium">{player.name}</span>
                {player.isCaptain ===true ? (
                    
                        <span className="text-sm font-bold text-tertiary">Capitan</span>
                    
                
                ):(
                    
                        <SoccerShoe className="w-8 h-8 text -tertiary" />
                    
                )}
            </div>
            <div>
                eliminar
            </div>
        </div>
    );
}

export default CardPlayer;