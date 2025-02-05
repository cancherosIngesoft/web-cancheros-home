import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReservationModal } from "./reservationModal";

type Reservation = {
  id: string;
  courtId: string;
  customerName: string;
  startTime: Date;
  endTime: Date;
  isPaid: boolean;
};

type Court = {
  id: string;
  name: string;
};

type CourtVisualizationProps = {
  court: Court;
  reservations: Reservation[];
  date: Date;
};

export function CourtVisualization({
  court,
  reservations,
  date,
}: CourtVisualizationProps) {
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const getReservationsForCourt = (courtId: string) => {
    return reservations.filter(
      (reservation) =>
        reservation.courtId === courtId &&
        reservation.startTime.toDateString() === date.toDateString()
    );
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let i = 6; i < 22; i++) {
      slots.push(`${i}:00`);
    }
    return slots;
  };

  const timeSlots = getTimeSlots();

  const handleReservationClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  const isReservationActive = (reservation: Reservation) => {
    const now = new Date();
    return now >= reservation.startTime && now < reservation.endTime;
  };

  const getReservationStatus = (reservation: Reservation) => {
    if (isReservationActive(reservation)) {
      return "active";
    } else if (reservation.isPaid) {
      return "paid";
    } else if (new Date() > reservation.endTime) {
      return "past";
    } else {
      return "upcoming";
    }
  };

  const getReservationColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-yellow-200 border-yellow-400";
      case "paid":
        return "bg-green-200 border-green-400";
      case "past":
        return "bg-gray-200 border-gray-400";
      case "upcoming":
        return "bg-blue-200 border-blue-400";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  return (
    <div className="w-full">
      {
        <Card key={court.id} className="w-full">
          <CardHeader>
            <CardTitle>{court.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timeSlots.map((slot) => {
                const reservation = getReservationsForCourt(court.id).find(
                  (r) => r.startTime.getHours() === parseInt(slot.split(":")[0])
                );
                const status = reservation
                  ? getReservationStatus(reservation)
                  : "available";
                const colorClass = getReservationColor(status);
                return (
                  <div key={slot} className="flex items-center">
                    <span className="w-16 text-sm">{slot}</span>
                    {reservation ? (
                      <Button
                        variant="outline"
                        className={`w-full justify-start ${colorClass} border`}
                        onClick={() => handleReservationClick(reservation)}
                      >
                        <span className="truncate">
                          {reservation.customerName}
                        </span>
                        {status === "active" && (
                          <span className="ml-2 text-xs font-semibold bg-yellow-500 text-white px-2 py-1 rounded-full">
                            Activa
                          </span>
                        )}
                      </Button>
                    ) : (
                      <div className="w-full h-8 bg-green-100 rounded border border-green-200"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      }
      {selectedReservation && (
        <ReservationModal
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
          onMarkPaid={() => {
            console.log("Marked as paid:", selectedReservation.id);
            setSelectedReservation(null);
          }}
          onCancel={() => {
            console.log("Cancelled reservation:", selectedReservation.id);
            setSelectedReservation(null);
          }}
        />
      )}
    </div>
  );
}
