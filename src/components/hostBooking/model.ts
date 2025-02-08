export interface Reserva {
  id: string;
  negocio: string;
  fecha: string;
  cancha: string;
  estado: "pagada" | "cancelada" | "pendiente";
  valorTotal: number;
  //calificacion?: number
  //equipos?: string[]
  //resultado?: string
}
