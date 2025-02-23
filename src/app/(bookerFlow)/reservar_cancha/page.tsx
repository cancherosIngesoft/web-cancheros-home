import { getBussiness } from "@/actions/book_field/booking_actions";
import Loading from "@/app/(bookerFlow)/reservar_cancha/loading";
import SelectBussiness from "@/components/reservar_components/SelectBussiness";
import { Suspense } from "react";

export default async function reservar_cancha() {
  let allTheBussiness;

  try {
    allTheBussiness = await getBussiness();
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    // Opcionalmente, puedes retornar contenido alternativo aquí
    return (
      <div>
        <h1>Error</h1>
        <p>Hubo un problema al cargar los negocios.</p>
      </div>
    );
  }

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
        <SelectBussiness initialBusinesses={allTheBussiness} />
      </div>
    </div>
  );
}
