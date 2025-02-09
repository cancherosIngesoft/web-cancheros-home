"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReservaCard } from "./reserva-card";
import type { Reserva } from "@/components/hostBooking/model";
import { groupReservasByWeek } from "@/utils/utils";

interface ReservasListProps {
  reservas: Reserva[];
}

export default function ReservasList({ reservas }: ReservasListProps) {
  const [activeTab, setActiveTab] = useState<"activas" | "pasadas">("activas");

  const reservasActivas = reservas.filter(
    (reserva) => new Date(reserva.fecha) > new Date()
  );
  const reservasPasadas = reservas.filter(
    (reserva) => new Date(reserva.fecha) <= new Date()
  );

  const reservasActivasPorSemana = groupReservasByWeek(reservasActivas);
  const reservasPasadasPorSemana = groupReservasByWeek(reservasPasadas);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Reservas</h1>
      <Tabs
        defaultValue="activas"
        onValueChange={(value) => setActiveTab(value as "activas" | "pasadas")}
      >
        <TabsList>
          <TabsTrigger value="activas">Activas</TabsTrigger>
          <TabsTrigger value="pasadas">Pasadas</TabsTrigger>
        </TabsList>
        <TabsContent value="activas">
          {Object.keys(reservasActivasPorSemana).length > 0 ? (
            Object.entries(reservasActivasPorSemana).map(
              ([weekStart, weekReservas]) => (
                <WeeklyReservas
                  key={weekStart}
                  weekStart={weekStart}
                  reservas={weekReservas}
                  isActive={true}
                />
              )
            )
          ) : (
            <p className="text-center text-gray-600 mt-4">
              No tienes reservas activas en este momento.
            </p>
          )}
        </TabsContent>
        <TabsContent value="pasadas">
          {Object.keys(reservasPasadasPorSemana).length > 0 ? (
            Object.entries(reservasPasadasPorSemana).map(
              ([weekStart, weekReservas]) => (
                <WeeklyReservas
                  key={weekStart}
                  weekStart={weekStart}
                  reservas={weekReservas}
                  isActive={false}
                />
              )
            )
          ) : (
            <p className="text-center text-gray-600 mt-4">
              No tienes reservas pasadas en tu historial.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface WeeklyReservasProps {
  weekStart: string;
  reservas: Record<string, Reserva[]>;
  isActive: boolean;
}

function WeeklyReservas({
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
