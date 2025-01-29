"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PendingPage() {
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<any>(null);

  useEffect(() => {
    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");

    if (paymentId) {
      setPaymentInfo({
        id: paymentId,
        status,
      });
    }
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
            <div className="mt-4 text-left text-gray-600">
              <p>ID de pago: {paymentInfo.id}</p>
              <p>Estado: {paymentInfo.status}</p>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <p className="text-gray-600">
              Tu pago está siendo procesado. Te notificaremos cuando se
              complete.
            </p>
            <p className="text-sm text-gray-500">
              Este proceso puede tomar unos minutos. No cierres esta ventana.
            </p>

            <div className="flex flex-col space-y-2">
              <Link
                href="/mis_reservas"
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Ver Mis Reservas
              </Link>

              <button
                onClick={() => window.location.reload()}
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Actualizar Estado
              </button>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-gray-500">
              Cualquier duda, puedes contactarnos a través de nuestro correo
              cancherosfb@gmail.com o a través de nuestro número de{" "}
              <Link
                href="https://api.whatsapp.com/send/?phone=%2B573023242843&text&type=phone_number&app_absent=0"
                className="text-blue-500 hover:text-blue-700"
                target="_blank"
              >
                WhatsApp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
