import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { format } from "date-fns";
import { handleBookingAndPayment } from "@/actions/book_field/booking_actions";
import { useGlobalStore, useReservationStore, useTeamDataStore } from "@/store";
import { useToast } from "@/hooks/use-toast";
import {
  PaymentFormData,
  ReservaDetails,
} from "@/actions/book_field/booking_actions";
import TeamInfo from "../club/TeamInfo";
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservaDetails: ReservaDetails;
}

export default function PaymentModal({
  isOpen,
  onClose,
  reservaDetails,
}: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<
    "Cargando" | "Reservando" | "Pagando"
  >("Cargando");

  const auth = useGlobalStore((state) => state.auth);
  const reservation = useReservationStore((state) => state.reservationInfo);

  const onSubmit = async (data: PaymentFormData) => {
    setIsLoading(true);
    try {
      setCurrentStep("Reservando");

      const result = await handleBookingAndPayment(
        data,
        reservaDetails,
        Number(auth?.id),
        reservation.inTeam,
        reservation.teamId
      );

      setCurrentStep("Pagando");
      toast({
        title: "Reserva creada",
        description: "Ahora puedes pagar la reserva",
      });

      if (result.init_point) {
        window.location.href = result.init_point;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
      setCurrentStep("Cargando");
    }
  };

  useEffect(() => {
    toast({
      title: "Progreso",
      description: currentStep,
    });
  }, [currentStep]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 ">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-2">
        <Dialog.Panel className="mx-auto max-w-md rounded bg-white p-6  w-[50vw]  ">
          <Dialog.Title className="text-xl font-bold mb-4">
            Detalles de la Reserva
          </Dialog.Title>

          <div className="mb-6">
            <p>
              <strong>Lugar:</strong> {reservaDetails.lugar}
            </p>
            <p>
              <strong>Fecha:</strong> {format(reservaDetails.fecha, "PPP")}
            </p>
            <p>
              <strong>Cancha:</strong> #{reservaDetails.cancha}
            </p>
            <p>
              <strong>Horas:</strong> {reservaDetails.horas}
            </p>
            <p>
              <strong>Total a pagar:</strong> $
              {reservaDetails.total.toLocaleString()}
            </p>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            A continuación ingrese los datos de la persona que va a pagar, será
            redirigido a la pasarela de pago de Mercado Pago
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombres
              </label>
              <Input
                type="text"
                {...register("nombres", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
              />
              {errors.nombres && (
                <span className="text-red-500 text-sm">
                  Este campo es requerido
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apellidos
              </label>
              <Input
                type="text"
                {...register("apellidos", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cédula
              </label>
              <Input
                type="text"
                {...register("cedula", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <Input
                type="email"
                {...register("correo", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Volver
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 disabled:opacity-50"
              >
                {isLoading ? "Procesando..." : "Pagar"}
              </button>
            </div>
          </form>

          <div className="mt-4 flex justify-end self-end">
            <img src="/mercadopago.png" alt="Mercado Pago" className="h-8" />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
