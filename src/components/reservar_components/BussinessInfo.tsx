"use client"

import {useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { useBussinessStore } from "@/store"
import { getBussinessByID } from "@/actions/book_field/field_actions"
import { LoadingState } from "./loadingState"
import FieldCard from "./FieldCard"
import { getAvailableHour } from "@/actions/book_field/field_actions"
import { ErrorGetInfo } from "./ErrorGetInfo"
import { TimeSlot } from "./TimeSlot"

export function useAvailableHours(fieldId: string | null, date: Date | undefined) {
    return useQuery({
        queryKey: ["availableHours", fieldId, date],
        queryFn: () => getAvailableHour(fieldId!, date!),
        enabled: !!fieldId && !!date,
        staleTime: 1000 * 60 * 5,
    })
}



const BussinessInfo = ({ id }: { id: string }) => {
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [selectedField, setSelectedField] = useState<string | null>(null)
    const [selectedHours, setSelectedHours] = useState<string[] | null>([])
    const clearBussinessID = useBussinessStore((state) => state.clearBussinessID)

    const {
        data: business,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["business", id],
        queryFn: () => getBussinessByID(id),
        staleTime: 1000 * 60 * 5,
    })

    const {
        data: availableHours,
        isLoading: isLoadingHours,
        isError: isErrorHours,
    } = useAvailableHours(selectedField, selectedDate)

    if (isLoading) return <LoadingState />
    if (isError) return <ErrorGetInfo retry={() => refetch()} />

    const handleHourToggle = (hour: string) => {
        setSelectedHours((prev) => (prev?.includes(hour) ? prev.filter((h) => h !== hour) : [...(prev || []), hour]))
    }

    const onSubmit = () => {
        console.log("Reservar")
        console.log({ id, selectedField, selectedDate, selectedHours })
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="relative w-full h-full p-4"
            >
                <Button onClick={clearBussinessID} size="icon" variant="ghost" className="absolute right-0 top-0">
                    <X className="h-4 w-4" />
                </Button>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{business?.name}</h2>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary-50">Canchas disponibles</h3>
                        <div className="flex flex-row overflow-x-scroll h-56 gap-4 py-2">
                            {business?.canchas.map((cancha) => (
                                <FieldCard
                                    key={cancha.id_cancha}
                                    field={cancha}
                                    setSelectedField={setSelectedField}
                                    selectedField={selectedField}
                                />
                            ))}
                        </div>
                    </div>

                    {selectedField && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 w-1/2">
                            <h3 className="text-lg font-semibold text-primary-50">Seleccionar fecha</h3>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {selectedDate ? format(selectedDate, "PPP") : <span>Selecciona una fecha</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => {
                                            setSelectedDate(date)
                                            setSelectedHours(null)
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </motion.div>
                    )}

                    {selectedField && selectedDate && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                            <h3 className="text-lg font-semibold text-primary-50">Horarios disponibles</h3>
                            {isLoadingHours ? (
                                <div className="grid grid-cols-3 gap-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-10 bg-muted animate-pulse rounded-md" />
                                    ))}
                                </div>
                            ) : isErrorHours ? (
                                <ErrorGetInfo retry={() => refetch()} />
                            ) : (
                                <div className="flex flex-row flex-wrap gap-2">
                                    {availableHours?.hours.map((hour) => (
                                        <TimeSlot
                                            key={hour}
                                            time={hour}
                                            isSelected={selectedHours?  selectedHours.includes(hour): false}
                                            onClick={() => handleHourToggle(hour)}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {selectedField && selectedDate && selectedHours && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
                            <Button className="w-full" size="lg" onClick={onSubmit} >
                                Reservar
                            </Button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default BussinessInfo

