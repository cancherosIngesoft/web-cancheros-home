import { IField } from "@/actions/registro_host/field";

export interface IFieldCard extends IField {
  id_cancha: number;
  imagen1: string | null;
  precio: number;
  capacidad: number;
  nombre: string;
}
