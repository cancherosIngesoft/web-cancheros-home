  export interface ReturnPlayersClub{
    idPlayer: string;
    name:string;
    isCaptain:boolean;
  }
  
  const mockPlayersClub: ReturnPlayersClub[] = [
    { idPlayer: "p1", name: "Juan Pérez", isCaptain: true },
    { idPlayer: "p2", name: "Carlos Ramírez", isCaptain: false },
    { idPlayer: "p3", name: "Andrés Gómez", isCaptain: false },
    { idPlayer: "p4", name: "Diego Fernández", isCaptain: false },
    { idPlayer: "p5", name: "Luis Rodríguez", isCaptain: true }
  ];
  
  export async function getClubPlayers(
    idTeam:string):Promise<ReturnPlayersClub[]> {

    console.log("get club members",idTeam)
    return mockPlayersClub

    // try {

    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clubs/players/${idTeam}`, {
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

  export async function LeaveClub(
    idTeam:string, idUser:string):Promise<void> {

    console.log("leave",idTeam)


    // try {

    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clubs/leave/`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({idTeam, idUser})
    //   });
  
    //   if (!res.ok) {
    //     const data = await res.json();
    //     throw new Error(data.message);
    //   }
  
    //   // Devolver la respuesta del servidor
    //   return await res.json();
    // } catch (e) {
    //   if (e instanceof Error) {
    //     console.error("Error en al salir del equipo:", e.message);
    //     throw new Error(e.message);
    //   } else {
    //     throw new Error("Error desconocido");
    //   }
    // }
  }

  export async function deleteMember(
    idTeam:string, idUserToDelete:string, idUserWhoDelete:string):Promise<void> {

    console.log("delete",idTeam, idUserToDelete, idUserWhoDelete) 


    // try {

    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clubs/delete/`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({idTeam, idUserToDelete, idUserWhoDelete})
    //   });
  
    //   if (!res.ok) {
    //     const data = await res.json();
    //     throw new Error(data.message);
    //   }
  
    //   // Devolver la respuesta del servidor
    //   return await res.json();
    // } catch (e) {
    //   if (e instanceof Error) {
    //     console.error("Error a eliminar al usuario", e.message);
    //     throw new Error(e.message);
    //   } else {
    //     throw new Error("Error desconocido");
    //   }
    // }
  }
  

  