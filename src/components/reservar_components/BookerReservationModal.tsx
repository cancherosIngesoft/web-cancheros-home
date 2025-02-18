"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useQuery } from "@tanstack/react-query"
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

const formSchema = z.object({
    clientName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    clientEmail: z.string().email("Correo electrónico inválido"),
    date: z.date({
        required_error: "Se requiere una fecha",
    }),
    hours: z.array(z.string()).min(1, "Debe seleccionar al menos una hora"),
})

interface BookerReservationModalProps {
    show: boolean
    handleClose: () => void
    idHost: string | null
}
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


const BookerReservationModal = ({ show, handleClose, idHost }: BookerReservationModalProps) => {
    const [selectedField, setSelectedField] = useState<{ id_field: string; price: number } | null>(null)
    const [selectedHours, setSelectedHours] = useState<SchedulesToBook[] | null>([])
    const [formatHours, setFormatHours] = useState<SchedulesToBook[] | undefined>(undefined)
    const [errorDate, setErrorDate] = useState<string>("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientName: "",
            clientEmail: "",
            hours: [],
        },
    })

    const {
        data: fields,
        isLoading,
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
        isLoading: isLoadingHours,
        isError: isErrorHours,
        failureReason: failureReasonHours,
        refetch: refetchHours,
    } = useQuery({
        queryKey: ["availableHoursHostField", form.watch("date")],
        queryFn: () => getAvailableHour(selectedField!.id_field, form.watch("date")!),
        enabled: !!selectedField && !!form.watch("date"),
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
        console.log({ ...values, fieldId: selectedField?.id_field })
        // Here you would typically send the reservation data to your backend
        handleClose()
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
    const handleDateChange = (date: Date | undefined) => {
        const result = dateSchema.safeParse(date)
        if (!result.success) {
            setErrorDate(result.error.errors[0].message)
        } else {
            setErrorDate("")

        }
    }
    useEffect(() => {
        if (selectedField) {
            refetchHours()
        }
    }, [selectedField])

    return (
        <Dialog open={show} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-3xl sm:max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center">Reserva tu cancha</DialogTitle>
                    <DialogDescription className="text-center">Completa los datos para realizar tu reserva</DialogDescription>
                </DialogHeader>
                <div className="flex flex-row overflow-x-scroll h-80 items-center gap-4 ">
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

                {selectedField && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="clientName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre del Cliente</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nombre del cliente" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="clientEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo del Cliente</FormLabel>
                                        <FormControl>
                                            <Input placeholder="correo@ejemplo.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Fecha de Reserva</FormLabel>
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

                            {form.watch("date") && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                    <h3 className="text-lg font-semibold text-primary-50">Horarios disponibles</h3>
                                    {isLoadingHours ? (
                                        <div className="grid grid-cols-3 gap-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="h-10 bg-gray-300 animate-pulse rounded-md" />
                                            ))}
                                        </div>
                                    ) : isErrorHours ? (
                                        <ErrorGetInfo retry={() => refetchHours()} error={failureReasonHours} />
                                    ) : (
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
                                </motion.div>
                            )}

                            <Button type="submit" className="w-full" disabled={!selectedHours}>
                                Crear Reserva
                            </Button>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default BookerReservationModal


