export interface ReservationActiveReturn {
    idReservation:string,
    dateReservation:string
    hours: {horaInicio:string, horaFin:string}
    inTeam: boolean
    idBooker: string
    bussinesName:string
    FieldType:string
    capacity:number
    bussinessDirection:string,
    fieldImg?:string
    totalPrice:number
    teamName?:string
        
}
const reservationsMock: ReservationActiveReturn[] = [
    {
        idReservation: "resv12345",
        dateReservation: "2025-02-1",
        hours: {horaInicio:"10:00", horaFin:"12:00"},
        inTeam: true,
        idBooker: "15",
        bussinesName: "Cancha Futbol Pro",
        bussinessDirection: "Calle 123",
        FieldType: "Fútbol 5",
        capacity: 10,
        totalPrice: 1000,
        teamName: "Los campeones"
        
    },
    {
        idReservation: "resv67890",
        dateReservation: "2025-02-20",
        hours: {horaInicio:"14:00", horaFin:"16:00"},
        inTeam: false,
        idBooker: "user1234",
        bussinessDirection: "Calle 456",
        bussinesName: "Deportivo Elite",
        FieldType: "Fútbol 8",
        capacity: 16,
        totalPrice: 2000,
        teamName: "Los campeones"
       
    }
];

export async function getActiveReservation(id_user: string): Promise<ReservationActiveReturn[]> {
    console.log("active reservartions",id_user)

    return reservationsMock
    // try {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservation/active/${id_user}`, {
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
    //         console.error("Error en get Reservations:", e.message);
    //         throw new Error(e.message);
    //     } else {
    //         throw new Error("Error desconocido");
    //     }
    // }
}
export async function getPastReservation(id_user: string): Promise<ReservationActiveReturn[]> {
    console.log("past reservartions",id_user)
    return reservationsMock
    // try {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservation/past/${id_user}`, {
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
    //         console.error("Error en get Reservations:", e.message);
    //         throw new Error(e.message);
    //     } else {
    //         throw new Error("Error desconocido");
    //     }
    // }
}
