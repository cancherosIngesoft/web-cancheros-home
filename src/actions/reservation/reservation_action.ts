import { fetchWithRetry } from "@/utils/utils";

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


const teamReservationsMock: TeamReservationReturn[] = [
    {
      idReservation: "res_001",
      dateReservation: "2025-02-15",
      hours: { horaInicio: "18:00", horaFin: "20:00" },
      idBooker: "66",
      bussinesName: "Cancha Fútbol 5 Bogotá",
      FieldType: "Fútbol 5",
      capacity: 10,
      bussinessDirection: "Carrera 15 # 80-20, Bogotá",
      fieldImg: "/soccer_photo.png",
      totalPrice: 120000,
      geoGraphicalLocation: { lat: 4.6765, long: -74.0488 },
      isParticipating: false,
      TeamA: { 
        idTeam: "team_101", 
        teamName: "Los Guerreros", 
        members: ["Juan Pérez", "Carlos Ramírez", "Miguel Torres"] 
      },
      TeamB: { 
        idTeam: "team_102", 
        teamName: "Los Halcones", 
        members: ["Luis Gómez", "Andrés Rojas", "Fernando Díaz"] 
      }
    },
    {
      idReservation: "res_002",
      dateReservation: "2025-02-16",
      hours: { horaInicio: "20:30", horaFin: "22:30" },
      idBooker: "user_456",
      bussinesName: "Complejo Deportivo El Campín",
      FieldType: "Fútbol 8",
      capacity: 16,
      bussinessDirection: "Calle 57 # 28-20, Bogotá",
      totalPrice: 180000,
      geoGraphicalLocation: { lat: 4.6453, long: -74.0785 },
      isParticipating: true,
      TeamA: { 
        idTeam: "team_201", 
        teamName: "Leones del Norte", 
        members: ["David Herrera", "Santiago López", "Pedro Castillo"] 
      },
      TeamB: { 
        idTeam: "team_202", 
        teamName: "Dragones Rojos", 
        members: ["Ricardo Medina", "Jorge Ríos", "Oscar Martínez"] 
      }
    }
  ];
  
  
  
export interface TeamReservationReturn {
    idReservation: string,
    dateReservation: string
    hours: { horaInicio: string, horaFin: string }
    idBooker: string
    bussinesName: string
    FieldType: string
    capacity: number
    bussinessDirection: string,
    fieldImg?: string
    totalPrice: number
    geoGraphicalLocation: { lat: number, long: number }
    isParticipating: boolean,
    TeamA: { idTeam: string, teamName: string, members: string[] }
    TeamB: { idTeam: string, teamName: string, members: string[] }
}

export async function getTeamActiveReservation(id_team: string, id_user:string): Promise<TeamReservationReturn[]> {
    console.log("active reservartions", id_user, id_team)
return teamReservationsMock;
    // try {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservations/team/active${id_user}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });

    //     if (!res.ok) {
    //         const data = await res.json();
    //         throw new Error(data.message);
    //     }
    //     const data = await res.json();

    //     return data;
    // } catch (e) {
    //     if (e instanceof Error) {
    //         console.error("Error en get Past Reservations:", e.message);
    //         throw new Error(e.message);
    //     } else {
    //         throw new Error("Error desconocido");
    //     }
    // }
}

