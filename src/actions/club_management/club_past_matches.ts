export interface ReturnPastMatches {
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
    teamAName: string,
    teamBName: string,
    idField: string,
    score: { teamName: string, teamId: string, score: number | undefined }[];

}

const pastMatchesMock: ReturnPastMatches[] = [
    {
        idReservation: "1",
        dateReservation: "2023-10-01",
        hours: { startHour: "14:00", endHour: "16:00" },
        idBooker: "booker123",
        bussinesName: "Soccer World",
        FieldType: "Grass",
        capacity: 10,
        bussinessDirection: "123 Main St, Springfield",
        fieldImg: "/soccer_photo.png",
        totalPrice: 200,
        geoGraphicalLocation: { lat: 34.0522, long: -118.2437 },
        isParticipating: true,
        teamAName: "Team Alpha",
        teamBName: "Team Beta",
        idField: "field1",
        score: [
            { teamName: "Team Alpha", teamId: "team1", score: undefined },
            { teamName: "Team Beta", teamId: "team2", score: undefined }
        ]
    },
    {
        idReservation: "2",
        dateReservation: "2023-10-02",
        hours: { startHour: "16:00", endHour: "18:00" },
        idBooker: "booker456",
        bussinesName: "Goal Arena",
        FieldType: "Artificial Turf",
        capacity: 8,
        bussinessDirection: "456 Elm St, Shelbyville",
        totalPrice: 180,
        geoGraphicalLocation: { lat: 34.0522, long: -118.2437 },
        isParticipating: false,
        teamAName: "Team Gamma",
        teamBName: "Team Delta",
        idField: "field2",
        score: [
            { teamName: "Team Gamma", teamId: "team3", score: 1 },
            { teamName: "Team Delta", teamId: "team4", score: 1 }
        ]
    },
    {
        idReservation: "3",
        dateReservation: "2023-10-03",
        hours: { startHour: "18:00", endHour: "20:00" },
        idBooker: "booker789",
        bussinesName: "Champion Fields",
        FieldType: "Indoor",
        capacity: 6,
        bussinessDirection: "789 Oak St, Capital City",
        fieldImg: "/soccer_photo.png",
        totalPrice: 220,
        geoGraphicalLocation: { lat: 34.0522, long: -118.2437 },
        isParticipating: true,
        teamAName: "Team Epsilon",
        teamBName: "Team Zeta",
        idField: "field2",
        score: [
            { teamName: "Team Epsilon", teamId: "team5", score: 4 },
            { teamName: "Team Zeta", teamId: "team6", score: 4 }
        ]
    },
    {
        idReservation: "4",
        dateReservation: "2023-10-04",
        hours: { startHour: "20:00", endHour: "22:00" },
        idBooker: "booker101",
        bussinesName: "Victory Park",
        FieldType: "Grass",
        capacity: 12,
        bussinessDirection: "101 Pine St, Metropolis",
        totalPrice: 250,
        geoGraphicalLocation: { lat: 34.0522, long: -118.2437 },
        isParticipating: true,
        teamAName: "Team Eta",
        teamBName: "Team Theta",
        idField: "field2",
        score: [
            { teamName: "Team Eta", teamId: "team7", score: 2 },
            { teamName: "Team Theta", teamId: "team8", score: 3 }
        ]
    },
    {
        idReservation: "5",
        dateReservation: "2023-10-05",
        hours: { startHour: "22:00", endHour: "00:00" },
        idBooker: "booker112",
        bussinesName: "Final Whistle",
        FieldType: "Artificial Turf",
        capacity: 10,
        bussinessDirection: "112 Maple St, Gotham",
        fieldImg: "/soccer_photo.png",
        totalPrice: 210,
        geoGraphicalLocation: { lat: 34.0522, long: -118.2437 },
        isParticipating: false,
        teamAName: "Team Iota",
        teamBName: "Team Kappa",
        idField: "field2",
        score: [
            { teamName: "Team Iota", teamId: "team9", score: 5 },
            { teamName: "Team Kappa", teamId: "team10", score: 2 }
        ]
    }
];

export async function getPastMatches(
    idTeam: string): Promise<ReturnPastMatches[]> {

    console.log("get pastMatches", idTeam)
    return pastMatchesMock

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

export async function addScoreToMatch(
    idTeam: string,
    idReservation: string,
    score: { teamName: string, teamId: string, score: number }[]

): Promise<void> {

    console.log("add Score", idTeam, idReservation, score)

    // try {

    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clubs/add_score`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ idTeam, idReservation, score })
    //     });

    //     if (!res.ok) {
    //         const data = await res.json();
    //         throw new Error(data.message);
    //     }

       
    // } catch (e) {
    //     if (e instanceof Error) {
    //         console.error("Error al agregar el marcador: ", e.message);
    //         throw new Error(e.message);
    //     } else {
    //         throw new Error("Error desconocido");
    //     }
    // }
}