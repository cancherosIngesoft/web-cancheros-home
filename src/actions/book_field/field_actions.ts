export interface bussinessInfo{
    id: string
    name: string
    geoReference:{
        lat:number
        lon:number
    }
    calification: number
    priceRange: string
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
    priceRange: "50.000 - 100.000",
  },
  {
    id: "2",
    name: "Restaurante Monserrate",
    geoReference: {
      lat: 4.6050,
      lon: -74.0760,
    },
    calification: 4.7,
    priceRange: "100.000 - 200.000",
  },
  {
    id: "3",
    name: "Tienda Chapinero",
    geoReference: {
      lat: 4.6486,
      lon: -74.0645,
    },
    calification: 4.2,
    priceRange: "30.000 - 70.000",
  },
  {
    id: "4",
    name: "Centro Comercial Andino",
    geoReference: {
      lat: 4.6718,
      lon: -74.0554,
    },
    calification: 4.8,
    priceRange: "150.000 - 300.000",
  },
  {
    id: "5",
    name: "Parque 93 Eventos",
    geoReference: {
      lat: 4.6763,
      lon: -74.0488,
    },
    calification: 4.6,
    priceRange: "120.000 - 250.000",
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
    //         console.error("Error en get Bussines:", e.message)
    //         throw new Error(e.message)
    //     }else{
    //         throw new Error("Error desconocido")
    //     }

    // }
    return businessesMock

}
export const businessesFilterMock:bussinessInfo[] = [
  {
    id: "1",
    name: "Futbol Club A",
    geoReference: {
      lat: 4.7110,
      lon: -74.0721,
    },
    calification: 4.5,
    priceRange: "80.000 - 150.000",
  },
  {
    id: "2",
    name: "Canchas El Campín",
    geoReference: {
      lat: 4.6473,
      lon: -74.0962,
    },
    calification: 4.8,
    priceRange: "120.000 - 200.000",
  },
  {
    id: "3",
    name: "Soccer 5 Premium",
    geoReference: {
      lat: 4.6937,
      lon: -74.0356,
    },
    calification: 4.2,
    priceRange: "90.000 - 170.000",
  },
];


export async function getBussinessFilters(
  location: string,
  date: string,
  fieldType: string,
  minPrice: number,
  maxPrice: number
): Promise<bussinessInfo[]> {
//   try {
//     // In a real implementation, these parameters would be sent to the API
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/business/search`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           location,
//           date,
//           fieldType,
//           minPrice,
//           maxPrice,
//         }),
//       }
//     )

//     if (!res.ok) {
//       throw new Error("Error al buscar los negocios")
//     }

//     const data = await res.json()
//     return data
//   } catch (e) {
//     if (e instanceof Error) {
//       console.error("Error en searchBusiness:", e.message)
//       throw new Error(e.message)
//     } else {
//       throw new Error("Error desconocido")
//     }
//   }

  return businessesFilterMock
}