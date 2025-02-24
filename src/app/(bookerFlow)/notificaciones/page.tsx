"use client";

import { useForm } from "react-hook-form";
import { BarChartIcon as ChartBarIcon, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GenericReservaCard from "@/components/reservar_components/genericReservaCard";
import { useEffect, useState } from "react";
import {
  getCanchas,
  getOcupationAndIncomes,
  getReservas,
  getReservationByHostId,
} from "@/actions/reservation/reservation_action";
import { useGlobalStore } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";

// Definir el tipo para los filtros
type FilterFormValues = {
  cancha: string;
  mes: string;
  año: string;
};

export default function FinancialDashboard() {
  const [hostCanchas, setHostCanchas] = useState<any[]>([]);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [tasaOcupacion, setTasaOcupacion] = useState(0);
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, setValue } =
    useForm<FilterFormValues>();
  const user = useGlobalStore((state) => state.auth);

  useEffect(() => {
    const fetchHostCanchas = async () => {
      if (user.id) {
        setLoading(true);
        const canchas = await getCanchas(user.id || "");
        setHostCanchas(canchas);
        setLoading(false);
        const reservas = await getReservationByHostId(
          user.id,
          "2",
          "2025",
          new Date().toISOString().split("T")[0]
        );

        if (reservas.length > 0) {
          const reservas_data = reservas.map((reserva) => ({
            id: "Cliente " + reserva.idBooker,
            field: "Cancha " + reserva.idField,
            user: "Dueño " + user.id,
            date: new Date().toISOString().split("T")[0],
            location: "Tu Negocio",
            amount: 0,
            status: "Pagado",
          }));
          setReservas(reservas_data);
        } else {
          setReservas([]);
        }
        if (canchas.length > 0) {
          const { use_porcentage, total_profit } = await getOcupationAndIncomes(
            user.id || "",
            canchas[0].canchas_id,
            "2",
            "2025"
          );
          setTasaOcupacion(use_porcentage || 0);
          setTotalIngresos(total_profit || 0);
        }
      }
    };
    fetchHostCanchas();
  }, [user.id]);

  const onSubmit = async (data: FilterFormValues) => {
    if (!user.id) return;
    const { use_porcentage, total_profit } = await getOcupationAndIncomes(
      user.id || "",
      data.cancha,
      data.mes,
      data.año
    );
    setTasaOcupacion(use_porcentage || 0);
    setTotalIngresos(total_profit || 0);
    setLoading(true);
    const reservas = await getReservationByHostId(
      user.id,
      data.mes,
      data.año,
      new Date().toISOString().split("T")[0]
    );
    if (reservas.length > 0) {
      const reservas_data = reservas.map((reserva) => ({
        id: "Cliente " + reserva.idBooker,
        field: "Cancha " + reserva.idField,
        user: "Dueño " + user.id,
        date: new Date().toISOString().split("T")[0],
        location: "Tu Negocio",
        amount: 0,
        status: "Pagado",
      }));
      setReservas(reservas_data);
    } else {
      setReservas([]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-start justify-start h-screen w-[90vw] ml-[5vw] py-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ChartBarIcon className="h-8 w-8 text-green-700" />
          <h1 className="text-2xl font-bold text-green-700">Notificaciones</h1>
        </div>
        <p className="text-muted-foreground text-sm text-gray-500">
          ¡Bienvenido/a a tu panel de notificaciones! Desde aquí podrás
          visualizar tus notificaciones y estar al tanto de las últimas
          actualizaciones.
        </p>
      </div>
    </div>
  );
}
