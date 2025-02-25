import { TextIcon } from "lucide-react";
import TeamIcon from "../icon/TeamIcon";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNotificationStorage } from "@/hooks/useNotificationStorage";

export default function NotificationCard({
  partido,
  onSelectNotification,
  idNotification,
  onReject,
}: {
  partido: {
    equipo: { nombre: string; descripcion: string };
  };
  onSelectNotification: (idNotification: number) => void;
  idNotification: number;
  onReject: (idNotification: number) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
        <CardTitle className="text-base sm:text-lg font-bold">
          {`Partido de ${partido.equipo.nombre}`}
        </CardTitle>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="bg-green-500 text-white hover:bg-green-600 text-xs sm:text-sm flex-1 sm:flex-none"
            onClick={() => onSelectNotification(idNotification)}
          >
            Agregar resultado
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-700 text-white hover:bg-gray-800 text-xs sm:text-sm flex-1 sm:flex-none"
            onClick={() => onReject(idNotification)}
          >
            No me interesa
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm">
          <div className="flex items-center gap-2">
            <TeamIcon className="h-4 w-4 text-green-700" />
            <span className="text-xs sm:text-sm">
              Nombre equipo: {partido.equipo.nombre}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:ml-4">
            <TextIcon className="h-4 w-4 text-green-700" />
            <span className="text-xs sm:text-sm">
              Descripción: {partido.equipo.descripcion}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
