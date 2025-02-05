import type { ReturnClub } from "@/actions/club_management/club"
import CustomShield from "../icon/CustomShield"
import { Footprints, User } from "lucide-react"
import SoccerShoe from "../icon/SoccerShoe"
import PlayerWithBall from "../icon/PlaterWithBall"

const CardClub = ({ club }: { club: ReturnClub }) => {
    return (
        <div className="flex items-center bg-[#4CAF50] rounded-lg text-white w-full h-[5.5rem] shadow-md ">
            {/* Icon Container */}
            <div className="w-2/5 h-full relative overflow-hidden flex items-center justify-center rounded-l-lg">
                <div className="w-28 h-28 absolute -left-[2.1rem]  bg-white rounded-full flex items-center justify-end p-4 flex-shrink-0 z-10 ">
                    {club.icon ? (
                        <img src={club.icon || "/placeholder.svg"} alt={club.name} className=" w-full h-full object-cover rounded-full " />
                    ) : (
                        <CustomShield className="  w-12 h-12 text-[#4CAF50] justify-self-end" />
                    )}
                </div>
            </div>


            {/* Content Container */}
            <div className="flex flex-col gap-1 w-full">
                {/* Club Name Section */}
                <div className="flex flex-1 items-center gap-2  border-b-4 border-white w-full px-2" >
                    <span className="font-semibold text-lg">{club.name}</span>
                    <SoccerShoe className="w-8 h-8" />
                </div>

                {/* Players Section */}
                <div className="flex flex-1 items-center gap-2 w- full px-2">
                    <PlayerWithBall className="w-6 h-6" />
                    <span className="text-md font-bold">{club.numberPlayers}</span>
                </div>
            </div>



        </div>
    )
}

export default CardClub

