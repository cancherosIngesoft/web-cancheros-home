"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReservationModal } from "./reservationModal";
import { CourtVisualization } from "./court-visualization";
import {
  addWeeks,
  addMonths,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  addHours,
} from "date-fns";

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

const courts: Court[] = [
  { id: "1", name: "Cancha 1" },
  { id: "2", name: "Cancha 2" },
  { id: "3", name: "Cancha 3" },
];

// Function to generate mock reservations for today
const generateMockReservations = (): Reservation[] => {
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    6,
    0,
    0
  );

  return [
    {
      id: "1",
      courtId: "1",
      customerName: "Juan Pérez",
      startTime: addHours(startOfDay, 4), // 10:00
      endTime: addHours(startOfDay, 5), // 11:00
      isPaid: false,
    },
    {
      id: "2",
      courtId: "2",
      customerName: "María García",
      startTime: addHours(startOfDay, 8), // 14:00
      endTime: addHours(startOfDay, 9), // 15:00
      isPaid: true,
    },
    {
      id: "3",
      courtId: "3",
      customerName: "Carlos Rodríguez",
      startTime: addHours(startOfDay, 10), // 16:00
      endTime: addHours(startOfDay, 11), // 17:00
      isPaid: false,
    },
    {
      id: "4",
      courtId: "1",
      customerName: "Ana Martínez",
      startTime: now, // Current time (active reservation)
      endTime: addHours(now, 1),
      isPaid: false,
    },
  ];
};

const mockReservations = generateMockReservations();

export function CourtReservationsCalendar() {
  const [view, setView] = useState<"week" | "month">("week");
  const [selectedCourt, setSelectedCourt] = useState<string>(courts[0].id);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const handlePrevious = () => {
    setCurrentDate((prev) =>
      view === "week" ? addWeeks(prev, -1) : addMonths(prev, -1)
    );
  };

  const handleNext = () => {
    setCurrentDate((prev) =>
      view === "week" ? addWeeks(prev, 1) : addMonths(prev, 1)
    );
  };

  const getDateRange = () => {
    if (view === "week") {
      return {
        start: startOfWeek(currentDate),
        end: endOfWeek(currentDate),
      };
    } else {
      return {
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
      };
    }
  };

  const dateRange = getDateRange();
  const daysInView = eachDayOfInterval(dateRange);

  const filteredReservations = mockReservations.filter(
    (reservation) =>
      reservation.courtId === selectedCourt &&
      reservation.startTime >= dateRange.start &&
      reservation.endTime <= dateRange.end
  );

  const handleDayClick = (day: Date) => {
    setCurrentDate(day);
  };

  const handleReservationClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  return (
    <div className="p-0">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <Select value={selectedCourt} onValueChange={setSelectedCourt}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar cancha" />
          </SelectTrigger>
          <SelectContent>
            {courts.map((court) => (
              <SelectItem key={court.id} value={court.id}>
                {court.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full md:w-11/12 lg:w-10/12">
        <Calendar
          mode="range"
          selected={{
            from: dateRange.start,
            to: dateRange.end,
          }}
          onDayClick={handleDayClick}
          className="rounded-md border"
        />
        <CourtVisualization
          court={courts.find((court) => court.id === selectedCourt) as Court}
          reservations={mockReservations}
          date={currentDate}
        />
      </div>
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
