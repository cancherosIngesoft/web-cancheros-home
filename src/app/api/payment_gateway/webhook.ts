import { NextApiResponse } from "next/types";

import { NextApiRequest } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { type, data } = req.body;

    if (type === "payment") {
      const paymentId = data.id;
      // Verificar el pago y actualizar tu base de datos
      // Programar la liberación del pago para la fecha especificada
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).json({ error: "Webhook error" });
  }
}
