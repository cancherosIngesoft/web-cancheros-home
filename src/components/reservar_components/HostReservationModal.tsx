"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState, useEffect, useMemo, use } from "react"
import { format } from "date-fns"
import FieldCard from "./FieldCard"
import { getFieldsById } from "@/actions/registro_host/field"
import { getAvailableHour, SchedulesToBook } from "@/actions/book_field/booking_actions"
import { Input } from "../ui/input"
import { CalendarIcon } from "lucide-react"
import { TimeSlot } from "./TimeSlot"
import { motion } from "framer-motion"
import { ErrorGetInfo } from "./ErrorGetInfo"
import { CreateHostReservation } from "@/actions/reservation/host_reservation"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "../ui/spinner"
import { CalendarClock } from 'lucide-react';
import { addDays } from "date-fns";
import ReservationSummary from "./ReservationSummary"
const formSchema = z.object({
    date: z.date({
        required_error: "Se requiere una fecha",
    }),
})

interface BookerReservationModalProps {
    show: boolean
    handleClose: () => void
    idHost: string | null
}

const HostReservationModal = ({ show, handleClose, idHost }: BookerReservationModalProps) => {
    const [selectedField, setSelectedField] = useState<{ id_field: string; price: number } | null>(null)
    const [selectedHours, setSelectedHours] = useState<SchedulesToBook[] | null>([])
    const [formatHours, setFormatHours] = useState<SchedulesToBook[] | undefined>(undefined)

    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: addDays(new Date(), 1),
        },
    })


    const {
        mutate: createHostReservation,
        isPending: isCreatingReservation,

    } = useMutation({
        mutationFn: (values: z.infer<typeof formSchema>) => {
            if (!selectedHours || !idHost) return Promise.reject("Error en los datos")
            const newHours = {
                hora_inicio: `${new Date(values.date).toISOString().split("T")[0]} ${selectedHours[0].hora_inicio}:00`,
                hora_fin: `${new Date(values.date).toISOString().split("T")[0]} ${selectedHours[selectedHours.length - 1].hora_fin}:00`,
            }

            return CreateHostReservation(selectedField!.id_field, idHost!, newHours)
        },
        retry: 2,
        onError: (error: Error) => {
            toast({
                variant: "destructive",
                title: "Error al crear la reserva",
                description: error.message,

            })
        },
        onSuccess: () => {
            toast({
                title: "Reserva creada",
                description: "La reserva ha sido creada con éxito",

            })
            handleClose()
            setSelectedField(null)
            setSelectedHours(null)
            form.reset()
        },
    })

    const {
        data: fields,
        isLoading: isLoadingFields,
        isError,
        failureReason,
    } = useQuery({
        queryKey: ["fields"],
        queryFn: () => getFieldsById(idHost!),
        enabled: !!idHost,
        retry: 2,
        staleTime: 1000 * 60 * 5,
    })

    const {
        data: availableHours,
        isFetching: isFeachingHours,
        isError: isErrorHours,
        failureReason: failureReasonHours,
        refetch: refetchHours,
    } = useQuery({
        queryKey: ["availableHoursHostField", form.watch("date")],
        queryFn: () => getAvailableHour(selectedField!.id_field, form.watch("date")),
        enabled: !!selectedField,
        staleTime: 1000 * 60 * 5,
    })

    const areHoursConsecutive = (hours: SchedulesToBook[]): boolean => {
        for (let i = 1; i < hours.length; i++) {
            if (hours[i].hora_inicio !== hours[i - 1].hora_fin) {
                return false
            }
        }
        return true
    }

    const handleHourToggle = (franja: SchedulesToBook) => {
        setSelectedHours((prev) => {
            if (!prev) return [franja]

            const isSelected = prev.some((h) => h.hora_inicio === franja.hora_inicio)

            if (isSelected) {
                return prev.filter((h) => h.hora_inicio !== franja.hora_inicio)
            } else {
                const newSelection = [...prev, franja].sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio))



                return newSelection
            }
        })
    }
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createHostReservation(values)

    }
    const isSelectionValid = useMemo(() => {
        return selectedHours && areHoursConsecutive(selectedHours)
    }, [selectedHours])

    useEffect(() => {
        if (availableHours) {
            const formatHours = availableHours.map((schedule) => ({
                hora_inicio: schedule.hora_inicio.slice(0, -3),
                hora_fin: schedule.hora_fin.slice(0, -3),
            }))
            setFormatHours(formatHours)
            setSelectedHours(null) // Reset selected hours when available hours change
        }
    }, [availableHours])

    useEffect(() => {
        refetchHours()

    }, [selectedField])

    return (
        <Dialog open={show} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
                <DialogHeader className="bg-primary-60 text-white p-4">
                    <DialogTitle className="text-2xl flex flex-row">
                        <CalendarClock className="h-8 w-8 mr-2 " />
                        Reserva tu cancha</DialogTitle>
                    <DialogDescription className="text-sm text-start">Completa los datos para realizar la reserva de tu cliente <span className="font-bold text-yellow-400">(Esta reserva sera registrada como reserva hecha por el host)</span> </DialogDescription>
                </DialogHeader>
                <div className="p-4 flex flex-col gap-4 w-full overflow-x-hidden">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-primary-50">Selecciona tu cancha</h2>
                        <div className="flex flex-row overflow-x-scroll h-72 w-[95%] items-center gap-4 px-2 rounded-md ">

                            {fields &&
                                fields.map((field) => (
                                    <FieldCard
                                        key={String(field.id_cancha)}
                                        field={field}
                                        setSelectedField={setSelectedField}
                                        selectedField={selectedField}
                                    />
                                ))}
                        </div>
                    </div>


                    {selectedField && (
                        <Form {...form}>
                            {selectedField &&
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        

                                        <FormField
                                            control={form.control}
                                            name="date"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-lg font-semibold text-primary-50">Fecha de Reserva</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"
                                                                        }`}
                                                                >
                                                                    {field.value ? format(field.value, "PPP") : <span>Selecciona una fecha</span>}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-primary-50">Horarios disponibles</h3>
                                            {!isSelectionValid && selectedHours && (
                                                <p className="text-sm text-destructive">Por favor, seleccion horas consecutivas.</p>
                                            )}
                                            {isFeachingHours ? (
                                                <div className="grid grid-cols-3 gap-2">
                                                    {[1, 2, 3].map((i) => (
                                                        <div key={i} className="h-10 bg-gray-300 animate-pulse rounded-md" />
                                                    ))}
                                                </div>
                                            ) : isErrorHours ? (
                                                <ErrorGetInfo retry={() => refetchHours()} error={failureReasonHours} />
                                            ) : formatHours?.length === 0 ? (
                                                <p className="text-sm text-destructive">No hay horas disponibles para esta fecha</p>
                                            ) :
                                                (
                                                    <div className="flex flex-row flex-wrap gap-2">
                                                        {formatHours?.map((franja) => (
                                                            <TimeSlot
                                                                key={franja.hora_inicio}
                                                                time={franja}
                                                                isSelected={selectedHours ? selectedHours.includes(franja) : false}
                                                                onClick={() => handleHourToggle(franja)}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                        </div>

                                        {/* {form.watch("date") && form.watch("clientName") && form.watch("clientEmail")  && selectedField &&selectedHours && 
                                    <ReservationSummary
                                        selectedDate={form.watch("date")}
                                        selectedHours={selectedHours}
                                        selectedField={selectedField}
                                        clientName={form.watch("clientName")}
                                        clientEmail={form.watch("clientEmail")}
                                } */}

                                        <Button
                                            className="w-full flex flex-row justify-center"
                                            disabled={!isSelectionValid || isCreatingReservation}
                                            type="submit"
                                        >
                                            {isCreatingReservation && <Spinner />}
                                            Crear Reserva
                                        </Button>

                                    </form>


                                </motion.div>


                            }

                        </Form>
                    )}


                </div>

            </DialogContent>
        </Dialog>
    )
}

export default HostReservationModal


