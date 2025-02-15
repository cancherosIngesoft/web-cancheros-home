export async function joinTeam(id_reservation: string, id_subTeam:string, id_user:string): Promise<void> {
     console.log("joinTeam", id_reservation)
    // try {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservations/team/join_team}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({id_reservation, id_team, id_user}),
    //     });

    //     if (!res.ok) {
    //         const data = await res.json();
    //         throw new Error(data.message);
    //     }
        
    // } catch (e) {
    //     if (e instanceof Error) {
    //         console.error("Error on join Team:", e.message);
    //         throw new Error(e.message);
    //     } else {
    //         throw new Error("Error desconocido");
    //     }
    //  }
}

export async function desJoinTeam(id_reservation: string, id_user:string): Promise<void> {
    console.log("desJoinTeam", id_reservation)
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservations/team/join_team}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({id_reservation,id_team}),
//         });

//         if (!res.ok) {
//             const data = await res.json();
//             throw new Error(data.message);
//         }
        
//     } catch (e) {
//         if (e instanceof Error) {
//             console.error("Error on join Team:", e.message);
//             throw new Error(e.message);
//         } else {
//             throw new Error("Error desconocido");
//         }
//      }
}

const teamReservationsMock: TeamReservationReturn[] = [
    {
      idReservation: "res_001",
      dateReservation: "2025-02-15",
      hours: { startHour: "18:00", endHour: "20:00" },
      idBooker: "66",
      bussinesName: "Cancha Fútbol 5 Bogotá",
      FieldType: "Fútbol 5",
      capacity: 10,
      bussinessDirection: "Carrera 15 # 80-20, Bogotá",
      fieldImg: "/soccer_photo.png",
      totalPrice: 120000,
      geoGraphicalLocation: { lat: 4.6765, long: -74.0488 },
      isParticipating: false,
      teamAName: "Leones del Norte",
      teamBName: "Dragones azules"
      
    },
    {
      idReservation: "res_002",
      dateReservation: "2025-02-16",
      hours: { startHour: "20:30", endHour: "22:30" },
      idBooker: "user_456",
      bussinesName: "Complejo Deportivo El Campín",
      FieldType: "Fútbol 8",
      capacity: 16,
      bussinessDirection: "Calle 57 # 28-20, Bogotá",
      totalPrice: 180000,
      geoGraphicalLocation: { lat: 4.6453, long: -74.0785 },
      isParticipating: true,
      teamAName: "Leones del Norte",
      teamBName: "Dragones Rojos"
      
    }
  ];
  
  
  
export interface TeamReservationReturn {
    idReservation: string,
    dateReservation: string
    hours: { startHour: string, endHour: string }
    idBooker: string
    bussinesName: string
    FieldType: string
    capacity: number
    bussinessDirection: string,
    fieldImg?: string
    totalPrice: number
    geoGraphicalLocation: { lat: number, long: number }
    isParticipating: boolean,
    teamAName:string,
    teamBName:string
    score?: {teamName:string,teamId:string, score:number |undefined}[];
    
}


export async function getTeamActiveReservation(id_team: string, id_user:string): Promise<TeamReservationReturn[]> {
    console.log("active reservations", id_user, id_team)
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

export interface TeamsReturn{
    TeamA: { idTeam: string, teamName: string, members: string[] }
    TeamB: { idTeam: string, teamName: string, members: string[] }
}

const teamsMock: TeamsReturn = {
    TeamA: { 
        idTeam: "team_201", 
        teamName: "Leones del Norte", 
        members: ["David Herrera", "Santiago López", "Pedro Castillo"] 
      },
      TeamB: { 
        idTeam: "team_202", 
        teamName: "Dragones Rojos", 
        members: ["David Herrera Palacios feo muy largo", "Santiago López", "Pedro Castillo", "Pedro Castillo","David Herrera", "Santiago López", "Pedro Castillo", "Pedro Castillo", "Pedro Castillo","David Herrera", "Santiago López",] 
      }
}
export async function getTeams(id_reservation: string, ): Promise<TeamsReturn> {
    console.log("teams", id_reservation,)
    return teamsMock;
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





