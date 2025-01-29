import { SchedulesToBook } from "@/actions/book_field/booking_actions";
import { JWT } from "next-auth/jwt";

export interface IAuthState {
  userRole: string | null;
  token: string | JWT | null;
  email: string | null;
  name: string | null;
  // Puedes agregar más propiedades aquí
}

export interface IFieldState {
  field_name: string;
  field_description: string;
  field_images: string[];
  field_price: number;
  field_type: string;
  field_capacity: number;
  field_schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface IUserState {
  name: string | null;
  lastName: string | null;
  phone: string | null;
  // Puedes agregar más propiedades aquí
}

export interface IGlobalState {
  auth: IAuthState;
  user: IUserState;
  field: IFieldState;
  // Puedes agregar más slices aquí. una slice es una parte del store.
}
//Funciones para actualizar y borrar el store
export type TGlobalStoreData = IGlobalState & {
  updateStore: (
    slice: keyof IGlobalState,
    payload: Partial<IGlobalState[keyof IGlobalState]>
  ) => void;
  clearStore: (slice: keyof IGlobalState) => void;
};


export interface BussinessState {
  bussinessID: string | null;
  // Puedes agregar más slices aquí. una slice es una parte del store.
  [key: string]: any; // Allow dynamic properties
}
export type BussinessData = BussinessState & {
  updateBussinessStore: (
    slice: keyof BussinessState,
    payload: Partial<BussinessState[keyof BussinessState]>
  ) => void;
  clearBussinessStore: (slice: keyof BussinessState) => void;
  changeBussinessID: (bussinessID: string) => void;
  clearBussinessID: () => void;
}

export interface ReservationState {
  reservationInfo: {
    field: { id_field: string, price: number } | null;
    date: Date | null;
    hours: SchedulesToBook[] | null;
    inTeam: boolean
    teamId: string
  }


}

export type ReservationData = ReservationState & {
  updateReservationInfoStore: (
    slice: keyof ReservationState,
    payload: Partial<ReservationState[keyof ReservationState]>
  ) => void;
  clearReservationInfoStore: (slice: keyof ReservationState) => void;

}