import { getBussiness } from "@/actions/book_field/field_actions";
import Loading from "@/app/(admin)/panel_solicitudes/loading";
import SelectBussiness from "@/components/reservar_components/SelectBussiness";
import { Suspense } from "react";

export default async function reservar_cancha() {
  let initialPendingRequests;

  try {
    initialPendingRequests = await getBussiness();
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
    <div className="flex  flex-col items-center justify-center p-24">
      <Suspense fallback={<Loading />}>
        <h1>Seleciona el negocio donde quires hacer tus reservas</h1>
        <p>Utiliza los filtros para encontar la cancha que responda atus necesidades. Luego seleciona uno de nuestro establecimientos para ver mas de sus detalles</p>
        <SelectBussiness bussiness={initialPendingRequests} />
      </Suspense>

      

    </div>
  );
}
