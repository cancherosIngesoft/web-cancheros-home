export const userManagement = async (email: string, nombre:string): Promise<any | false> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rol_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: email, nombre: nombre }),
      })
  
      if (res.ok) {
        const data = await res.json()
        return data // Devuelve el JSON completo
      } else {
        return false
      }
    } catch (e) {
      console.error("Error en userManagement:", e)
      return false
    }
   
    
  }