import { CalendarX } from "lucide-react";

export default function NoReservas() {
  return (
    <div className="container mx-auto p-4 text-center">
      <div className="max-w-md mx-auto">
        <CalendarX className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-4">No tienes reservas</h1>
        <p className="mb-6 text-gray-600">
          Aún no tienes reservas en tu historial. Esto se actualizará cuando los
          usuarios realicen una reserva.
        </p>
      </div>
    </div>
  );
}
