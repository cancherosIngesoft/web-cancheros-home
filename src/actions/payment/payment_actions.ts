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

export async function getPendingFees(userId: number) {
  /*Aqui se debe obtener las comisiones pendientes de un usuario */
  return {
    id: 1,
    amount: 1000,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
