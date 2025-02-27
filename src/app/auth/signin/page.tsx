"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BallIcon from "@/components/icon/BallIcon";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export const dynamic = 'force-dynamic';

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Redirección segura cuando la sesión es válida
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/reservar_cancha");
    }
  }, [status, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  useEffect(() => {
    if (!searchParams) return;

    const params = new URLSearchParams(searchParams);
    const error = params.get("error");
    const sessionExpired = params.get("sessionExpired");
    const csrf = params.get("csrf");
    const callbackUrl = params.get("callbackUrl");

    const cleanParams = () => {
      const newParams = new URLSearchParams(params);
      newParams.delete("error");
      newParams.delete("sessionExpired");
      newParams.delete("csrf");
      newParams.delete("callbackUrl");
      
      const newUrl = `${pathname}${newParams.toString() ? `?${newParams}` : ''}`;
      window.history.replaceState(null, '', newUrl);
    };

    const handleError = (message: string) => {
      setErrorMessage(message);
      toast({
        title: "Error de autenticación",
        description: message,
        variant: "destructive",
      });
      cleanParams();
    };

    if (error) {
      switch(error) {
        case 'AccessDenied':
          handleError("No tienes permiso para acceder a esta página.");
          break;
        case 'auth0':
        case 'OAuthSignin':
          handleError("Falló la conexión con Auth0. Intenta nuevamente.");
          break;
        case 'Callback':
          handleError("Error en el proceso de autenticación. Intenta de nuevo.");
          break;
        default:
          handleError("Ocurrió un error inesperado durante el inicio de sesión.");
      }
    }

    if (sessionExpired === "true") {
      handleError("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
    }

    if (csrf === "true") {
      handleError("Error de seguridad detectado. Intenta iniciar sesión nuevamente.");
    }

    return () => setErrorMessage(null);
  }, [searchParams, toast, pathname]);

  const handleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const result = await signIn("auth0", { 
        redirect: false,
        callbackUrl: "/reservar_cancha"
      });

      if (result?.error) {
        const errorMap: { [key: string]: string } = {
          'OAuthSignin': "Error en el proveedor de autenticación",
          'AccessDenied': "Acceso denegado",
          'Callback': "Error en el callback de autenticación",
          'Default': "Error al iniciar sesión"
        };
        
        setErrorMessage(errorMap[result.error] || errorMap['Default']);
        return;
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      setErrorMessage("Error de conexión. Verifica tu internet e intenta nuevamente.");
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full h-full bg-green-100 flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <Image 
            src="/CANCHEROS.svg" 
            alt="Cancheros Logo" 
            width={150} 
            height={150} 
            className="mx-auto"
            priority
          />
          <p className="text-gray-600 mt-2">Tu portal para reservar canchas de fútbol</p>
          
          {errorMessage && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 font-medium">{errorMessage}</p>
              <p className="text-sm text-red-500 mt-2">Por favor, intenta iniciar sesión nuevamente</p>
            </div>
          )}
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

          <div className="text-center text-sm text-gray-500">
            ¿Problemas para ingresar?{" "}
            <Link
              href="/contact"
              className="text-green-600 hover:underline"
            >
              Contáctanos
            </Link>
          </div>

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