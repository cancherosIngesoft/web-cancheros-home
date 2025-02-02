"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function reservar_cancha() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="flex  flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Reservar Cancha</h1>
      {session && (
        <p>Bienvenido, {session.user?.name || session.user?.email}</p>
      )}
      {/* Aquí puedes agregar el formulario de reserva de cancha */}
      <p>
        Esto está en trabajo de ser desarrollado. Mientras, puedes cerrar sesión
        o escuchar esta canción:
      </p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/97hwNY3ni10"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="my-4"
      ></iframe>
      <Button onClick={() => signOut()}>cerrar sesion</Button>
    </div>
  );
}
