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
import { useGlobalStore } from "@/store";
import { useState } from "react";
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
  const [schedules, setSchedules] = useState<TimeSlot[]>([]);
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

  const handleAddSchedule = () => {
    if (!selectedDay || !selectedStartTime || !selectedRange) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
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

    setSchedules([...schedules, newSchedule]);
    useGlobalStore.getState().updateStore("field", {
      field_schedule: [...schedules, newSchedule],
    });
    toast({
      title: "Horario agregado correctamente",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Día</Label>
          <Select onValueChange={setSelectedDay}>
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
          <Select onValueChange={setSelectedStartTime}>
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
          <Select
            defaultValue="2"
            onValueChange={(value) => setSelectedRange(value)}
          >
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
                      onClick={() => {
                        const newSchedules = schedules.filter(
                          (_, i) => i !== index
                        );
                        setSchedules(newSchedules);
                        useGlobalStore.getState().updateStore("field", {
                          field_schedule: newSchedules,
                        });
                      }}
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
