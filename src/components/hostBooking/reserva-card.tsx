"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Reserva } from "./model";
import { cancelarReserva } from "@/actions/reservation/reservation_action";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Star,
  Users,
  Trophy,
} from "lucide-react";
import { useGlobalStore } from "@/store";
import { CancelReservationModal } from "../modals/CancelReservationModal";
import { isReservationAvailable } from "@/utils/utils";

interface ReservaCardProps {
  reserva: Reserva;
  isActive: boolean;
}

export function ReservaCard({ reserva, isActive }: ReservaCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const idUser = useGlobalStore((state) => state.auth.id);
  const [isOpenCancelReservationModal, setIsOpenCancelReservationModal] =
    useState(false);
  const puedeModificar =
    isActive &&
    new Date(reserva.fecha).getTime() - Date.now() > 24 * 60 * 60 * 1000;

  const handleCancelar = async () => {
    if (window.confirm("¿Estás seguro de que quieres cancelar esta reserva?")) {
      await cancelarReserva(reserva.id, reserva.id_referencia_pago ?? "");
      // Aquí deberías actualizar el estado o recargar los datos
      alert("Reserva cancelada con éxito");
    }
  };

  const handleReprogramar = async () => {
    // Aquí deberías abrir un modal o navegar a una página de reprogramación
    alert("Funcionalidad de reprogramación aún no implementada");
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{reserva.negocio}</span>
          <span
            className={`text-sm px-2 py-1 rounded ${
              reserva.estado === "pagada"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {reserva.estado}
          </span>
        </CardTitle>
        <CardDescription className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(reserva.fecha).toLocaleDateString()}
          <Clock className="w-4 h-4 ml-4 mr-2" />
          {new Date(reserva.fecha).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{reserva.cancha}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-2" />
          <span>Valor total: ${reserva.valorTotal}</span>
        </div>

        {isExpanded && (
          <>
            {/* {reserva.calificacion && (
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 mr-2" />
                <span>Calificación: {reserva.calificacion}</span>
              </div>
            )} */}
            {/* {reserva.equipos && (
              <div className="flex items-center mt-2">
                <Users className="w-4 h-4 mr-2" />
                <span>Equipos: {reserva.equipos.join(" vs ")}</span>
              </div>
            )} */}
            {/* {reserva.resultado && (
              <div className="flex items-center mt-2">
                <Trophy className="w-4 h-4 mr-2" />
                <span>Resultado: {reserva.resultado}</span>
              </div>
            )} */}
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="destructive"
          className=" self-end"
          onClick={() => setIsOpenCancelReservationModal(true)}
        >
          Cancelar
        </Button>
        {isOpenCancelReservationModal && (
          <CancelReservationModal
            avaible={isReservationAvailable(reserva.fecha, "00:00")}
            open={isOpenCancelReservationModal}
            onOpenChange={setIsOpenCancelReservationModal}
            reservationDetails={{
              id: reserva.id,
              id_referencia_pago: reserva.id_referencia_pago,
              date: reserva.fecha,
            }}
          />
        )}

        {/*puedeModificar && (
          <div>
            <Button
              variant="destructive"
              onClick={handleCancelar}
              className="mr-2"
            >
              Cancelar
            </Button>
            <Button onClick={handleReprogramar}>Reprogramar</Button>
          </div>
        ) */}
      </CardFooter>
    </Card>
  );
}
