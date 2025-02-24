"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cancelarReserva } from "@/actions/reservation/reservation_action";

interface CancelReservationModalProps {
  avaible: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservationDetails: {
    id: string;
    id_referencia_pago: string | null;
    date: string;
  };
}

export function CancelReservationModal({
  avaible,
  open,
  onOpenChange,
  reservationDetails,
}: CancelReservationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleCancelReservation = async () => {
    setIsLoading(true);
    try {
      const response = await cancelarReserva(
        reservationDetails.id,
        reservationDetails.id_referencia_pago ?? ""
      );

      if (!response) {
        throw new Error("Error al cancelar la reserva");
      }
      toast({
        title: "Reserva cancelada",
        description: "La reserva ha sido cancelada exitosamente",
      });
      setIsCanceled(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {avaible
              ? isCanceled
                ? "Reserva cancelada"
                : "¿Está seguro de que desea cancelar esta reserva?"
              : "No es posible cancelar"}
          </DialogTitle>
          <DialogDescription className="text-gray-500 pt-4">
            {avaible
              ? isCanceled
                ? "La reserva ha sido cancelada exitosamente. Se ha emitido un reembolso de la cantidad de la reserva a la cuenta bancaria con la que se realizó el pago. Si tiene dudas, puede contactar al soporte de Cancheros en nuestra página de contacto."
                : "Esta acción no se puede deshacer. La reserva para la cancha será cancelada."
              : "Esta reserva ha superado el límite de cancelación previo de 24h, por lo que no es posible cancelarla. Por favor contacte al servicio al cliente si tiene duda o consulte nuestra página de términos y condiciones."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {avaible && !isCanceled && (
            <Textarea
              placeholder="Motivo de la cancelación (opcional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          )}
        </div>

        <DialogFooter className="flex gap-2 mt-4">
          {!isCanceled && (
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Volver
            </Button>
          )}
          {avaible && !isCanceled && (
            <Button
              variant="destructive"
              onClick={handleCancelReservation}
              disabled={isLoading}
            >
              {isLoading ? "Cancelando..." : "Cancelar reserva"}
            </Button>
          )}
          {isCanceled && (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Volver
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
