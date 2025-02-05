interface ClubAttributes {
    id_captain: string;
    name: string;
    description: string;
    logo?: string; // Logo en formato base64
  }
  
  // Función para procesar una imagen base64 y convertirla en un Blob
  function processBase64Image(base64String: string, fileName: string = "image.jpg", mimeType: string = "image/jpeg"): Blob {
    try {
      const base64 = base64String.includes("base64,")
        ? base64String.split("base64,")[1]
        : base64String;
  
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: mimeType }); // Retorna el Blob
    } catch (error) {
      console.error("Error al procesar la imagen base64:", error);
      throw new Error("Error al procesar la imagen base64");
    }
  }
  
  export async function createClub({
    id_captain,
    name,
    description,
    logo,
  }: ClubAttributes) {
    try {

      const formData = new FormData();
      const attributes = {
        nombre: name,
        descripcion: description,
      }
      formData.append("json", JSON.stringify(attributes));
      
  
      
      if (logo) {
        const logoBlob = processBase64Image(logo, "logo.jpg", "image/jpeg");
        formData.append("file", logoBlob, "logo.jpg");
      }else{
        formData.append("file",  new File([], "empty.jpg", { type: "image/jpeg" })); // no funciona como deberia

      }
      
  
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create_club/${id_captain}`, {
        method: "POST",
        
        body: formData, 
      });
  
      if (!res.ok) {
        throw new Error("Error al crear el club");
      }
  
      // Devolver la respuesta del servidor
      return await res.json();
    } catch (e) {
      if (e instanceof Error) {
        console.error("Error en createClub:", e.message);
        throw new Error(e.message);
      } else {
        throw new Error("Error desconocido");
      }
    }
  }


const mockClubs: ReturnClub[] = [
    {
      idTeam: "team_001",
      idCaptain: "captain_101",
      numberPlayers: 11,
      name: "Los Titanes",
      icon: "https://example.com/icons/titanes.png"
    },
    {
      idTeam: "team_002",
      idCaptain: "captain_102",
      numberPlayers: 8,
      name: "Fuerza Azul",
      icon: "https://example.com/icons/fuerza_azul.png"
    },
    {
      idTeam: "team_003",
      idCaptain: "captain_103",
      numberPlayers: 5,
      name: "Rápidos y Furiosos"
    },
    {
      idTeam: "team_004",
      idCaptain: "captain_104",
      numberPlayers: 7,
      name: "Los Halcones",
      icon: "https://example.com/icons/halcones.png"
    },
    
    
  ];

  
export interface ReturnClub{
  idTeam: string;
  idCaptain: string;
  numberPlayers: number;
  name: string;
  icon?:string;
}
  export async function getClubs(
    id_user:string):Promise<ReturnClub[]> {
    console.log("id_user getClubs",id_user)

    return mockClubs;
    // try {

    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clubs/${id_user}`, {
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
  
  