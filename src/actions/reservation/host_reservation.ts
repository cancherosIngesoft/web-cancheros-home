export async function CreateHostReservation(
    idField: string, 
    idHost:string,  
    newHours:{startDateAndHour:string, endDateAndHour:string},
    userName:string,
    userEmail:string

): Promise<void> { 
    // Mock data
    console.log(`creando host reserva ${idField}`);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reservations/create_host/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({idField, idHost, newHours, userName, userEmail}),
        }
      );
  
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
      
    } catch (e) {
      if (e instanceof Error) {
        console.error("Error en crear reserva host:", e.message);
        throw new Error(e.message);
      } else {
        throw new Error("Error desconocido");
      }
    }
  }