import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { BussinessState, IGlobalState, ReservationData, ReservationState } from "./types";
import { TGlobalStoreData,  BussinessData } from "./types";
import { de } from "date-fns/locale";
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

const initialStateBussinessID:BussinessState={
  bussinessID: null
}
export const useBussinessStore = create<BussinessData>()(
  devtools(
    (set) => ({
      ...initialStateBussinessID,
      updateBussinessStore: (slice, payload) => {
        set(
          (state) => ({
            [slice]: { ...state[slice], ...payload },
          }),
          false,
          "UPDATE_STORE" // Acción identificable en DevTools
        );
      },
      clearBussinessStore: (slice) => {
        set(
          (state) => ({
            [slice]: initialStateBussinessID[slice],
          }),
          false,
          "CLEAR_STORE" // Acción identificable en DevTools
        );
      },
      changeBussinessID: (bussinessID) => {
        set(
          () => ({
            bussinessID: bussinessID,
          }),
          false,
          "CHANGE_BUSSINESS_ID" // Acción identificable en DevTools
        );
      },
      clearBussinessID: () => {
        set(
          (state) => ({
            bussinessID: null,
          }),
          false,
          "CLEAR_BUSSINESS_ID" // Acción identificable en DevTools
        );
      },
    }),
    {
      name: "BussinessStore", // Nombre que aparecerá en DevTools
      enabled: process.env.NODE_ENV === "development", // Solo activo en desarrollo
    }
  )
)


const initialStateReservationInfo:ReservationState={
  reservationInfo:{
    field: null,
    date: null,
    hours: null,
    inTeam: false,
    teamId: ""
  }
  

}
export const useReservationStore = create<ReservationData>()(
  devtools(
    (set) => ({
      ...initialStateReservationInfo,
      updateReservationInfoStore: (slice, payload) => {
        set(
          (state) => ({
            [slice]: { ...state[slice], ...payload },
          }),
          false,
          "UPDATE_STORE" // Acción identificable en DevTools
        );
      },
      clearReservationInfoStore: (slice) => {
        set(
          (state) => ({
            [slice]: initialStateReservationInfo[slice],
          }),
          false,
          "CLEAR_STORE" // Acción identificable en DevTools
        );
      },
    }),
    {
      name: "ReservationInfoStore", // Nombre que aparecerá en DevTools
      enabled: process.env.NODE_ENV === "development", // Solo activo en desarrollo
    }
  )
)