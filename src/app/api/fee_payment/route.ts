import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.FEE_MERCADO_PAGO_ACCESS_TOKEN!,
});
const preference = new Preference(client);

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombres, apellidos, cedula, correo, id_user, amount } = body;

    const price = parseInt(amount);
    if (isNaN(price) || price <= 0) {
      return NextResponse.json({ message: "Invalid price" }, { status: 400 });
    }

    const preferenceData = {
      body: {
        items: [
          {
            id: id_user,
            title: `Comisión de usuario ${id_user}`,
            unit_price: parseFloat(amount),
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
