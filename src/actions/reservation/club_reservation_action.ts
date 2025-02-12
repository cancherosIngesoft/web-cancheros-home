export async function joinTeam(id_reservation: string, id_team:string, id_user:string): Promise<void> {
    console.log("joinTeam", id_reservation)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservations/team/join_team}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id_reservation, id_team, id_user}),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message);
        }
        const data = await res.json();

        return data;
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reservations/team/join_team}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id_reservation, id_user}),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message);
        }
        const data = await res.json();

        return data;
    } catch (e) {
        if (e instanceof Error) {
            console.error("Error on join Team:", e.message);
            throw new Error(e.message);
        } else {
            throw new Error("Error desconocido");
        }
     }
}




