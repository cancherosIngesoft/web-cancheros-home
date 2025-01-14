export type FormData = {
  nombre: string;
  apellidos: string;
  tipoDocumento: string;
  email: string;
  nombreNegocio: string;
  numeroCanchas: number;
  telefono: string;
  tipoCanchas: string[];
  rut: FileList | null;
  direccion: string;
  localidad: string;
  ciudad: string;
  latitud: number;
  longitud: number;
  aceptoTerminos: boolean;
  aceptoPrivacidad: boolean;
  documento: string;
  fechaNacimiento: Date;
};

export const STEPS = [
  { id: 1, name: "Información personal" },
  { id: 2, name: "Información del negocio" },
  { id: 3, name: "Ubicación" },
] as const;
