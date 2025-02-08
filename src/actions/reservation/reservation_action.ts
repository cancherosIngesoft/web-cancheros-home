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
    TeamA: { idTeam: string, teamName: string, members: string[] }
    TeamB: { idTeam: string, teamName: string, members: string[] }
}

export async function getTeamActiveReservation(id_team: string, id_user:string): Promise<TeamReservationReturn[]> {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservations/team/active${id_user}`, {
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

