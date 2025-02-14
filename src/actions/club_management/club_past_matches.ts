export interface ReturnPastMatches{
    idMatch:string;
    date:string;
    hour:{startHour:string,endHour:string};
    bussinesName:string
    score: {teamName:string,teamId:string, score:number |undefined}[];
}
const mockPastMatches: ReturnPastMatches[] = [
    {
        idMatch: "1",
        date: "2023-10-01",
        hour: { startHour: "15:00", endHour: "16:30" },
        bussinesName: "Cancha Los Pinos",
        score: [
            { teamName: "Equipo A", teamId: "A1", score: 2 },
            { teamName: "Equipo B", teamId: "B1", score: 1 }
        ]
    },
    {
        idMatch: "2",
        date: "2023-10-02",
        hour: { startHour: "18:30", endHour: "20:00" },
        bussinesName: "Estadio Central",
        score: [
            { teamName: "Equipo C", teamId: "C1", score: 3 },
            { teamName: "Equipo D", teamId: "D1", score: 3 }
        ]
    },
    {
        idMatch: "3",
        date: "2023-10-03",
        hour: { startHour: "20:00", endHour: "21:30" },
        bussinesName: "Polideportivo San Juan",
        score: [
            { teamName: "Equipo E", teamId: "E1", score: 1 },
            { teamName: "Equipo F", teamId: "F1", score: 0 }
        ]
    },
    {
        idMatch: "4",
        date: "2023-10-04",
        hour: { startHour: "12:00", endHour: "13:30" },
        bussinesName: "Cancha El Trébol",
        score: [
            { teamName: "Equipo G", teamId: "G1", score: 4 },
            { teamName: "Equipo H", teamId: "H1", score: 2 }
        ]
    },
    {
        idMatch: "5",
        date: "2023-10-05",
        hour: { startHour: "14:45", endHour: "16:15" },
        bussinesName: "Estadio La Fortaleza",
        score: [
            { teamName: "Equipo I", teamId: "I1", score: undefined },
            { teamName: "Equipo J", teamId: "J1", score: undefined }
        ]
    }
];

export async function getPastMatches(
    idTeam:string):Promise<ReturnPastMatches[]> {

    console.log("get pastMatches",idTeam)
    return mockPastMatches

    // try {

    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clubs/past_matches/${idTeam}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
  
    //   if (!res.ok) {
    //     const data = await res.json();
    //     throw new Error(data.message);
    //   }
  
    //   // Devolver la respuesta del servidor
    //   return await res.json();
    // } catch (e) {
    //   if (e instanceof Error) {
    //     console.error("Error en obtener Clubes:", e.message);
    //     throw new Error(e.message);
    //   } else {
    //     throw new Error("Error desconocido");
    //   }
    // }
  }