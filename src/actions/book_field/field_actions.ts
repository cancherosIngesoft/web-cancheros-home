export interface bussinessInfo{
    id: string
    name: string
    geoReference:{
        lat:number
        lon:number
    }
    calification: number
}

const businessesMock: bussinessInfo[] = [
    {
      id: "1",
      name: "Café Bogotá",
      geoReference: {
        lat: 4.7110,
        lon: -74.0721,
      },
      calification: 4.5,
    },
    {
      id: "2",
      name: "Restaurante Monserrate",
      geoReference: {
        lat: 4.6050,
        lon: -74.0760,
      },
      calification: 4.7,
    },
    {
      id: "3",
      name: "Tienda Chapinero",
      geoReference: {
        lat: 4.6486,
        lon: -74.0645,
      },
      calification: 4.2,
    },
    {
      id: "4",
      name: "Centro Comercial Andino",
      geoReference: {
        lat: 4.6718,
        lon: -74.0554,
      },
      calification: 4.8,
    },
    {
      id: "5",
      name: "Parque 93 Eventos",
      geoReference: {
        lat: 4.6763,
        lon: -74.0488,
      },
      calification: 4.6,
    },
  ];
  
export async function getBussiness(): Promise<bussinessInfo[]> {

    // try{
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bussiness`,
    //         {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         }
    //     )
    //     if(!res.ok){
    //         throw new Error("Error al obtener las los negocios")

    //     }
    //     const data = await res.json()

    //     return data
    // }catch(e){
    //     if(e instanceof Error){
    //         console.error("Error en fetchRequestsOwnersPending:", e.message)
    //         throw new Error(e.message)
    //     }else{
    //         throw new Error("Error desconocido")
    //     }

    // }
    return businessesMock

}