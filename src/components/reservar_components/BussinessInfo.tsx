"use client"

import { use, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { useBussinessStore } from "@/store"
import { getBussinessByID } from "@/actions/book_field/field_actions"
import { LoadingState } from "./LoadingState"
import FieldCard from "./FieldCard"
import { getAvailableHour } from "@/actions/book_field/field_actions"
import { ErrorGetInfo } from "./ErrorGetInfo"
import { TimeSlot } from "./TimeSlot"
import { CircleDollarSign } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import { Clock } from 'lucide-react';

import { z } from "zod";
import Image from "next/image"



export function useAvailableHours(fieldId: string | null, data: { date: Date | undefined, valid: boolean } | undefined) {
    return useQuery({
        queryKey: ["availableHours", fieldId, data],
        queryFn: () => getAvailableHour(fieldId!, data?.date!),
        enabled: !!fieldId && !!data?.date && data?.valid,
        staleTime: 1000 * 60 * 5,
    })
}
const dateSchema = z
    .date()
    .refine(
        (value) => {
            const inputDate = new Date(value);
            const today = new Date();
            const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            return inputDate > startOfToday;
        },
        {
            message: "La fecha seleccionada debe ser un día mayor a hoy",
        }
    );



const BussinessInfo = ({ id }: { id: string }) => {
    const [selectedDate, setSelectedDate] = useState<{ date: Date | undefined, valid: boolean }>()
    const [selectedField, setSelectedField] = useState<{ id_field: string, price: number } | null>(null)
    const [selectedHours, setSelectedHours] = useState<string[] | null>([])
    const [errorDate, setErrorDate] = useState<string>("")
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
    } = useAvailableHours(selectedField?.id_field ?? null, selectedDate)

    if (isLoading) return <LoadingState />
    if (isError) return <ErrorGetInfo retry={() => refetch()} />

    const handleHourToggle = (hour: string) => {
        setSelectedHours((prev) => (prev?.includes(hour) ? prev.filter((h) => h !== hour) : [...(prev || []), hour]))
    }

    const handleDateChange = (date: Date | undefined) => {

        // Validar la fecha con Zod
        console.log("Fecha seleccionada")
        console.log(typeof date)
        const result = dateSchema.safeParse(date);
        if (!result.success) {
            setErrorDate(result.error.errors[0].message); // Muestra el mensaje de error
        } else {
            setErrorDate(""); // Limpia el error si la validación pasa
            setSelectedDate({ date: date, valid: true })

        }
    };

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
                <Button onClick={clearBussinessID} size="icon" variant="default" className="absolute w-20 bg-tertiary-40 hover:bg-tertiary-70 p-0 max-h-10 right-0 top-0">
                    Volver
                </Button>

                <div className="space-y-4">
                    <div className="flex flex-row items-center ">
                        <Image src="/icons/soccer_ball.svg" alt="icon" width={50} height={50} />
                        <h2 className="text-3xl font-bold">{business?.name}</h2>
                    </div>


                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-primary-50">Canchas disponibles</h3>
                            <p className="text-xs text-gray-500">Seleccione la cancha que desea. Observa mas detalles dando click sobre las imagenes</p>
                        </div>

                        <div className="flex flex-row overflow-x-scroll h-64 gap-4 py-2 ">
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
                                    <Button variant="outline" className={`${errorDate !== "" ? "border-destructive" : ""} w-full justify-start text-left font-norma`}>
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
                                            isSelected={selectedHours ? selectedHours.includes(hour) : false}
                                            onClick={() => handleHourToggle(hour)}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {selectedField && selectedDate && selectedHours && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4 bg-tertiary-98 border-[1px]     border-gray-300 p-6 rounded-md">
                            <h3 className="text-xl font-semibold text-tertiary-50">Resumen de la reserva</h3>
                            <div className="flex flex-row  gap-6">
                                <div className="flex flex-row items-center gap-2">
                                    <CalendarDays className="h-6 w-6 text-tertiary-40" />
                                    <p className="text-md font-bold">Fecha:</p>
                                    <p className="text-sm ">{format(selectedDate.date!, "PPP")}</p>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <Clock className="h-6 w-6 text-tertiary-40" />
                                    <p className="text-md font-bold">Horario:</p>
                                    <p className="text-sm ">{selectedHours.join(", ")}</p>
                                </div>
                            </div>
                            <hr className="w-full border-gray-300 border-[1.5px] " />
                            <div className="flex flex-row  items-center">
                                <CircleDollarSign className="h-6 w-6 text-primary-70" />

                                <p className="font-bold text-xl text-primary-70">Total: <span className="text-black ">{selectedField.price * selectedHours.length}</span></p>

                            </div>
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

