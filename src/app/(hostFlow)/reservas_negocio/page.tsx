"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { CourtReservationsCalendar } from "@/components/hostBooking/court-reservation-calendar";

function ReservasNegocioContent() {
  return (
    <div className="flex flex-col items-start justify-start h-screen w-[90vw]   ml-[5vw] self-center">
      <div className="flex flex-row items-start justify-start w-full ">
        <div className="flex-1">
          <section className="flex flex-row items-center mb-5 gap-4 w-full">
            <Image
              src="/icons/booking_logo.svg"
              alt="Logo"
              width={40}
              height={40}
            />
            <h1 className="text-3xl text-primary-40 font-bold">
              Ver mis reservas por cancha
            </h1>
          </section>

          <p className="text-gray-500 mt-2">
            Aquí podrás ver por cancha, las reservas que han realizado los
            usuarios
          </p>
        </div>
      </div>
      <article className="flex flex-col items-start justify-start w-full mt-10">
        <div className="flex flex-row items-start justify-start w-full">
          <div className="flex-1">
            <CourtReservationsCalendar />
          </div>
        </div>
      </article>
    </div>
  );
}

export default function ReservasNegocio() {
  return <ReservasNegocioContent />;
}
