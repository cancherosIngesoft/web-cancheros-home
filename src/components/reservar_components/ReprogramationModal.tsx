"use client"

import { DialogTitle } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "../ui/dialog"
import { CalendarIcon, ImageOff } from "lucide-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getAvailableHour, type SchedulesToBook } from "@/actions/book_field/booking_actions"
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect, useMemo } from "react"
import { ErrorGetInfo } from "./ErrorGetInfo"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../ui/button"
import { TimeSlot } from "./TimeSlot"
import z from "zod"
import { reprogramationReservation } from "@/actions/reservation/reservation_action"
import { useGlobalStore } from "@/store"
import { useToast } from "@/hooks/use-toast"

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

interface ReprogramacionModalProps {
  isOpen: boolean
  onClose: () => void
  idReservation: string
  businessName: string
  fieldType: string
  fieldImg: string | undefined
  totalPrice: number
  idField: string
  numHours: number
}

const ReprogramationModal = ({
  isOpen,
  onClose,
  idReservation,
  businessName,
  fieldType,
  fieldImg,
  totalPrice,
  idField,
  numHours,
}: ReprogramacionModalProps) => {
  const idUser = useGlobalStore((state) => state.auth?.id)
  const [formatHours, setFormatHours] = useState<SchedulesToBook[] | undefined>(undefined)
  const [errorDate, setErrorDate] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<{
    date: Date | undefined
    valid: boolean
  }>()

  const {toast} = useToast()
  const [selectedHours, setSelectedHours] = useState<SchedulesToBook[] | null>([])

  const handleHourToggle = (franja: SchedulesToBook) => {
    setSelectedHours((prev) => {
      if (!prev) return [franja]

      const isSelected = prev.some((h) => h.hora_inicio === franja.hora_inicio)

      if (isSelected) {
        return prev.filter((h) => h.hora_inicio !== franja.hora_inicio)
      } else {
        const newSelection = [...prev, franja].sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio))

        if (newSelection.length > numHours) {
          return newSelection.slice(-numHours)
        }

        return newSelection
      }
    })
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
  const {
    data: availableHours,
    isLoading: isLoadingHours,
    isError: isErrorHours,
    failureReason: failureReasonHours,
    refetch: refetchHours,
  } = useQuery({
    queryKey: ["availableHoursReprogramation", selectedDate],
    queryFn: () => getAvailableHour(idField, selectedDate!.date!),
    enabled: !!selectedDate?.date && selectedDate?.valid,
    staleTime: 1000 * 60 * 5,
  })

  const {mutate:reprogramation} = useMutation({
    mutationFn: () => {
      if (!selectedDate?.date || !selectedHours || !idUser) return Promise.reject("Error en los datos")
      const newHours = {
        startDateAndHour: `${new Date(selectedDate.date).toISOString().split("T")[0]} ${selectedHours[0].hora_inicio}:00`,
        endDateAndHour: `${new Date(selectedDate.date).toISOString().split("T")[0]} ${selectedHours[selectedHours.length - 1].hora_fin}:00`,
      }

      return reprogramationReservation(idReservation, idUser, newHours)
    },
    onSuccess: () => {
        toast({
            title: "Reserva reprogramada",
            description: "Tu reserva ha sido reprogramada exitosamente",
            variant: "default",
        })
      onClose()
    },
    onError: (error: Error) => {
        toast({
            title: "Error al reprogramar la reserva",
            description: error.message,
            variant: "destructive",
        })
    }
  })
  const onSubmit = () => {
    reprogramation()
  }

  const areHoursConsecutive = (hours: SchedulesToBook[]): boolean => {
    for (let i = 1; i < hours.length; i++) {
      if (hours[i].hora_inicio !== hours[i - 1].hora_fin) {
        return false
      }
    }
    return true
  }

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

  const isSelectionValid = useMemo(() => {
    return selectedHours && selectedHours.length === numHours && areHoursConsecutive(selectedHours)
  }, [selectedHours, numHours])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h1 className="text-2xl font-bold">Reprogramar Reserva</h1>
          </DialogTitle>
          <DialogDescription>Selecciona una nueva fecha y hora para tu reserva</DialogDescription>
        </DialogHeader>
        <p>Reprogramar reserva en: {businessName}</p>
        <div className="flex flex-row">
          <div className="flex-1">
            {fieldImg ? (
              <>
                <img
                  src={fieldImg || "/placeholder.svg"}
                  alt={businessName}
                  className="h-full w-full rounded-md object-cover"
                />
              </>
            ) : (
              <div className="h-full w-full flex items-center rounded-md bg-gray-200">
                <ImageOff className="h-10 w-10 mx-auto text-primary-50" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <p>{totalPrice}</p>
            <p>{fieldType}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 w-1/2">
            <h3 className="text-lg font-semibold text-primary-50">Seleccionar fecha</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`${
                    errorDate !== "" ? "border-destructive" : ""
                  } w-full justify-start text-left font-normal`}
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

          {selectedDate && (
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
          <Button className="w-full font-bold" size="lg" onClick={onSubmit} disabled={!isSelectionValid}>
            Reprogramar
          </Button>
          {!isSelectionValid && selectedHours && (
            <p className="text-sm text-destructive">Por favor, selecciona {numHours} horas consecutivas.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReprogramationModal

