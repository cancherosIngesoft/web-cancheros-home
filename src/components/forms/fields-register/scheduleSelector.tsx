"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useGlobalStore, useShallow } from "@/store";
import { useState, useEffect } from "react";
import { addHours, isWithinInterval, parse } from "date-fns";
import { es } from "date-fns/locale";
import { ScheduleCalendar } from "./scheduleCalendar";
import { useToast } from "@/hooks/use-toast";

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export function ScheduleSelector() {
  const { toast } = useToast();
  const field = useGlobalStore(useShallow((state) => state.field));
  const [schedules, setSchedules] = useState<TimeSlot[]>(
    field.field_schedule || []
  );
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedRange, setSelectedRange] = useState<string>("2");

  const days = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  // Mantener sincronizado con el estado global
  useEffect(() => {
    if (field.field_schedule) {
      setSchedules(field.field_schedule);
    }
  }, [field.field_schedule]);

  // Validar superposición de horarios
  const hasOverlap = (newSchedule: TimeSlot) => {
    return schedules.some((schedule) => {
      if (schedule.day !== newSchedule.day) return false;

      const existingStart = parse(schedule.startTime, "HH:mm", new Date());
      const existingEnd = parse(schedule.endTime, "HH:mm", new Date());
      const newStart = parse(newSchedule.startTime, "HH:mm", new Date());
      const newEnd = parse(newSchedule.endTime, "HH:mm", new Date());

      return (
        isWithinInterval(newStart, {
          start: existingStart,
          end: existingEnd,
        }) ||
        isWithinInterval(newEnd, { start: existingStart, end: existingEnd }) ||
        isWithinInterval(existingStart, { start: newStart, end: newEnd })
      );
    });
  };

  const handleAddSchedule = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedDay || !selectedStartTime || !selectedRange) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos del horario",
        variant: "destructive",
      });
      return;
    }

    const startHour = parseInt(selectedStartTime.split(":")[0]);
    const endHour = (startHour + parseInt(selectedRange)) % 24;
    const endTime = `${endHour.toString().padStart(2, "0")}:00`;

    const newSchedule = {
      day: selectedDay,
      startTime: selectedStartTime,
      endTime: endTime,
    };

    if (hasOverlap(newSchedule)) {
      toast({
        title: "Error",
        description: "Este horario se superpone con otro existente",
        variant: "destructive",
      });
      return;
    }

    const newSchedules = [...schedules, newSchedule];
    setSchedules(newSchedules);

    // Actualizar el estado global manteniendo los demás campos
    useGlobalStore.getState().updateStore("field", {
      ...field, // Mantener todos los campos existentes
      field_schedule: newSchedules,
    });

    setSelectedDay("");
    setSelectedStartTime("");
    setSelectedRange("2");

    toast({
      title: "Horario agregado correctamente",
      variant: "default",
    });
  };

  const handleDeleteSchedule = (index: number) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);

    // Actualizar el estado global manteniendo los demás campos
    useGlobalStore.getState().updateStore("field", {
      ...field, // Mantener todos los campos existentes
      field_schedule: newSchedules,
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Día</Label>
          <Select value={selectedDay} onValueChange={setSelectedDay}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un día" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {days.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Hora de inicio</Label>
          <Select
            value={selectedStartTime}
            onValueChange={setSelectedStartTime}
          >
            <SelectTrigger>
              <SelectValue placeholder="Hora inicio" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Rango (horas)</Label>
          <Select value={selectedRange} onValueChange={setSelectedRange}>
            <SelectTrigger>
              <SelectValue placeholder="Duración" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {[1, 2, 3, 4].map((hours) => (
                <SelectItem key={hours} value={hours.toString()}>
                  {hours} {hours === 1 ? "hora" : "horas"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Button
            type="button"
            onClick={handleAddSchedule}
            className="w-full bg-[#46C556] text-white"
          >
            Agregar horario
          </Button>

          {schedules.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Horarios agregados:</h3>
              <div className="space-y-2">
                {schedules.map((schedule, index) => (
                  <div
                    key={index}
                    className="p-3 bg-[#B8F0B8] rounded-lg flex justify-between items-center"
                  >
                    <span>
                      {schedule.day}: {schedule.startTime} - {schedule.endTime}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSchedule(index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <ScheduleCalendar schedules={schedules} />
      </div>
    </div>
  );
}
