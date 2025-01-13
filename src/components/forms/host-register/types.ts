export type FormData = {
  nombre: string;
  apellidos: string;
  cedula: string;
  email: string;
  nombreNegocio: string;
  numeroCanchas: number;
  telefono: string;
  tipoCanchas: string[];
  rut: string;
  direccion: string;
  localidad: string;
  ciudad: string;
};

export const STEPS = [
  { id: 1, name: "Información personal" },
  { id: 2, name: "Información del negocio" },
  { id: 3, name: "Ubicación" },
] as const;
