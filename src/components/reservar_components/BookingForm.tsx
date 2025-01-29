import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, CalendarDays, Clock, CircleDollarSign } from "lucide-react"
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { getAvailableHour, getTeamsUser, SchedulesToBook } from "@/actions/book_field/booking_actions"
import { ErrorGetInfo } from "./ErrorGetInfo"
import { TimeSlot } from "./TimeSlot"

import { z } from "zod"
import TeamIcon from "../icon/TeamIcon"

const dateSchema = z.date().refine(
    (value) => {
        const inputDate = new Date(value)
        const today = new Date()
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        return inputDate > startOfToday
    },
    {
        message: "La fecha seleccionada debe ser un día mayor a hoy",
    },
)

interface BookingFormProps {
    selectedField: { id_field: string; price: number } | null

}

const BookingForm: React.FC<BookingFormProps> = ({ selectedField }) => {
    const [selectedDate, setSelectedDate] = useState<{ date: Date | undefined; valid: boolean }>()
    const [selectedHours, setSelectedHours] = useState<SchedulesToBook[] | null>([])
    const [errorDate, setErrorDate] = useState<string>("")
    const [bookingModality, setBookingModality] = useState<"individual" | "team" | "">("")
    const [selectedTeam, setSelectedTeam] = useState<{nameTeam:string,id:string} | null>(null)

    const {
        data: availableHours,
        isLoading: isLoadingHours,
        isError: isErrorHours,
        refetch: refetchHours,
    } = useQuery({
        queryKey: ["availableHours", selectedField?.id_field, selectedDate],
        queryFn: () => getAvailableHour(selectedField!.id_field, selectedDate!.date!),
        enabled: !!selectedField?.id_field && !!selectedDate?.date && selectedDate?.valid,
        staleTime: 1000 * 60 * 5,
    })

    const {
        data: userTeams,
        isLoading: isLoadingTeams,
        isError: isErrorTeams,
    } = useQuery({
        queryKey: ["userTeams", "1"],//quemado el id del usuario
        queryFn: () => getTeamsUser("1"),
        enabled: bookingModality === "team",
    })

    const handleHourToggle = (franja: SchedulesToBook) => {
        setSelectedHours((prev) => (prev?.includes(franja) ? prev.filter((h) => h !== franja) : [...(prev || []), franja]))
    }

    const handleDateChange = (date: Date | undefined) => {
        const result = dateSchema.safeParse(date)
        if (!result.success) {
            setErrorDate(result.error.errors[0].message)
        } else {
            setErrorDate("")
            setSelectedDate({ date: date, valid: true })
        }
    }

    const onSubmit = () => {
        console.log("Reservar", {
            selectedField,
            selectedDate,
            selectedHours,
            bookingModality,
            selectedTeam,
        })
    }

    return (
        <div className="space-y-4 mt-4">
            {selectedField && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 w-1/2">
                    <h3 className="text-lg font-semibold text-primary-50">Seleccionar fecha</h3>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={`${errorDate !== "" ? "border-destructive" : ""} w-full justify-start text-left font-normal`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate?.date ? format(selectedDate.date, "PPP") : <span>Selecciona una fecha</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={selectedDate?.date}
                                onSelect={(date) => {
                                    handleDateChange(date)
                                    setSelectedHours(null)
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <span className="text-xs text-destructive">{errorDate}</span>
                </motion.div>
            )}

            {selectedField && selectedDate && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary-50">Horarios disponibles</h3>
                    {isLoadingHours ? (
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-10 bg-gray-300 animate-pulse rounded-md" />
                            ))}
                        </div>
                    ) : isErrorHours ? (
                        <ErrorGetInfo retry={() => refetchHours()} />
                    ) : (
                        <div className="flex flex-row flex-wrap gap-2">
                            {availableHours?.map((franja) => (
                                <TimeSlot
                                    key={franja.hora_inicio}
                                    time={franja}
                                    isSelected={selectedHours ? selectedHours.includes(franja) : false}
                                    onClick={() => handleHourToggle(franja)}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            )}

            {selectedField && selectedDate && selectedHours && selectedHours.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary-50">Modalidad de reserva</h3>

                    <div className="flex flex-row gap-2">
                        <div className="flex-1">
                            <Select onValueChange={(value) => setBookingModality(value as "individual" | "team")}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecciona la modalidad de reserva" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="individual">Individual</SelectItem>
                                    <SelectItem value="team">Por equipo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1">
                            {bookingModality === "team" && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

                                    {isLoadingTeams ? (
                                        <div className="h-10 bg-gray-300 animate-pulse rounded-md" />
                                    ) : isErrorTeams ? (
                                        <ErrorGetInfo retry={() => { }} />
                                    ) : userTeams && userTeams.length > 0 ? (
                                        <Select onValueChange={(value) => {
                                            const team = userTeams.find((team) => team.id === value);
                                            if(team){
                                                setSelectedTeam({nameTeam:team?.name, id:team?.id});
                                            }
                                            
                                        }}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecciona un equipo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {userTeams.map((team) => (
                                                    <SelectItem key={team.id} value={team.id}>
                                                        {team.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <p className="text-sm text-gray-500">No eres capitán de ningún equipo.</p>
                                    )}
                                </motion.div>
                            )}
                        </div>




                    </div>

                </motion.div>
            )}

            {selectedField && selectedDate && selectedHours && selectedHours.length > 0 && (bookingModality == "individual" || (bookingModality == "team" && selectedTeam)) && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4 space-y-4 bg-tertiary-98 border-[1px] border-gray-300 p-6 rounded-md"
                >
                    <h3 className="text-xl font-semibold text-tertiary-50">Resumen de la reserva</h3>
                    <div className="flex flex-row gap-6">
                        <div className="flex flex-row items-center gap-2">
                            <CalendarDays className="h-6 w-6 text-tertiary-40" />
                            <p className="text-md font-bold">Fecha:</p>
                            <p className="text-sm ">{format(selectedDate.date!, "PPP")}</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Clock className="h-6 w-6 text-tertiary-40" />
                            <p className="text-md font-bold">Horario:</p>
                            <p className="text-sm ">{selectedHours.map((item) => item.hora_inicio+"-"+item.hora_fin).join(", ")}</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <TeamIcon className="h-6 w-6 text-tertiary-40 border-0" />
                        <p className="text-md font-bold">Modalidad:</p>
                        <p className="text-sm ">{bookingModality === "individual" ? "Individual" : `En club con ${selectedTeam?.nameTeam}`}</p>

                    </div>
                    <hr className="w-full border-gray-300 border-[1.5px] " />
                    <div className="flex flex-row-reverse items-center">
                        
                        <p className="font-bold text-lg text-tertiary-30">
                            Total: <span className="text-black ">{(selectedField.price * selectedHours.length)}</span>
                        </p>
                    </div>
                    <div className="flex flex-row items-center">
                        <CircleDollarSign className="h-6 w-6 text-primary-70" />
                        <p className="font-bold text-xl text-primary-70">
                            Total a pagar para reservar: <span className="text-black ">{(selectedField.price * selectedHours.length)/2}</span>
                        </p>
                    </div>
                    <p className="text-xs text-gray-500">Para poder acceder a la reserva se tiene que pagar la mitad del valor total</p>

                    <Button className="w-full font-bold" size="lg" onClick={onSubmit}>
                        Reservar
                    </Button>
                </motion.div>
            )}
        </div>
    )
}

export default BookingForm

