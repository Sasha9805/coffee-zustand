import type {
  CoffeeType,
  GetCoffeeListRequestParams,
} from "../types/coffeeTypes";
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

export const setParams = (params?: GetCoffeeListRequestParams) =>
  useCoffeeStore.getState().setParams(params);

export const setAddress = (address: string) =>
  useCoffeeStore.getState().setAddress(address);

export const orderCoffee = () => useCoffeeStore.getState().orderCoffee();

export const clearCart = () => useCoffeeStore.getState().clearCart();

export const addToCart = (item: CoffeeType) =>
  useCoffeeStore.getState().addToCart(item);

export const setData = (data?: CoffeeType[]) =>
  useCoffeeStore.setState({ coffeeList: data });
