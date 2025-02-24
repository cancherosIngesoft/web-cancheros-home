"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useGlobalStore } from "@/store";
import { useToast } from "@/hooks/use-toast";

interface PaymentInfo {
  collection_id: string;
  collection_status: string;
  payment_id: string;
  status: string;
  external_reference: string;
  payment_type: string;
  merchant_order_id: string;
  preference_id: string;
  site_id: string;
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useGlobalStore((state) => state.auth);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { toast } = useToast();

  const checkPaymentStatus = async (paymentId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/payment_gateway/status?payment_id=${paymentId}`
      );
      const data = await response.json();

      if (data.status === "approved") {
        toast({
          title: "¡Pago aprobado!",
          description: "Tu pago ha sido procesado exitosamente.",
        });
        // Redirigir a success
        window.location.href = "/payment/success" + window.location.search;
      } else if (data.status === "rejected") {
        toast({
          variant: "destructive",
          title: "Pago rechazado",
          description:
            "Tu pago ha sido rechazado. Por favor, intenta nuevamente.",
        });
        // Redirigir a failure
        window.location.href = "/payment/failure" + window.location.search;
      }

      setPaymentInfo((prev) => ({
        ...prev!,
        status: data.status,
      }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo verificar el estado del pago.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (auth.id) {
      setUserRole(auth.userRole);
    }

    const paymentData = {
      collection_id: searchParams.get("collection_id"),
      collection_status: searchParams.get("collection_status"),
      payment_id: searchParams.get("payment_id"),
      status: searchParams.get("status"),
      external_reference: searchParams.get("external_reference"),
      payment_type: searchParams.get("payment_type"),
      merchant_order_id: searchParams.get("merchant_order_id"),
      preference_id: searchParams.get("preference_id"),
      site_id: searchParams.get("site_id"),
    };

    setPaymentInfo(paymentData as PaymentInfo);

    // Verificar estado inicial
    if (paymentData.payment_id) {
      checkPaymentStatus(paymentData.payment_id);
    }

    // Configurar intervalo para verificar el estado
    const interval = setInterval(() => {
      if (paymentData.payment_id) {
        checkPaymentStatus(paymentData.payment_id);
      }
    }, 5000); // Verificar cada 5 segundos

    return () => clearInterval(interval);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-yellow-600 mb-4">
            Pago en Proceso
          </h1>

          {paymentInfo && (
            <div className="mt-4 text-left text-gray-600 space-y-2">
              <p>ID de pago: {paymentInfo.payment_id}</p>
              <p>Estado: {paymentInfo.status}</p>
              <p>Método de pago: {paymentInfo.payment_type}</p>
              <p>Referencia: {paymentInfo.external_reference}</p>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <p className="text-gray-600">
              Tu pago está siendo procesado. Te notificaremos cuando se
              complete.
            </p>
            <p className="text-sm text-gray-500">
              Este proceso puede tomar unos minutos.
            </p>

            <div className="flex flex-col space-y-2">
              <Link
                href={userRole === "duenio" ? "/comisiones" : "/mis_reservas"}
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {userRole === "duenio"
                  ? "Volver al panel de comisiones"
                  : "Ver Mis Reservas"}
              </Link>

              <button
                onClick={() =>
                  paymentInfo?.payment_id &&
                  checkPaymentStatus(paymentInfo.payment_id)
                }
                disabled={isLoading}
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verificando...
                  </span>
                ) : (
                  "Actualizar Estado"
                )}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-gray-500">
              Para cualquier consulta, contáctanos vía{" "}
              <Link
                href="https://api.whatsapp.com/send/?phone=%2B573023242843"
                target="_blank"
                className="text-blue-500 hover:text-blue-700"
              >
                WhatsApp
              </Link>{" "}
              o al correo cancherosfb@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PendingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
