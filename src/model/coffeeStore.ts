import type { GetCoffeeListRequestParams } from "../types/coffeeTypes";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  CartActions,
  CartState,
  ListActions,
  ListState,
} from "./storeTypes";
import { listSlice } from "./listSlice";
import { cartSlice } from "./cartSlice";

export const useCoffeeStore = create<
  CartState & CartActions & ListState & ListActions
>()(
  devtools(
    persist((...args) => ({ ...listSlice(...args), ...cartSlice(...args) }), {
      name: "coffeeStore",
      partialize: (state) => ({ cart: state.cart, address: state.address }),
    }),
    { name: "coffeeStore" }
  )
);

export const getCoffeeList = (params?: GetCoffeeListRequestParams) =>
  useCoffeeStore.getState().getCoffeeList(params);
