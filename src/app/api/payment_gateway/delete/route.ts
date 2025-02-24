import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const { paymentId, amount } = await request.json();
    if (!paymentId) {
      return NextResponse.json(
        { message: "paymentId es requerido" },
        { status: 400 }
      );
    }

    // Obtener token de autorización
    const authResponse = await fetch(
      "https://api.mercadopago.com/oauth/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: process.env.MERCADO_PAGO_CLIENT_ID,
          client_secret: process.env.MERCADO_PAGO_CLIENT_SECRET,
          grant_type: "client_credentials",
        }),
      }
    );

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Realizar el reembolso con el nuevo token
    const refundResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}/refunds`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Idempotency-Key": randomUUID(),
        },
        body: JSON.stringify(amount ? { amount } : {}),
      }
    );

    if (!refundResponse.ok) {
      const errorData = await refundResponse.json();
      throw new Error(errorData.message || "Error al emitir reembolso");
    }

    const responseData = await refundResponse.json();

    return NextResponse.json({
      message: "Reembolso emitido correctamente",
      response: responseData,
    });
  } catch (error: any) {
    console.error("Error al emitir reembolso:", error);
    return NextResponse.json(
      { message: "Error al emitir reembolso", error: error.message },
      { status: 500 }
    );
  }
}
