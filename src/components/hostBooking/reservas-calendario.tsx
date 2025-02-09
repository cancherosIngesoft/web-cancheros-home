/*
"use client";

import { useState } from "react";
import type { Reserva } from "@/components/hostBooking/model";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getReservas } from "@/actions/reservation/reservation_action";
import { ReservaCard } from "./reserva-card";

interface ReservasCalendarioProps {
  reservas: Reserva[];
}

export default function ReservasCalendario({
  reservas,
}: ReservasCalendarioProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [expandedReserva, setExpandedReserva] = useState<string | null>(null);

  const handleBuscarReservas = async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    try {
      const reservasData = await getReservas();
      // Aquí podrías actualizar el estado global o manejar los datos como necesites
    } catch (error) {
      console.error("Error fetching reservas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!reservas || reservas.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-4">
        No hay reservas disponibles.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP", { locale: es })
              ) : (
                <span>Selecciona una semana</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={es}
            />
          </PopoverContent>
        </Popover>
        <Button
          onClick={handleBuscarReservas}
          disabled={!selectedDate || isLoading}
          className="bg-[#46C556] text-white"
        >
          {isLoading ? (
            "Buscando..."
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Buscar Reservas
            </>
          )}
        </Button>
      </div>

      <div className="mt-4">
        {reservas.map((reserva) => (
          <div key={reserva.id} className="mb-4">
            <div
              className="p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
              onClick={() =>
                setExpandedReserva(
                  expandedReserva === reserva.id ? null : reserva.id
                )
              }
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{reserva.cancha}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(reserva.fecha).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      reserva.estado === "pagada"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {reserva.estado}
                  </span>
                  {expandedReserva === reserva.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </div>
            </div>
            {expandedReserva === reserva.id && (
              <div className="mt-2">
                <ReservaCard
                  reserva={reserva}
                  isActive={new Date(reserva.fecha) > new Date()}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
*/
