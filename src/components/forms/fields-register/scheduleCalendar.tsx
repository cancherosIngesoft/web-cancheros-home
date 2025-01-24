"use client";

import { Calendar } from "@/components/ui/calendar";
import { addHours, format, isWithinInterval, parse } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

interface ScheduleCalendarProps {
  schedules: TimeSlot[];
}

export function ScheduleCalendar({ schedules }: ScheduleCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Convertir los horarios a intervalos de fecha para visualización
  const schedulesToIntervals = (schedules: TimeSlot[]) => {
    return schedules.map((schedule) => {
      const dayDate = parse(schedule.day, "EEEE", new Date(), { locale: es });
      const startTime = parse(schedule.startTime, "HH:mm", dayDate);
      const endTime = parse(schedule.endTime, "HH:mm", dayDate);

      return {
        start: startTime,
        end: endTime,
        day: schedule.day,
      };
    });
  };

  // Función para verificar si una fecha tiene horarios programados
  const isDayScheduled = (date: Date) => {
    const intervals = schedulesToIntervals(schedules);
    const dayName = format(date, "EEEE", { locale: es });

    return intervals.some(
      (interval) => interval.day.toLowerCase() === dayName.toLowerCase()
    );
  };

  return (
    <div className="border rounded-lg p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={es}
        modifiers={{
          scheduled: (date) => isDayScheduled(date),
        }}
        modifiersStyles={{
          scheduled: { backgroundColor: "#B8F0B8" },
        }}
        className="rounded-md border"
      />

      {date && isDayScheduled(date) && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">
            Horarios para {format(date, "EEEE d MMMM", { locale: es })}:
          </h4>
          <div className="space-y-2">
            {schedules
              .filter(
                (schedule) =>
                  schedule.day.toLowerCase() ===
                  format(date, "EEEE", { locale: es }).toLowerCase()
              )
              .map((schedule, index) => (
                <div key={index} className="p-2 bg-[#B8F0B8] rounded">
                  {schedule.startTime} - {schedule.endTime}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
