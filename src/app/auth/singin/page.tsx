"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BallIcon from "@/components/icon/BallIcon";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export const dynamic = 'force-dynamic'; // <-- Desactiva prerrenderizado

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar searchParams solo en el cliente
  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  useEffect(() => {
    if (!searchParams) return;

    const error = searchParams.get("error");
    const sessionExpired = searchParams.get("sessionExpired");
    const csrf = searchParams.get("csrf");

    if (error === "AccessDenied") {
      toast({
        title: "Acceso denegado",
        description: "No tienes permiso para acceder a esta página.",
        variant: "destructive",
      });
    } else if (sessionExpired === "true") {
      toast({
        title: "Sesión expirada",
        description: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
        variant: "alert",
      });
    } else if (csrf === "true") {
      toast({
        title: "Error de seguridad",
        description: "Se detectó un problema de seguridad. Por favor, inicia sesión nuevamente.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("auth0", { redirect: false });
      if (result?.error) {
        toast({
          title: "Error de inicio de sesión",
          description: result.error === "OAuthSignin" 
            ? "Hubo un problema al conectar con Auth0." 
            : "No se pudo iniciar sesión. Verifica tus credenciales.",
          variant: "destructive",
        });
        return;
      }
      router.push("/reservar_cancha");
    } catch (error) {
      toast({
        title: "Error de red",
        description: "Problema de conexión. Verifica tu internet.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Spinner size={40} className="text-green-500" />
          <span className="font-bold text-xl">Cargando...</span>
        </div>
      </div>
    );
  }

  if (session && status === "authenticated") {
    router.push("/reservar_cancha");
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full h-full bg-green-100 flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-8">
          <Image 
            src="/CANCHEROS.svg" 
            alt="Cancheros Logo" 
            width={150} 
            height={150} 
            className="mx-auto"
          />
          <p className="text-gray-600">Tu portal para reservar canchas de fútbol</p>
        </div>
        <div className="space-y-4">
          <Button
            onClick={handleSignIn}
            className="w-full h-16 text-lg font-bold bg-green-500 hover:bg-green-600 transition duration-300"
            disabled={isLoading}
          >
            <BallIcon className="min-h-8 min-w-8" />
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            <BallIcon className="min-h-8 min-w-8" />
          </Button>
          <Link
            href="/"
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300 flex items-center justify-center"
          >
            Volver a la Página Principal
          </Link>
        </div>
      </div>
    </motion.div>
  );
}