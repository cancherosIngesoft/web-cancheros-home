export interface ReturnPastMatches {
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
    teamAName: string,
    teamBName: string,
    idField: string,
    score: { teamName: string, teamId: string, score: number | undefined }[];

}


export async function getPastMatches(
  idTeam: string,
  idUser: string
): Promise<ReturnPastMatches[]> {
  console.log("get pastMatches", idTeam);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/partido/past_matches_ordered/${idTeam}/${idUser}`,
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

    // Obtener y mapear la respuesta del servidor
    const data = await res.json();
    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error en obtener partidos pasados:", e.message);
      throw new Error(e.message);
    } else {
      throw new Error("Error desconocido");
    }
  }
}

export async function addScoreToMatch(
    idTeam: string,
    idReservation: string,
    score: number[]

): Promise<void> {

    console.log("add Score", idTeam, idReservation, score)

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partido/add_marcador`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idReservation:Number(idReservation), score })
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message);
        }

       
    } catch (e) {
        if (e instanceof Error) {
            console.error("Error al agregar el marcador: ", e.message);
            throw new Error(e.message);
        } else {
            throw new Error("Error desconocido");
        }
    }
}