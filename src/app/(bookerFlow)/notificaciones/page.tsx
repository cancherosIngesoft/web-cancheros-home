"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useGlobalStore } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCalifications,
  getNotifications,
  Calification,
  Notification,
  setCalification,
  setMarcador,
} from "@/actions/notifications/notification_actions";
import CalificationCard from "@/components/notifications/calificationCard";
import NotificationCard from "@/components/notifications/notificationCard";
import NotificationModal from "@/components/modals/notificationModal";
import CalificationModal from "@/components/modals/calificationModal";
import { useNotificationStorage } from "@/hooks/useNotificationStorage";
import { useToast } from "@/hooks/use-toast";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [califications, setCalifications] = useState<Calification[]>([]);
  const [isModalNotificationOpen, setIsModalNotificationOpen] = useState(false);
  const [isModalCalificationOpen, setIsModalCalificationOpen] = useState(false);
  const [selectedIdEstablecimiento, setSelectedIdEstablecimiento] = useState(0);
  const [selectedIdPartido, setSelectedIdPartido] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = useGlobalStore((state) => state.auth);
  const {
    getDeletedCalifications,
    getDeletedNotifications,
    addDeletedCalification,
    addDeletedNotification,
  } = useNotificationStorage();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserNotifications = async () => {
      if (!user.id) return null;
      setLoading(true);
      const califications = await getCalifications(user.id);
      const notifications = await getNotifications(user.id);
      setLoading(false);

      // Filtrar calificaciones eliminadas
      const deletedCalifications = getDeletedCalifications();
      if (califications.length > 0) {
        const filteredCalifications = califications.filter(
          (cal: Calification) =>
            !deletedCalifications.includes(cal.id_establecimiento)
        );
        setCalifications(filteredCalifications);
      }

      // Filtrar notificaciones eliminadas
      const deletedNotifications = getDeletedNotifications();
      if (notifications.length > 0) {
        const filteredNotifications = notifications.filter(
          (not: Notification) => {
            // Verificar si el id_noti_stats está en la lista de eliminados
            return !deletedNotifications.includes(not.id_noti_stats);
          }
        );
        setNotifications(filteredNotifications);
      }
    };
    fetchUserNotifications();
  }, [user.id]);

  const handleRejectCalification = (id_establecimiento: number) => {
    addDeletedCalification(id_establecimiento);
    setCalifications((prev) =>
      prev.filter((cal) => cal.id_establecimiento !== id_establecimiento)
    );
  };

  const handleRejectNotification = (id_reserva: number) => {
    // Encontrar la notificación para obtener el id_noti_stats
    const notification = notifications.find((n) => n.id_reserva === id_reserva);
    if (notification) {
      addDeletedNotification(notification.id_noti_stats);
      setNotifications((prev) =>
        prev.filter((not) => not.id_reserva !== id_reserva)
      );
    }
  };

  const handleScoreSubmit = async (scores: number[]) => {
    try {
      await setMarcador(selectedIdPartido, scores);
      toast({
        title: "Marcador actualizado correctamente",
        description: "El resultado ha sido registrado con éxito",
        variant: "default",
      });
      // Ocultar la notificación después de enviar el marcador
      const notification = notifications.find(
        (n) => n.id_reserva === selectedIdPartido
      );
      if (notification) {
        addDeletedNotification(notification.id_noti_stats);
        setNotifications((prev) =>
          prev.filter((not) => not.id_noti_stats !== notification.id_noti_stats)
        );
      }
      setIsModalNotificationOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al actualizar el marcador",
        description: "Por favor intenta nuevamente",
        variant: "destructive",
      });
    }
  };

  const handleCalificationSubmit = async ({
    stars,
    comment,
  }: {
    stars: number;
    comment: string;
  }) => {
    try {
      await setCalification(selectedIdEstablecimiento, comment, stars);
      toast({
        title: "Calificación enviada correctamente",
        description: "Tu reseña ha sido registrada con éxito",
        variant: "default",
      });
      // Ocultar la calificación después de enviarla
      addDeletedCalification(selectedIdEstablecimiento);
      setCalifications((prev) =>
        prev.filter(
          (cal) => cal.id_establecimiento !== selectedIdEstablecimiento
        )
      );
      setIsModalCalificationOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error al enviar la calificación",
        description: "Por favor intenta nuevamente",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] w-full max-w-[90vw] mx-auto py-4 overflow-hidden">
      {/* Header */}
      <div className="space-y-2 border border-gray-200 rounded-md p-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bell className="h-8 w-8 text-green-700" />
          <h1 className="text-3xl font-bold text-green-700">Notificaciones</h1>
        </div>
        <p className="text-muted-foreground text-sm text-gray-500">
          Aquí podrás ver tus notificaciones para calificar tus reservas o
          aceptar ir a partidos ¡Mantén todo bajo control!
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="reservas"
        className="flex-1 flex flex-col mt-6 overflow-hidden"
      >
        <TabsList className="grid w-full grid-cols-2 flex-shrink-0 gap-2 px-2">
          <TabsTrigger
            value="reservas"
            className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700 text-xs sm:text-sm md:text-base py-2 sm:py-3"
          >
            Notificaciones Reservas
          </TabsTrigger>
          <TabsTrigger
            value="partidos"
            className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700 text-xs sm:text-sm md:text-base py-2 sm:py-3"
          >
            Notificaciones Partidos
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="reservas"
          className="flex-1 overflow-y-auto mt-4 pr-2"
        >
          <div className="grid gap-4">
            {loading ? (
              [...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-[100px] w-full" />
              ))
            ) : califications.length > 0 ? (
              califications.map((calification, index) => (
                <CalificationCard
                  key={index}
                  id_establecimiento={calification.id_establecimiento}
                  id_user={calification.id_user}
                  onSelectReservation={(id_establecimiento) => {
                    setSelectedIdEstablecimiento(id_establecimiento);
                    setIsModalCalificationOpen(true);
                  }}
                  onReject={handleRejectCalification}
                />
              ))
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-center">
                    No hay notificaciones de reservas por el momento
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent
          value="partidos"
          className="flex-1 overflow-y-auto mt-4 pr-2"
        >
          <div className="grid gap-4">
            {loading ? (
              [...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-[100px] w-full" />
              ))
            ) : notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <NotificationCard
                  key={index}
                  partido={notification.partido}
                  onSelectNotification={(idNotification) => {
                    setSelectedIdPartido(idNotification);
                    setIsModalNotificationOpen(true);
                  }}
                  idNotification={notification.id_reserva}
                  onReject={handleRejectNotification}
                />
              ))
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-center">
                    No hay notificaciones de partidos por el momento
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
      {isModalNotificationOpen && (
        <NotificationModal
          isOpen={isModalNotificationOpen}
          onClose={() => setIsModalNotificationOpen(false)}
          onSubmit={handleScoreSubmit}
          idReservation={selectedIdPartido.toString()}
        />
      )}
      {isModalCalificationOpen && (
        <CalificationModal
          isOpen={isModalCalificationOpen}
          onClose={() => setIsModalCalificationOpen(false)}
          onSubmit={handleCalificationSubmit}
          id_establecimiento={selectedIdEstablecimiento}
        />
      )}
    </div>
  );
}
