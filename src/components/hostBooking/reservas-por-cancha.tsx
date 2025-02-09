"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getReservas } from "@/actions/reservation/reservation_action";
import { ReservaCard } from "./reserva-card";
import { useGlobalStore } from "@/store";

interface ReservasPorCanchaProps {
  canchas: string[];
}

export default function ReservasPorCancha({ canchas }: ReservasPorCanchaProps) {
  const [expandedCancha, setExpandedCancha] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [expandedReserva, setExpandedReserva] = useState<number | null>(null);

  const reservas = useGlobalStore((state) => state.hostReservation.reservas);
  const updateStore = useGlobalStore((state) => state.updateStore);
  const canchasStore = useGlobalStore((state) => state.hostReservation.canchas);
  const handleBuscarReservas = async (cancha: string) => {
    if (!selectedDate) return;

    setIsLoading(true);
    try {
      const reservasData = await getReservas(
        format(selectedDate, "yyyy-MM-dd"),
        cancha
      );
      updateStore("hostReservation", { reservas: reservasData });
    } catch (error) {
      console.error("Error fetching reservas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCancha = (cancha: string) => {
    if (expandedCancha !== cancha) {
      updateStore("hostReservation", { reservas: [] });
    }
    setExpandedCancha(expandedCancha === cancha ? null : cancha);
  };

  return (
    <div className="space-y-4">
      {canchas.map((cancha) => (
        <div key={cancha} className="mb-4">
          <Button
            variant="outline"
            onClick={() => toggleCancha(cancha)}
            className="w-full justify-between"
          >
            {canchasStore.find((c) => c.canchas_id === cancha)?.nombre_cancha}
            {expandedCancha === cancha ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          {expandedCancha === cancha && (
            <div className="mt-4 space-y-4">
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
                  onClick={() => handleBuscarReservas(cancha)}
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

              {reservas.length > 0 ? (
                <div className="space-y-4">
                  {reservas.map((reserva) => (
                    <div key={reserva.id_reserva} className="mb-4">
                      <div
                        className="p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
                        onClick={() =>
                          setExpandedReserva(
                            expandedReserva === reserva.id_reserva
                              ? null
                              : reserva.id_reserva
                          )
                        }
                      >
                        <div className="flex justify-between items-center">
                          <div className="grid grid-cols-3 gap-4 flex-1">
                            <span>
                              {new Date(reserva.hora_inicio).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}{" "}
                              -{" "}
                              {new Date(reserva.hora_fin).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </span>
                            <span>{reserva.reservante.nombre}</span>
                            <span>
                              {reserva.estado_procesado
                                ? "Pagada"
                                : "Pendiente"}
                            </span>
                          </div>
                          {expandedReserva === reserva.id_reserva ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      {expandedReserva === reserva.id_reserva && (
                        <div className="mt-2">
                          <ReservaCard
                            reserva={{
                              id: reserva.id_reserva.toString(),
                              negocio: "Cancha #" + cancha,
                              cancha:
                                canchasStore.find(
                                  (c) => c.canchas_id === cancha
                                )?.nombre_cancha ?? "",
                              fecha: new Date().toISOString(),
                              estado: reserva.estado_procesado
                                ? "pagada"
                                : "pendiente",
                              valorTotal:
                                canchasStore.find(
                                  (c) => c.canchas_id === cancha
                                )?.valor_hora ?? 0,
                              ...reserva,
                            }}
                            isActive={true}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600 mt-4">
                  Selecciona una fecha para buscar reservas. Si no hay reservas,
                  intenta con otra fecha.
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
