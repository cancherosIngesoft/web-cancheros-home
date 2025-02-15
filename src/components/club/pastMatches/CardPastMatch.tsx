import { ReturnPastMatches } from "@/actions/club_management/club_past_matches"
import FieldIcon from "@/components/icon/FieldIcon"
import ShieldTeamAIcon from "@/components/icon/ShieldTeamAIcon"
import ShieldTeamBIcon from "@/components/icon/ShieldTeamBIcon"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapIcon } from "lucide-react"
import { MouseEvent, useState } from "react"
import ModalInfoReservation from "../ModalInfoReservation/ModalInfoReservation"

interface CardPastMatchProps {
    match: ReturnPastMatches
}
const CardPastMatch = (match: ReturnPastMatches) => {
    const [showResult, setShowResult] = useState(false)
    const handleAddResult = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("Agregar resultado")
    }
    const handleShowResult = () => {
        setShowResult(!showResult)
    }
    return (
        <div
        onClick={handleShowResult}

            className="flex items-center p-1 px-4 justify-between bg-white rounded-lg  w-full h-[5.5rem] shadow-lg hover:bg-primary-95 hover:cursor-pointer ">
            <div className="flex items-center gap-4 p-4">
                <FieldIcon className="w-10 h-10 text-primary" />
                <div className="flex-col  gap-2 text-xs">
                    <p className="text-base font-bold">{match.teamAName + " VS " + match.teamBName}</p>
                    <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-1">
                        <div className="flex  flex-row items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{match.dateReservation}</span>
                        </div>
                        <div className="flex  flex-row items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{match.hours.startHour + " - " + match.hours.endHour}</span>
                        </div>
                        <div className="flex  flex-row items-center gap-2">
                            <MapIcon className="w-4 h-4 text-primary" />
                            <span>{match.bussinesName}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                {match.score && match.score[0].score !== undefined && match.score[1].score !== undefined ? (
                    <div className="flex flex-row items-center gap-2 font-bold text-sm">
                        <div className={`flex flex-row items-center justify-center gap-1 ${match.score[0].score == match.score[1].score ? "text-yellow-500" : match.score[0].score > match.score[1].score ? "text-primary" : "text-destructive"}`}>

                            <span>{match.score[0].teamName}</span>
                            <ShieldTeamAIcon className="w-6 h-6" />
                            <span>{match.score[0].score}</span>

                        </div>
                        <span>-</span>
                        <div className={`flex flex-row items-center gap-1 ${match.score[0].score == match.score[1].score ? "text-yellow-500" : match.score[0].score < match.score[1].score ? "text-primary" : "text-destructive"}`}>
                            <span>{match.score[1].score}</span>

                            <ShieldTeamBIcon className="w-6 h-6" />

                            <span>{match.score[1].teamName}</span>
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

            <ModalInfoReservation isOpen={showResult} onClose={handleShowResult} reservation={match} isPastReservation={true} />
        </div>
    )
}

export default CardPastMatch