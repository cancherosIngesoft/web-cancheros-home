"use client";

import {
  Calendar,
  Clock,
  Users,
  MapPin,
  ImageOff,
  User,
  Users2,
  CalendarOff,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CancelReservationModal } from "../modals/CancelReservationModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type ReservationActiveReturn } from "@/actions/reservation/reservation_action";
import BallIcon from "../icon/BallIcon";
import ReprogramationModal from "../reservar_components/ReprogramationModal";
import { useState } from "react";
import { isReservationAvailable } from "@/utils/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useMutation } from "@tanstack/react-query";

interface CardReservationProps extends ReservationActiveReturn {
  currentUserId: string | undefined;
  isActive: boolean;
  id_referencia_pago: string | null;
}

export default function CardReservation({
  idReservation,
  dateReservation,
  hours,
  inTeam,
  idBooker,
  businessName,
  FieldType,
  capacity,
  businessDirection,
  fieldImg,
  totalPrice,
  teamName,
  currentUserId,
  id_referencia_pago,
  isActive,
  idField,
}: CardReservationProps) {
  const [isOpenReprogramationModal, setIsOpenReprogramationModal] =
    useState(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const startDate = new Date(hours.horaInicio);
  const endDate = new Date(hours.horaFin);
  const numHoursReservation =
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600);

  const isLessThan24Hours = () => {
    const reservationDate = new Date(`${dateReservation} ${hours.horaInicio}`);
    const now = new Date();
    const diffInHours =
      (reservationDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffInHours < 24;
  };
  const [isOpenConfirmationCancelModal, setIsOpenConfirmationCancelModal] =
    useState(false);
  const { toast } = useToast();

  const disabled = isLessThan24Hours();
  const tooltipMessage =
    "No es posible realizar cambios cuando quedan menos de 24 horas para la reserva";

  const handleCancel = async () => {
    setIsOpenCancelModal(true);
  };

  return (
    <>
      <div className="relative flex flex-col items-start gap-4 p-3 md:p-4 border rounded-lg shadow-sm bg-white pb-6 md:pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-2">
          <h2 className="font-bold text-base md:text-lg text-primary break-words">
            {businessName}
          </h2>
          <span className="font-semibold text-green-600 text-sm md:text-base">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              maximumFractionDigits: 0,
            }).format(totalPrice)}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4 w-full">
          <div className="relative w-full md:w-24 h-32 md:h-24 rounded-lg shrink-0">
            {fieldImg ? (
              <Image
                src={fieldImg}
                alt={businessName}
                fill
                className="object-cover rounded-lg"
                priority
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center rounded-lg bg-gray-200">
                <ImageOff className="h-10 w-10 text-primary-50" />
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col md:flex-row min-w-0 w-full gap-4">
            <div className="flex flex-col md:flex-row items-start gap-4 w-full md:w-2/3 mb-2 md:mb-4">
              <div className="flex flex-col space-y-1 w-full md:w-1/2">
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="break-words">{businessDirection}</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <BallIcon className="w-4 h-4 shrink-0" />
                  <span>Grama: {FieldType}</span>
                </div>
              </div>

              <div className="flex flex-col space-y-1 w-full md:w-1/2">
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{dateReservation}</span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>
                    {startDate.toTimeString().slice(0, 5) +
                      " - " +
                      endDate.toTimeString().slice(0, 5)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Capacidad: {capacity}</span>
                </div>
              </div>
            </div>

            {idBooker && isActive && (
              <div className="flex flex-col md:flex-row justify-center items-stretch md:items-center w-full md:flex-1 gap-2">
                <div className="w-full">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button
                            variant="outline"
                            onClick={() => setIsOpenReprogramationModal(true)}
                            disabled={disabled}
                            className="w-full text-xs md:text-sm h-9 md:h-10"
                          >
                            Reprogramar
                          </Button>
                        </div>
                      </TooltipTrigger>
                      {disabled && (
                        <TooltipContent className="bg-surface shadow-md max-w-48 mb-2">
                          {tooltipMessage}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="w-full">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button
                            variant="destructive"
                            onClick={() => handleCancel()}
                            disabled={disabled}
                            className="w-full text-xs md:text-sm h-9 md:h-10"
                          >
                            Cancelar
                          </Button>
                        </div>
                      </TooltipTrigger>
                      {disabled && (
                        <TooltipContent className="bg-surface shadow-md max-w-48 mb-2">
                          {tooltipMessage}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex justify-end md:absolute md:right-4 md:bottom-4 items-center gap-2 text-xs md:text-sm font-bold text-muted-foreground mt-2 md:mt-0">
          {inTeam ? (
            <>
              <Users2 className="w-4 h-4 shrink-0" />
              <span className="truncate">Reservado con {teamName}</span>
            </>
          ) : (
            <>
              <User className="w-4 h-4 shrink-0" />
              <span>Reservado en solitario</span>
            </>
          )}
        </div>
      </div>

      <ReprogramationModal
        isOpen={isOpenReprogramationModal}
        onClose={() => setIsOpenReprogramationModal(false)}
        idReservation={idReservation}
        businessName={businessName}
        fieldType={FieldType}
        fieldImg={fieldImg}
        totalPrice={totalPrice}
        idField={idField}
        numHours={numHoursReservation}
        hour={`${startDate.toTimeString().slice(0, 5)}-${endDate.toTimeString().slice(0, 5)}`}
        date={dateReservation}
      />

      {isOpenCancelModal && (
        <CancelReservationModal
          avaible={isReservationAvailable(dateReservation, hours.horaInicio)}
          open={isOpenCancelModal}
          onOpenChange={setIsOpenCancelModal}
          reservationDetails={{
            id: idReservation,
            id_referencia_pago: id_referencia_pago,
            date: dateReservation,
          }}
        />
      )}
    </>
  );
}