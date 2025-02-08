import type { Reserva } from "@/components/hostBooking/model";
import { useGlobalStore } from "@/store";
import { getCanchasId } from "@/utils/utils";

export interface ReservationActiveReturn {
  idReservation: string;
  dateReservation: string;
  hours: { horaInicio: string; horaFin: string };
  inTeam: boolean;
  idBooker: string;
  bussinesName: string;
  FieldType: string;
  capacity: number;
  bussinessDirection: string;
  fieldImg?: string;
  totalPrice: number;
  teamName?: string;
}

export interface Cancha {
  capacidad: number;
  descripcion: string;
  establecimiento: {
    altitud: number;
    id_establecimiento: number;
    longitud: number;
  };
  id_cancha: number;
  id_establecimiento: number;
  imagen1: string | null;
  imagen2: string | null;
  imagen3: string | null;
  imagen4: string | null;
  imagen5: string | null;
  nombre: string;
  precio: number;
  tipo: string;
}

export async function getActiveReservation(
  id_user: string
): Promise<ReservationActiveReturn[]> {
  console.log("active reservartions", id_user);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reservations/active/${id_user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    const data = await res.json();

    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en get Reservations:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}
export async function getPastReservation(
  id_user: string
): Promise<ReservationActiveReturn[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reservations/inactive/${id_user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    const data = await res.json();

    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en get Past Reservations:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}

interface ReservaBackend {
  estado_procesado: boolean;
  hora_fin: string;
  hora_inicio: string;
  id_reserva: number;
  partido: string | null;
  reservante: {
    id_reservante: number;
    nombre: string;
    tipo_reservante: string;
  };
}

export async function getReservas(
  week_day: string,
  court_id: string
): Promise<ReservaBackend[]> {
  if (!week_day || !court_id) return [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reservations/court/${court_id}?week_day=${week_day}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getCanchas(
  id_user: string
): Promise<
  { canchas_id: string; valor_hora: number; nombre_cancha: string }[]
> {
  if (!id_user) return [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get_courts/${id_user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Error fetching courts");
    }

    const data = await res.json();
    return data.courts.map((court: any) => ({
      canchas_id: court.id_cancha.toString(),
      valor_hora: court.precio || 0,
      nombre_cancha: court.nombre,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function cancelarReserva(id: string): Promise<void> {
  // Mock data
  console.log(`Cancelando reserva ${id}`);
  // Aquí iría la lógica para cancelar la reserva en el backend
}

export async function reprogramarReserva(id: string): Promise<void> {
  // Mock data
  console.log(`Reprogramando reserva ${id}`);
  // Aquí iría la lógica para reprogramar la reserva en el backend
}
