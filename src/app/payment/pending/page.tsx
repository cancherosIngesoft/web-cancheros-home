"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useGlobalStore } from "@/store";

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
  const auth = useGlobalStore((state) => state.auth);
  const [userRole, setUserRole] = useState<string | null>(null);
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
                onClick={() => window.location.reload()}
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Actualizar Estado
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
