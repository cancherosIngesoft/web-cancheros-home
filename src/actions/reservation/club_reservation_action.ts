export interface TeamReservationReturn {
  idReservation: string,
  dateReservation: string
  hours: { horaInicio: string, horaFin: string }
  idBooker: string
  businessName: string
  FieldType: string
  capacity: number
  businessDirection: string,
  fieldImg?: string
  totalPrice: number
  geoGraphicalLocation: { lat: number, long: number }
  isParticipating: boolean,
  teamAName:string,
  teamBName:string,
  idField:string,

}

export async function joinTeam(id_reservation: string, id_subTeam:string, id_user:string): Promise<void> {
    console.log("joinTeam", id_reservation)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subequipos/post_to_subequipo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id_reservation:Number(id_reservation), id_subTeam:Number(id_subTeam), id_user:Number(id_user)}),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message);
        }
        
    } catch (e) {
        if (e instanceof Error) {
            console.error("Error on join Team:", e.message);
            throw new Error(e.message);
        } else {
            throw new Error("Error desconocido");
        }
     }
}

export async function desJoinTeam(id_reservation: string, id_user:string): Promise<void> {
    console.log("desJoinTeam", id_reservation)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subequipos/delete_from_subequipo`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id_reservation:Number(id_reservation),id_user:Number(id_user)}),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message);
        }
        
    } catch (e) {
        if (e instanceof Error) {
            console.error("Error on join Team:", e.message);
            throw new Error(e.message);
        } else {
            throw new Error("Error desconocido");
        }
     }
}

// const teamReservationsMock: TeamReservationReturn[] = [
//     {
//       idReservation: "res_001",
//       dateReservation: "2025-02-20",
//       hours: { startHour: "18:00", endHour: "20:00" },
//       idBooker: "66",
//       bussinesName: "Cancha Fútbol 5 Bogotá",
//       FieldType: "Fútbol 5",
//       capacity: 10,
//       bussinessDirection: "Carrera 15 # 80-20, Bogotá",
//       fieldImg: "/soccer_photo.png",
//       totalPrice: 120000,
//       geoGraphicalLocation: { lat: 4.6765, long: -74.0488 },
//       isParticipating: false,
//       teamAName: "Leones",
//       teamBName: "Dragones azules",
//       idField:"49"
      
//     },
//     {
//       idReservation: "res_002",
//       dateReservation: "2025-02-20",
//       hours: { startHour: "20:30", endHour: "22:30" },
//       idBooker: "66",
//       bussinesName: "Complejo Deportivo El Campín",
//       FieldType: "Fútbol 8",
//       capacity: 16,
//       bussinessDirection: "Calle 57 # 28-20, Bogotá",
//       totalPrice: 180000,
//       geoGraphicalLocation: { lat: 4.6453, long: -74.0785 },
//       isParticipating: true,
//       teamAName: "Leones del Norte",
//       teamBName: " Rojos",
//       idField:"49"
      
//     }
//   ];
  
  



export async function getTeamActiveReservation(id_team: string, id_user:string): Promise<TeamReservationReturn[]> {
    console.log("active reservations", id_user, id_team)
//return teamReservationsMock;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservations/active/club/${id_team}/${id_user}`, {
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
            console.error("Error en get active Reservations:", e.message);
            throw new Error(e.message);
        } else {
            throw new Error("Error desconocido");
        }
    }
}

export interface TeamsReturn{
    teamA: { idTeam: string, nameTeam: string, members: string[],score?:number }
    teamB: { idTeam: string, nameTeam: string, members: string[],score?:number }
}

const teamsMock: TeamsReturn = {
    teamA: { 
        idTeam: "team_201", 
        nameTeam: "Leones del Norte", 
        members: ["David Herrera", "Santiago López", "Pedro Castillo"],
        score:2
      },
      teamB: { 
        idTeam: "team_202", 
        nameTeam: "Dragones Rojos", 
        members: ["David Herrera Palacios feo muy largo", "Santiago López", "Pedro Castillo", "Pedro Castillo","David Herrera", "Santiago López", "Pedro Castillo", "Pedro Castillo", "Pedro Castillo","David Herrera", "Santiago López",] ,
        score:3
      }
}
export async function getTeams(id_reservation: string, ): Promise<TeamsReturn> {
    console.log("teams", id_reservation,)
    //return teamsMock;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subequipos/reserva/${id_reservation}`, {
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
            console.error("Error en get teams:", e.message);
            throw new Error(e.message);
        } else {
            throw new Error("Error desconocido");
        }
    }
}





