"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useGlobalStore, useShallow } from "@/store";
import { cancelReservationById } from "@/actions/reservation/reservation_action";
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
  const fieldCancel = useGlobalStore(useShallow((state) => state.fieldCancel));

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

  const deleteReservation = async () => {
    if (typeof window !== "undefined") {
      const bookingId = localStorage.getItem("bookingId");
      if (bookingId) {
        const data = await cancelReservationById(bookingId);
        console.log("Resultado de la operacion " + data);
      }
    }
  };

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
            <div className="mt-4 text-left text-gray-600 space-y-2">
              <p>ID de pago: {paymentInfo.payment_id}</p>
              <p>Estado: {paymentInfo.status}</p>
              <p>Método de pago: {paymentInfo.payment_type}</p>
              <p>Referencia: {paymentInfo.external_reference}</p>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <p className="text-gray-600">
              Lo sentimos, hubo un problema al procesar tu pago. Por favor,
              intenta nuevamente.
            </p>

            <div className="flex flex-col space-y-2">
              {/*
              <button
                onClick={handleRetryPayment}
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
              >
                Reintentar Pago
                </button>
                */}
              {userRole !== "duenio" ? (
                <button
                  onClick={deleteReservation}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                >
                  <Link
                    href={"/reservar_cancha"}
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                  >
                    Volver a reservar
                  </Link>
                </button>
              ) : (
                <Link
                  href={"/comisiones"}
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                >
                  Volver al panel de comisiones
                </Link>
              )}

              <Link
                href="https://api.whatsapp.com/send/?phone=%2B573023242843"
                target="_blank"
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Contactar Soporte
              </Link>
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

export default function FailurePage() {
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
