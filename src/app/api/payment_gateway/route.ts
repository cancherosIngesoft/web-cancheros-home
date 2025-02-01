import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});
const preference = new Preference(client);

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nombres = "",
      apellidos = "",
      cedula = "",
      correo = "",
      reservaDetails = {
        lugar: "prueba",
        cancha: "prueba",
        horas: 1,
        total: 1000,
      },
    } = body;

    const price = parseInt(reservaDetails.total);
    if (isNaN(price) || price <= 0) {
      return NextResponse.json({ message: "Invalid price" }, { status: 400 });
    }

    const preferenceData = {
      body: {
        items: [
          {
            id: `reserva-${Date.now()}`,
            title: `Reserva ${reservaDetails.lugar} - ${reservaDetails.cancha}`,
            unit_price: parseFloat(reservaDetails.total),
            quantity: 1,
            currency_id: "COP",
          },
        ],
        payer: {
          name: nombres,
          surname: apellidos,
          email: correo,
          identification: {
            type: "CC",
            number: cedula,
          },
        },
        external_reference: `${Date.now()}`,
        back_urls: {
          success: `${baseUrl}/payment/success`,
          failure: `${baseUrl}/payment/failure`,
          pending: `${baseUrl}/payment/pending`,
        },
        auto_return: "approved",
        payment_methods: {
          excluded_payment_types: [{ id: "ticket" }],
        },
      },
    };

    const response = await preference.create(preferenceData);

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { message: "Error creating payment" },
      { status: 500 }
    );
  }
}
