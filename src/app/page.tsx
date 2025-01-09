'use client'
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession()


  return (
    <>
    {/** botones de prueba para el registro e inicio de la sesion */}
      <Button onClick={() => signIn('auth0')}>
        Iniciar sesión con Auth0
      </Button>
      <Button onClick={() => signOut()}>
        cerrar sesión
      </Button>
    </>

  )
}
