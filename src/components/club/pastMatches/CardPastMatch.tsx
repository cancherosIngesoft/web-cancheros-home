import { ReturnPastMatches } from "@/actions/club_management/club_past_matches"
import FieldIcon from "@/components/icon/FieldIcon"
import ShieldTeamAIcon from "@/components/icon/ShieldTeamAIcon"
import ShieldTeamBIcon from "@/components/icon/ShieldTeamBIcon"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapIcon } from "lucide-react"
import { MouseEvent } from "react"


const CardPastMatch = ({ idMatch, date, bussinesName, hour, score }: ReturnPastMatches) => {
    const handleAddResult = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("Agregar resultado")
    }
    return (
        <div className="flex items-center p-1 px-4 justify-between bg-white rounded-lg  w-full h-[5.5rem] shadow-lg hover:bg-primary-95 hover:cursor-pointer ">
            <div className="flex items-center gap-4 p-4">
                <FieldIcon className="w-10 h-10 text-primary" />
                <div className="flex-col  gap-2 text-xs">
                    <p className="text-base font-bold">{score[0].teamName + " VS " + score[1].teamName}</p>
                    <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-1">
                        <div className="flex  flex-row items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{date}</span>
                        </div>
                        <div className="flex  flex-row items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{hour.startHour+" - "+hour.endHour}</span>
                        </div>
                        <div className="flex  flex-row items-center gap-2">
                            <MapIcon className="w-4 h-4 text-primary" />
                            <span>{bussinesName}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                {score[0].score !== undefined && score[1].score !== undefined ? (
                    <div className="flex flex-row items-center gap-2 font-bold text-sm">
                        <div className={`flex flex-row items-center justify-center gap-1 ${score[0].score == score[1].score ? "text-yellow-500" :score[0].score > score[1].score? "text-primary":"text-destructive"}`}>

                            <span>{score[0].teamName}</span>
                            <ShieldTeamAIcon className="w-6 h-6" />
                            <span>{score[0].score}</span>

                        </div>
                        <span>-</span>
                        <div className={`flex flex-row items-center gap-1 ${score[0].score == score[1].score ? "text-yellow-500" :score[0].score < score[1].score? "text-primary":"text-destructive"}`}>
                            <span>{score[1].score}</span>

                            <ShieldTeamBIcon className="w-6 h-6" />

                            <span>{score[1].teamName}</span>
                        </div>

                    </div>
                ) : (
                    <Button
                        variant="default"
                        onClick={(e) => handleAddResult(e)}

                    >
                        Agregar resultado
                    </Button>
                )}

            </div>
        </div>
    )
}

export default CardPastMatch