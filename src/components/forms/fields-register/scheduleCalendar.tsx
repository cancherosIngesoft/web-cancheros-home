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

  const schedulesToIntervals = (schedules: TimeSlot[]) => {
    return schedules.map((schedule) => {
      try {
        const dayDate = parse(schedule.day, "EEEE", new Date(), { locale: es });
        const startTime = parse(schedule.startTime.substring(0, 5), "HH:mm", dayDate);
        const endTime = parse(schedule.endTime.substring(0, 5), "HH:mm", dayDate);

        return {
          start: startTime,
          end: endTime,
          day: schedule.day,
        };
      } catch (error) {
        console.error("Error parsing schedule:", schedule, error);
        return null;
      }
    }).filter(Boolean); // Eliminar cualquier resultado null
  };

  // Función para verificar si una fecha tiene horarios programados
  const isDayScheduled = (date: Date) => {
    const intervals = schedulesToIntervals(schedules);
    const dayName = format(date, "EEEE", { locale: es });
    return intervals?.some(
      (interval) => interval?.day.toLowerCase() === dayName.toLowerCase()
    ) ?? false;
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
