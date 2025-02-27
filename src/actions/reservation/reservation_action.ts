import { fetchWithRetry } from "@/utils/utils";

export interface ReservationActiveReturn {
  idReservation: string;
  dateReservation: string;
  hours: { horaInicio: string; horaFin: string };
  inTeam: boolean;
  idBooker: string;
  businessName: string;
  FieldType: string;
  capacity: number;
  businessDirection: string;
  fieldImg?: string;
  totalPrice: number;
  teamName?: string;
  idField: string;
  id_referencia_pago: string | null;
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

// const mockReservations: ReservationActiveReturn[] = [
//   {
//     idReservation: "res-001",
//     dateReservation: "2025-02-20",
//     hours: {
//       horaInicio: new Date("2025-02-18T10:00:00").toISOString(),
//       horaFin: new Date("2025-02-18T12:00:00").toISOString(),
//     },
//     inTeam: true,
//     idBooker: "66",
//     bussinesName: "Empresa Ejemplo",
//     FieldType: "Fútbol",
//     capacity: 22,
//     bussinessDirection: "Calle Falsa 123, Ciudad Ejemplo",
//     totalPrice: 100,
//     teamName: "Equipo A",
//     idField: "49",
//   },
// ];

export async function getActiveReservation(
  id_user: string
): Promise<ReservationActiveReturn[]> {
  console.log("active reservartions", id_user);
  //return mockReservations;
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
  } | null;
  id_referencia_pago: string | null;
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
    const res = await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get_courts/${id_user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

export async function getOcupationAndIncomes(
  id_user: string,
  court_id: string,
  month: string,
  year: string
) {
  try {
    const res = await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reservations/financial-report/business/${id_user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        id_court: court_id,
        month: month,
        year: year,
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return {
      ocupation: 0,
      incomes: 0,
    };
  }
}

export async function getReservationByHostId(
  id_user: string,
  month = "2",
  year = "2025",
  week_day = new Date().toISOString().split("T")[0]
): Promise<ReservationActiveReturn[]> {
  try {
    const res = await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reservations/business/${id_user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        month: month,
        year: year,
        week_day: week_day,
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function cancelarReserva(
  reservationId: string,
  paymentId: string
): Promise<any> {
  // Mock data
  console.log(`Cancelando reserva ${reservationId} con paymentId ${paymentId}`);

  if (paymentId) {
    try {
      const res = await fetch(`/api/payment_gateway/delete/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId, reservationId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }

      console.log("Reserva cancelada exitosamente");
      await fetchWithRetry(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reservation/reference/${paymentId}`,
        {
          method: "DELETE",
        }
      );
      console.log("Reserva borrada de la base de datos");
    } catch (e) {
      console.error(e);
    }
  } else {
    throw new Error(
      "No se puede cancelar la reserva. No hay un pago registrado"
    );
  }
}

export async function reprogramationReservation(
  idReservation: string,
  idUser: string,
  newHours: { hora_inicio: string; hora_fin: string }
): Promise<void> {
  // Mock data
  console.log(
    `Reprogramando reserva ${JSON.stringify({
      idReservation,
      idUser,
      newHours,
    })}`
  );
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/booking/reschedule/${idReservation}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newHours }),
      }
    );

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en get Reservations:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}

export async function cancelReservationById(idReservation: string) {
  try {
    const res = await fetchWithRetry(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reservation/${idReservation}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Error al borrar la reserva no pagada");
  }
}
