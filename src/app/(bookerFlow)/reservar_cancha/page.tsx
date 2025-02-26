import { getBussiness } from "@/actions/book_field/booking_actions";
import Loading from "@/app/(bookerFlow)/reservar_cancha/loading";
import SelectBussiness from "@/components/reservar_components/SelectBussiness";
import { Suspense } from "react";

export default  function reservar_cancha() {
  

  return (
    <div className="flex  flex-col items-center justify-center ">
      <div className="flex flex-col align-start w-full mb-10">
        <h1 className="text-3xl text-primary-40 font-bold">
          Seleciona el negocio donde deseas hacer tus reservas
        </h1>
        <p className="text-gray-500 mt-2">
          Utiliza los filtros para encontrar la cancha que responda a tus
          necesidades. Luego selecciona uno de nuestros establecimientos para
          ver más de sus detalles
        </p>
      </div>

      <div className="md:px-6 w-full">
        <SelectBussiness />
      </div>
    </div>
  );
}
