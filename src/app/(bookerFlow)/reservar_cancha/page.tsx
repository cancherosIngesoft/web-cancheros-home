import { getBussiness } from "@/actions/book_field/field_actions";
import Loading from "@/app/(admin)/panel_solicitudes/loading";
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
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col align-start w-full mb-10">
          <h1 className="text-3xl text-primary-40 font-bold">Seleciona el negocio donde quires hacer tus reservas</h1>
          <p className="text-gray-500 mt-2">Utiliza los filtros para encontar la cancha que responda atus necesidades. Luego seleciona uno de nuestro establecimientos para ver mas de sus detalles</p>
        </div>

        <SelectBussiness initialBusinesses={allTheBussiness}/>
      </Suspense>



    </div>
  );
}
