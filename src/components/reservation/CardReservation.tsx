"use client";

import {
  Calendar,
  Clock,
  Users,
  MapPin,
  ImageOff,
  DollarSign,
  User,
  Users2,
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
import {
  cancelarReserva,
  type ReservationActiveReturn,
} from "@/actions/reservation/reservation_action";
import BallIcon from "../icon/BallIcon";
import ReprogramationModal from "../reservar_components/ReprogramationModal";
import { useState } from "react";
import { isReservationAvailable } from "@/utils/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import ConfirmationModal from "../modals/ConfirmationModal";
import { CalendarOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

interface CardReservationProps extends ReservationActiveReturn {
  currentUserId: string | undefined;
  isActive: boolean;
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
      <div className="relative flex flex-col items-start gap-4 p-4 border rounded-lg shadow-sm bg-white">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-bold text-lg text-primary">{businessName}</h2>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-600">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              }).format(totalPrice)}
            </span>
          </div>
        </div>
        <div className="flex items-start gap-4 w-full">
          <div className="relative w-24 h-24 rounded-lg shrink-0">
            {fieldImg ? (
              <Image
                src={fieldImg || "/placeholder.svg"}
                alt={businessName}
                fill
                className="object-cover rounded-lg"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center rounded-lg bg-gray-200">
                <ImageOff className="h-10 w-10 text-primary-50" />
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-row min-w-0">
            <div className="flex flex-row items-start gap-4 w-2/3 mb-4">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{businessDirection}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BallIcon className="w-4 h-4" />
                  <span>Grama: {FieldType}</span>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{dateReservation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(hours.horaInicio)
                      .toISOString()
                      .split("T")[1]
                      .substring(0, 5) +
                      " - " +
                      new Date(hours.horaFin)
                        .toISOString()
                        .split("T")[1]
                        .substring(0, 5)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Capacidad: {capacity}</span>
                </div>
              </div>
            </div>

            {idBooker && isActive && (
              <div className="flex justify-center items-center flex-1 gap-2">
                <div className="flex-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button
                            variant="outline"
                            onClick={() => setIsOpenReprogramationModal(true)}
                            disabled={disabled}
                            className="w-full"
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
                <div className="flex-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              setIsOpenConfirmationCancelModal(true)
                            }
                            disabled={disabled}
                            className="w-full"
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

            <div className="flex absolute right-4 bottom-4 items-center gap-2 text-sm font-bold text-muted-foreground">
              {inTeam ? (
                <>
                  <Users2 className="w-4 h-4" />
                  <span>Reservado con {teamName}</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  <span>Reservado en solitario</span>
                </>
              )}
            </div>
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
        />
        <ConfirmationModal
          isOpen={isOpenConfirmationCancelModal}
          onClose={() => setIsOpenConfirmationCancelModal(false)}
          onConfirm={handleCancel}
          title={`¿Estás seguro de cancelar la reserva hecha en ${businessName}?`}
          description="Al cancelar la reserva, se liberará el espacio para que otro usuario pueda reservarlo"
          icon={<CalendarOff className="w-14 h-14 text-red-500" />}
        />
      </div>

      <div className="flex-1 flex flex-row min-w-0">
        <div className="flex flex-row items-start gap-4 w-2/3 mb-4">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{businessDirection}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BallIcon className="w-4 h-4" />
              <span>Grama: {FieldType}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{dateReservation}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                {new Date(hours.horaInicio)
                  .toISOString()
                  .split("T")[1]
                  .substring(0, 5) +
                  " - " +
                  new Date(hours.horaFin)
                    .toISOString()
                    .split("T")[1]
                    .substring(0, 5)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Capacidad: {capacity}</span>
            </div>
          </div>
        </div>

        {isOpenCancelModal && (
          <CancelReservationModal
            avaible={isReservationAvailable(dateReservation, hours.horaInicio)}
            open={isOpenCancelModal}
            onOpenChange={setIsOpenCancelModal}
            reservationDetails={{
              id: idReservation,
              paymentId: "102881598097",
              date: dateReservation,
            }}
          />
        )}

        {idBooker && isActive && (
          <div className="flex justify-center items-center flex-1 gap-2">
            <div className="flex-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        variant="outline"
                        onClick={() => setIsOpenReprogramationModal(true)}
                        disabled={disabled}
                        className="w-full"
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
            <div className="flex-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        variant="destructive"
                        onClick={handleCancel}
                        disabled={disabled}
                        className="w-full"
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

        <div className="flex absolute right-4 bottom-4 items-center gap-2 text-sm font-bold text-muted-foreground">
          {inTeam ? (
            <>
              <Users2 className="w-4 h-4" />
              <span>Reservado con {teamName}</span>
            </>
          ) : (
            <>
              <User className="w-4 h-4" />
              <span>Reservado en solitario</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}
