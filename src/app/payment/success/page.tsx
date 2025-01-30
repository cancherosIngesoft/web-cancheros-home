"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    // Extraer todos los queryParams relevantes
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
    /*
    // Verificar estado del pago en tu backend
    const verifyPayment = async () => {
      try {
        const response = await fetch(`/api/payment_gateway/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        });
        const data = await response.json();
        console.log("Payment verified:", data);
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    };


    verifyPayment();
    */
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-green-600 mb-4">
            ¡Pago Exitoso!
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
              Tu reserva ha sido confirmada exitosamente.
            </p>

            <div className="flex flex-col space-y-2">
              <Link
                href="/mis_reservas"
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Ver Mis Reservas
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-gray-500">
              Recibirás un correo electrónico con los detalles de tu reserva.
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
