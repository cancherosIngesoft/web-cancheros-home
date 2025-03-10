export async function CreateHostReservation(
    idField: string, 
    idHost:string,  
    newHours:{hora_inicio:string, hora_fin:string},
    

): Promise<void> { 
    
    console.log(`creando host reserva ${idField}`);
    console.log(JSON.stringify({idField, idHost, newHours}))
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id_cancha:idField, id_host:idHost, ...newHours,}),
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