"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FailurePage() {
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<any>(null);

  useEffect(() => {
    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");
    const errorMessage = searchParams.get("error");

    if (paymentId) {
      setPaymentInfo({
        id: paymentId,
        status,
        error: errorMessage,
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error en el Pago
          </h1>

          {paymentInfo && (
            <div className="mt-4 text-left text-gray-600">
              <p>ID de pago: {paymentInfo.id}</p>
              <p>Estado: {paymentInfo.status}</p>
              {paymentInfo.error && (
                <p className="text-red-500">Error: {paymentInfo.error}</p>
              )}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <p className="text-gray-600">
              Lo sentimos, hubo un problema al procesar tu pago. Por favor,
              intenta nuevamente.
            </p>

            <div className="flex flex-col space-y-2">
              <Link
                href="/mis_reservas"
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Volver a Mis Reservas
              </Link>

              <Link
                href="/contact"
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Contactar Soporte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
