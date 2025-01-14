import { Suspense } from "react";
import Loading from "./loading";
import { fetchRequestsOwnersPending } from "@/actions/dashboardRequest";
import RequestPanel from "@/components/panelSolicitudes/RequestPanel";

export default async function panel_solicitudes() {
  let initialPendingRequests;

  try {
    initialPendingRequests = await fetchRequestsOwnersPending();
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    // Opcionalmente, puedes retornar contenido alternativo aquí
    return (
      <div>
        <h1>Error</h1>
        <p>Hubo un problema al cargar las solicitudes pendientes.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <RequestPanel initialPendingRequests={initialPendingRequests} />
    </Suspense>
  );
}
