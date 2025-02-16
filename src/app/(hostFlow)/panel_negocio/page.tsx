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
  const [reservas, setReservas] = useState<any[]>([
    {
      id: 1,
      field: "La caprichosa",
      user: "Juan Alberto espitia",
      date: "11 Octubre de 2024",
      location: "Arena Total",
      amount: 150000,
      status: "Pagado",
    },
    {
      id: 2,
      field: "La caprichosa",
      user: "Mario Riaño",
      date: "08 Octubre de 2024",
      location: "Arena Total",
      amount: 150000,
      status: "Pagado",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm<FilterFormValues>({
    defaultValues: {
      cancha: "all",
      mes: new Date().getMonth().toString(),
      año: new Date().getFullYear().toString(),
    },
  });
  const user = useGlobalStore((state) => state.auth);

  useEffect(() => {
    const fetchHostCanchas = async () => {
      if (user.id) {
        setLoading(true);
        console.log("user", user);
        const canchas = await getCanchas(user.id || "");
        console.log("canchas", canchas);
        setHostCanchas(canchas);
        setLoading(false);
      }
    };
    fetchHostCanchas();
  }, [user.id]);

  const onSubmit = async (data: FilterFormValues) => {
    console.log("Filtros seleccionados:", data);
    // Aquí puedes hacer la llamada a tu API con los filtros
    const { ocupation, incomes } = await getOcupationAndIncomes(
      user.id || "",
      data.cancha,
      data.mes,
      data.año
    );
    setTasaOcupacion(ocupation);
    setTotalIngresos(incomes);
    setLoading(true);
    const reservas = await getReservas(data.mes, data.cancha);
    setReservas(reservas);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-start justify-start h-screen w-[90vw] ml-[5vw] py-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ChartBarIcon className="h-8 w-8 text-green-700" />
          <h1 className="text-2xl font-bold text-green-700">
            PANEL FINANCIERO
          </h1>
        </div>
        <p className="text-muted-foreground text-sm text-gray-500">
          ¡Bienvenido/a a tu panel financiero! Desde aquí podrás visualizar tus
          ingresos, revisar el porcentaje de ocupación de tus espacios o
          servicios, y consultar las reservas activas en tiempo real.
        </p>
      </div>

      {/* Filters Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid gap-4 md:grid-cols-3 w-full">
          <div className="space-y-2">
            <label className="text-sm font-medium">Cancha</label>
            <Select {...register("cancha")}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las canchas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las canchas</SelectItem>
                {loading ? (
                  <SelectItem value="loading">Cargando...</SelectItem>
                ) : (
                  hostCanchas.map((cancha) => (
                    <SelectItem
                      key={cancha.canchas_id}
                      value={cancha.canchas_id}
                    >
                      {cancha.nombre_cancha}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Mes</label>
            <Select {...register("mes")}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Mes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Enero</SelectItem>
                <SelectItem value="1">Febrero</SelectItem>
                <SelectItem value="2">Marzo</SelectItem>
                <SelectItem value="3">Abril</SelectItem>
                <SelectItem value="4">Mayo</SelectItem>
                <SelectItem value="5">Junio</SelectItem>
                <SelectItem value="6">Julio</SelectItem>
                <SelectItem value="7">Agosto</SelectItem>
                <SelectItem value="8">Septiembre</SelectItem>
                <SelectItem value="9">Octubre</SelectItem>
                <SelectItem value="10">Noviembre</SelectItem>
                <SelectItem value="11">Diciembre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Año</label>
            <Select {...register("año")}>
              <SelectTrigger>
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="mt-4">
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </form>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 w-full">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">
              {totalIngresos.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}
            </CardTitle>
            <p className="text-sm text-muted-foreground">Ingresos totales</p>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">
              {tasaOcupacion.toFixed(1)}%
            </CardTitle>
            <p className="text-sm text-muted-foreground">Tasa de ocupación</p>
          </CardHeader>
        </Card>
      </div>

      {/* Reservations */}
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ChartBarIcon className="h-5 w-5 text-green-700" />
          Reservas
        </h2>
        <div className="space-y-4">
          {/* Reservation Card */}
          {loading ? (
            [1, 2, 3].map((item) => (
              <Skeleton className="h-24 w-full" key={item} />
            ))
          ) : reservas.length > 0 ? (
            reservas.map((reservation) => (
              <GenericReservaCard
                key={reservation.id}
                reservation={reservation}
              />
            ))
          ) : (
            <p className="text-muted-foreground text-sm text-gray-500 self-center">
              No hay reservas seleccionadas para esta opción, por favor
              selecciona una cancha y un mes para ver las reservas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
