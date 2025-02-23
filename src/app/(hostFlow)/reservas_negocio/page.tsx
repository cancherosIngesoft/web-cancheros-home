"use client";

import { getCanchas } from "@/actions/reservation/reservation_action";
import ReservasPorCancha from "@/components/hostBooking/reservas-por-cancha";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useGlobalStore } from "@/store";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function ReservasNegocio() {
  const auth = useGlobalStore((state) => state.auth);
  const [canchas, setCanchas] = useState<
    { canchas_id: string; valor_hora: number; nombre_cancha: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const updateStore = useGlobalStore((state) => state.updateStore);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const canchasData = await getCanchas(auth.id ?? "");
        setCanchas(canchasData);
        updateStore("hostReservation", { canchas: canchasData });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [auth.id, updateStore]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-start h-screen w-[90vw] ml-[5vw] self-center">
      <h1 className="text-2xl font-bold mb-4 flex flex-row items-center gap-2">
        Mis Reservas{" "}
        <Image
          src="/icons/booking_logo.svg"
          alt="logo"
          width={32}
          height={32}
        />
      </h1>
      <p className="text-sm text-gray-500 mb-10">
        Aquí puedes ver las reservas de tu negocio. Para empezar, selecciona el
        botón de "Vista por Canchas" y elige una cancha para ver las reservas.
        Luego, filtra por una fecha para obtener las reservas registradas en esa
        semana.
      </p>
      <section className="flex flex-column items-center justify-between w-full">
        <Tabs defaultValue="canchas" className="w-full">
          <TabsList>
            <TabsTrigger value="canchas">Vista por Canchas</TabsTrigger>
            {/* Puedes pedir un endpoint para obtener las reservas por fecha
            <TabsTrigger value="calendario">Vista Calendario</TabsTrigger> */}
          </TabsList>
          <TabsContent value="canchas">
            <ReservasPorCancha
              canchas={canchas.map((cancha) => cancha.canchas_id)}
            />
          </TabsContent>
          {/*
          <TabsContent value="calendario">
            <ReservasCalendario reservas={reservas} />
          </TabsContent>
          */}
        </Tabs>
      </section>
      <section className="flex flex-col items-start justify-start w-full mt-10 border-2 border-gray-200 rounded-lg p-4">
        <h1 className="text-lg font-bold mb-4 flex flex-row items-center gap-2">
          ¿Quieres registrar una reserva externa?
        </h1>
        <p className="text-sm text-gray-500 mb-5">
          Si tienes una reserva que no es de Cancheros, puedes registrarla
          aquí*.
        </p>
        <Button className="mb-5">Registrar reserva</Button>
        <p className="text-sm text-gray-500">
          Nota: Servicio sujeto a{" "}
          <Link href="/terms" target="_blank" className="text-blue-500">
            términos y condiciones
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
