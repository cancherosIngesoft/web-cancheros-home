import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IGlobalState } from "./types";
import { TGlobalStoreData } from "./types";
export { useShallow } from "zustand/react/shallow";

//Estado inicial del store. Cada slice es una parte del store.
const initialState: IGlobalState = {
  auth: {
    userRole: null,
    token: null,
    email: null,
    name: null,
  },
  user: {
    name: null,
    lastName: null,
    phone: null,
  },
  field: {
    field_name: "",
    field_description: "",
    field_images: [],
    field_price: 0,
    field_schedule: [],
    field_type: "",
    field_capacity: 0,
  },
  // Otros slices iniciales aquí. Un slice es una parte del store. Como una mini store.
};

export const useGlobalStore = create<TGlobalStoreData>()(
  devtools(
    (set) => ({
      ...initialState,
      updateStore: (slice, payload) => {
        set(
          (state) => ({
            [slice]: { ...state[slice], ...payload },
          }),
          false,
          "UPDATE_STORE" // Acción identificable en DevTools
        );
      },
      clearStore: (slice) => {
        set(
          (state) => ({
            [slice]: initialState[slice],
          }),
          false,
          "CLEAR_STORE" // Acción identificable en DevTools
        );
      },
    }),
    {
      name: "GlobalStore", // Nombre que aparecerá en DevTools
      enabled: process.env.NODE_ENV === "development", // Solo activo en desarrollo
    }
  )
);
