import { MapPin } from "lucide-react";
import { Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNotificationStorage } from "@/hooks/useNotificationStorage";

export default function CalificationCard({
  id_establecimiento,
  id_user,
  onSelectReservation,
  onReject,
}: {
  id_establecimiento: number;
  id_user: number;
  onSelectReservation: (id_establecimiento: number) => void;
  onReject: (id_establecimiento: number) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
        <CardTitle className="text-base sm:text-lg font-bold">
          Reserva en el establecimiento {id_establecimiento}
        </CardTitle>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="bg-green-500 text-white hover:bg-green-600 text-xs sm:text-sm flex-1 sm:flex-none"
            onClick={() => onSelectReservation(id_establecimiento)}
          >
            Agregar reseña
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-700 text-white hover:bg-gray-800 text-xs sm:text-sm flex-1 sm:flex-none"
            onClick={() => onReject(id_establecimiento)}
          >
            No me interesa
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-700" />
            <span className="text-xs sm:text-sm">
              Establecimiento: {id_establecimiento}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:ml-4">
            <MapPin className="h-4 w-4 text-green-700" />
            <span className="text-xs sm:text-sm">Usuario: {id_user}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
