"use client";
import { useGlobalStore } from "@/store";
import Link from "next/link";

const pagePanelNegocio = () => {
  const auth = useGlobalStore((state) => state.auth);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Panel de Negocio</h1>
      <h3>
        Bienvenido {auth.name}, muy pronto podrás ver aquí las estadísticas de
        tu negocio. Por el momento, puedes visualizar tus canchas y reservas.
      </h3>
      <br></br>
      <div className="flex flex-col items-center justify-center">
        <Link href="/mis_canchas" className="hover:text-blue-500">
          Mis Canchas
        </Link>
        <div className="flex flex-col items-center justify-center">
          <Link href="/reservas_negocio" className="hover:text-blue-500">
            Visualizar Reservas
          </Link>
        </div>
      </div>
    </div>
  );
};
export default pagePanelNegocio;
