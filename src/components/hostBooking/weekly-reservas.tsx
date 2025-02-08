"use client";

import { ReservaCard } from "./reserva-card";
import type { Reserva } from "@/components/hostBooking/model";

interface WeeklyReservasProps {
  weekStart: string;
  reservas: Record<string, Reserva[]>;
  isActive: boolean;
}

export function WeeklyReservas({
  weekStart,
  reservas,
  isActive,
}: WeeklyReservasProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">
        Semana del {new Date(weekStart).toLocaleDateString()}
      </h2>
      {Object.entries(reservas).map(([date, dayReservas]) => (
        <div key={date} className="mb-4">
          <h3 className="text-lg font-medium mb-2">
            {new Date(date).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>
          {dayReservas.map((reserva) => (
            <ReservaCard
              key={reserva.id}
              reserva={reserva}
              isActive={isActive}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
