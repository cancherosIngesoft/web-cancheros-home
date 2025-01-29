interface ClubAttributes {
    id_captain: string;
    name: string;
    description: string;
    logo: string; // Logo en formato base64
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
      formData.append("name", name);
      formData.append("description", description);
  
      // Procesar el logo usando la función separada
      const logoBlob = processBase64Image(logo, "logo.jpg", "image/jpeg");
      formData.append("logo", logoBlob, "logo.jpg");
  
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/club/${id_captain}`, {
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
  