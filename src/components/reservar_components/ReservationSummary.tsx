// ReservationSummary.tsx
import { CalendarDays, Clock, CircleDollarSign } from "lucide-react";
import TeamIcon from "../icon/TeamIcon";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface ReservationSummaryProps {
  selectedDate: Date;
  selectedHours: { hora_inicio: string; hora_fin: string }[];
  bookingModality: "individual" | "team";
  selectedTeam: { nameTeam: string } | null;
  selectedField: { price: number; id_field: string };
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  selectedDate,
  selectedHours,
  bookingModality,
  selectedTeam,
  selectedField,
}) => {
  const totalAmount = selectedField.price * selectedHours.length;
  const paymentAmount = totalAmount / 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-4 space-y-4 bg-tertiary-98 border-[1px] border-gray-300 p-6 rounded-md"
    >
      <h3 className="text-xl font-semibold text-tertiary-50">Resumen de la reserva</h3>
      <div className="flex  flex-col md:flex-row gap-6">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <CalendarDays className="h-6 w-6 text-tertiary-40" />
          <p className="text-md font-bold">Fecha:</p>
          <p className="text-sm ">{format(selectedDate, "PPP")}</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Clock className="h-6 w-6 text-tertiary-40" />
          <p className="text-md font-bold">Horario:</p>
          <p className="text-sm ">
            {selectedHours
              .map((item) => item.hora_inicio + "-" + item.hora_fin)
              .join(", ")}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2">
        <TeamIcon className="h-6 w-6 text-tertiary-40 border-0" />
        <p className="text-md font-bold">Modalidad:</p>
        <p className="text-sm ">
          {bookingModality === "individual"
            ? "Individual"
            : `En club con ${selectedTeam?.nameTeam}`}
        </p>
      </div>
      <hr className="w-full border-gray-300 border-[1.5px]" />
      <div className="flex md:flex-row-reverse items-center">
        <p className="font-bold text-lg text-tertiary-30">
          Total:{" "}
          <span className="text-black">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              maximumFractionDigits: 0,
            }).format(totalAmount)}
          </span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <CircleDollarSign className="h-6 w-6 text-primary-70" />
        <p className="font-bold text-xl text-primary-70">
          Total para reservar:{" "}
          
        </p>
        <span className="text-black font-bold">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              maximumFractionDigits: 0,
            }).format(paymentAmount)}
          </span>
      </div>
      <p className="text-xs text-gray-500">
        Para poder acceder a la reserva se tiene que pagar la mitad del valor
        total
      </p>
    </motion.div>
  );
};

export default ReservationSummary;
