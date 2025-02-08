
export interface ReservationActiveReturn {
    idReservation: string,
    dateReservation: string
    hours: { horaInicio: string, horaFin: string }
    inTeam: boolean
    idBooker: string
    bussinesName: string
    FieldType: string
    capacity: number
    bussinessDirection: string,
    fieldImg?: string
    totalPrice: number
    teamName?: string

}

export async function getActiveReservation(id_user: string): Promise<ReservationActiveReturn[]> {
    console.log("active reservartions", id_user)


    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservations/active/${id_user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

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
export async function getPastReservation(id_user: string): Promise<ReservationActiveReturn[]> {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservations/inactive/${id_user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

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


const teamReservationsMock: TeamReservationReturn[] = [
    {
      idReservation: "res_001",
      dateReservation: "2025-02-15",
      hours: { horaInicio: "18:00", horaFin: "20:00" },
      idBooker: "user_123",
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
  
  console.log(teamReservationsMock);
  
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

