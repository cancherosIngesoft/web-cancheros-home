import { JWT } from "next-auth/jwt";

export interface IAuthState {
  userRole: string | null;
  token: string | JWT | null;
  email: string | null;
  name: string | null;
  // Puedes agregar más propiedades aquí
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
