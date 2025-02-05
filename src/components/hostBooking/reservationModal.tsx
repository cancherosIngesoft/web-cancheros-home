import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Reservation = {
  id: string;
  courtId: string;
  customerName: string;
  startTime: Date;
  endTime: Date;
  isPaid: boolean;
};

type ReservationModalProps = {
  reservation: Reservation;
  onClose: () => void;
  onMarkPaid: () => void;
  onCancel: () => void;
};

export function ReservationModal({
  reservation,
  onClose,
  onMarkPaid,
  onCancel,
}: ReservationModalProps) {
  const isReservationEnded = new Date() > reservation.endTime;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalles de la Reserva</DialogTitle>
          <DialogDescription>
            Información de la reserva para {reservation.customerName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p>
              <strong>Cliente:</strong> {reservation.customerName}
            </p>
            <p>
              <strong>Hora de inicio:</strong>{" "}
              {reservation.startTime.toLocaleString()}
            </p>
            <p>
              <strong>Hora de fin:</strong>{" "}
              {reservation.endTime.toLocaleString()}
            </p>
            <p>
              <strong>Estado de pago:</strong>{" "}
              {reservation.isPaid ? "Pagado" : "Pendiente"}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onCancel} variant="destructive">
            Cancelar Reserva
          </Button>
          <Button
            onClick={onMarkPaid}
            disabled={!isReservationEnded || reservation.isPaid}
          >
            Marcar como Pagado
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
