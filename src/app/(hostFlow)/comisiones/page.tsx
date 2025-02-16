"use client";

import { useForm } from "react-hook-form";
import {
  BarChartIcon as ChartBarIcon,
  DollarSignIcon,
  HelpCircleIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import GenericReservaCard from "@/components/reservar_components/genericReservaCard";
import { useEffect, useState, useCallback } from "react";
import {
  getOcupationAndIncomes,
  getReservas,
  getActiveReservation,
} from "@/actions/reservation/reservation_action";
import { useGlobalStore } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";
import { getPendingFees } from "@/actions/payment/payment_actions";
import { toast } from "sonner";
import PaymentModal from "@/components/modals/PaymentModal";
import FeesModal from "@/components/modals/FeesModal";
import CommissionExplainer from "@/components/modals/explainerModal";
export default function PanelComisiones() {
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [comisionesEnDeuda, setComisionesEnDeuda] = useState(0);
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const user = useGlobalStore((state) => state.auth);

  const fetchReservasAndFees = async () => {
    if (!user.id) return;

    setLoading(true);
    try {
      // Realizar las llamadas en paralelo usando Promise.all
      const [fees, response, ocupation] = await Promise.all([
        getPendingFees(parseInt(user.id)),
        getActiveReservation(user.id),
        getOcupationAndIncomes(user.id, "1", "1", "2024"),
      ]);

      const reservas = response.map((reserva) => ({
        id: reserva.idReservation,
        field: reserva.FieldType,
        user: reserva.idBooker,
        date: reserva.dateReservation,
        location: reserva.bussinessDirection,
        amount: reserva.totalPrice,
        status: "Pagado",
      }));

      setReservas(reservas);
      setTotalIngresos(ocupation.incomes);
      setComisionesEnDeuda(fees.amount);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error al obtener las comisiones");
    } finally {
      setLoading(false);
    }
  };

  // Usar un useCallback para memoizar la función
  const memoizedFetchReservasAndFees = useCallback(fetchReservasAndFees, [
    user.id,
  ]);

  useEffect(() => {
    memoizedFetchReservasAndFees();
  }, [memoizedFetchReservasAndFees]);

  const onSubmit = async (data: any) => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col items-start justify-start h-screen w-[90vw] ml-[5vw] py-6 space-y-8">
      <CommissionExplainer
        open={isExplainOpen}
        onOpenChange={setIsExplainOpen}
      />
      <FeesModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        amount={comisionesEnDeuda}
      />
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <DollarSignIcon className="h-8 w-8 text-green-700" />
          <h1 className="text-2xl font-bold text-green-700">
            PANEL COMISIONES
          </h1>
        </div>
        <p className="text-muted-foreground text-sm text-gray-500">
          Bienvenido/a a tu Panel de Comisiones. Aquí podrás consultar el
          detalle de las comisiones generadas por las transacciones de las
          reservas.
        </p>
      </div>

      {/* Metrics Comisiones */}
      <div className="grid gap-4 md:grid-cols-2 w-full">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">
              {loading ? (
                <Skeleton className="h-10 w-20" />
              ) : (
                comisionesEnDeuda.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                })
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Comisiones en deuda{" "}
              <HelpCircleIcon
                className="h-5 w-5 text-green-700 self-end"
                onClick={() => setIsExplainOpen(true)}
              />
            </p>
            <Button onClick={onSubmit} className="max-w-[40%] self-end ">
              <DollarSignIcon className="h-5 w-5text-green-700" />
              Pagar comisiones
            </Button>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">
              {loading ? (
                <Skeleton className="h-10 w-20" />
              ) : (
                totalIngresos.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                })
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">Total Ganancias</p>
          </CardHeader>
        </Card>
      </div>

      {/* Reservations */}
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ChartBarIcon className="h-5 w-5 text-green-700" />
          Reservas Activas
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
              No se han encontrado reservas activas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
