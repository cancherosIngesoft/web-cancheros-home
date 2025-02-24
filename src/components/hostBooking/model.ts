export interface Reserva {
  id: string;
  negocio: string;
  fecha: string;
  cancha: string;
  estado: "pagada" | "cancelada" | "pendiente";
  valorTotal: number;
  id_referencia_pago: string | null;
  //calificacion?: number
  //equipos?: string[]
  //resultado?: string
}
