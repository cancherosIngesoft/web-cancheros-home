import { fetchWithRetry } from "@/utils/utils";
import {
  initiatePayment,
  PaymentFormData,
} from "../book_field/booking_actions";

export async function handleFeePayment(
  formData: PaymentFormData,
  userId: number,
  amount: number
) {
  // 2. Iniciar el pago
  const paymentResult = await initiatePayment(
    {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      cedula: formData.cedula,
      correo: formData.correo,
      id_user: userId,
      amount: amount,
    },
    "/fee_payment"
  );

  return paymentResult;
}

export async function getPendingFees(userId: number): Promise<{
  commission_amount: number | null;
  total_profit: number;
}> {
  /*Aqui se debe obtener las comisiones pendientes de un usuario */
  try {
    const fees = await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/owner/debt/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const feesData = await fees.json();
    return feesData;
    /*
    id: 1,
    amount: 1000,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
    */
  } catch (error) {
    console.error("Error fetching fees:", error);
    throw error;
  }
}
