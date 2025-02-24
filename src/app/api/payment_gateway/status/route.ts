import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentId = searchParams.get("payment_id");

  if (!paymentId) {
    return NextResponse.json(
      { message: "payment_id es requerido" },
      { status: 400 }
    );
  }

  try {
    const payment = new Payment(client);
    const response = await payment.get({ id: paymentId });

    return NextResponse.json({
      status: response.status,
      status_detail: response.status_detail,
    });
  } catch (error) {
    console.error("Error getting payment status:", error);
    return NextResponse.json(
      { message: "Error getting payment status" },
      { status: 500 }
    );
  }
}
