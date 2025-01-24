"use client";
import { AddFieldModal } from "@/components/forms/fields-register/addFieldModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function pageMisCanchas() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <article className="flex flex-col items-center justify-center h-screen w-[90vw]   ml-[5vw] self-center">
      <section className="flex flex-col items-center gap-4 mb-20 w-[90vw] align-center pl-[5vw]">
        <div className="flex flex-row items-center gap-4 self-start">
          <Image
            src="/icons/canchaGris.svg"
            alt="Logo"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold text-[#1A6B51]">TUS CANCHAS</h1>
        </div>
        <div className="flex flex-row items-start gap-32 mt-5 align-top self-start pl-[5vw]">
          <p className="text-center text-sm text-gray-500 ">
            Registra las canchas de tu complejo deportivo y ajusta su
            disponibilidad para recibir reservas.
          </p>
          <Button variant="default" onClick={() => setIsModalOpen(true)}>
            Agregar Cancha
          </Button>
        </div>
      </section>
      <AddFieldModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <article className="flex flex-col items-center gap-4 mt-10">
        <Image
          src="/icons/canchaGris.svg"
          alt="Logo"
          width={150}
          height={150}
        />
        <p className="text-center text-sm text-gray-500 p-20  pt-10 pb-0 w-[40vw]">
          Agrega las canchas de tu complejo deportivo para empezar a recibir
          reservas y conectar con más clientes. Es rápido y sencillo. ¡Haz clic
          en el botón y comienza ahora!
        </p>
        <Button
          variant="default"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Registrar mi primera Cancha
        </Button>
      </article>
    </article>
  );
}
