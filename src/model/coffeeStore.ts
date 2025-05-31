import type {
  CoffeeType,
  GetCoffeeListRequestParams,
  OrderCoffeeResponse,
  OrderItem,
  OrderCoffeeRequest,
} from "../types/coffeeTypes";
import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios, { AxiosError, type AxiosResponse } from "axios";

export const BASE_URL = "https://purpleschool.ru/coffee-api/";

type CoffeeState = {
  coffeeList?: CoffeeType[];
  controller?: AbortController;
  cart?: OrderItem[];
  address?: string;
};

type CoffeeActions = {
  getCoffeeList: (params?: GetCoffeeListRequestParams) => Promise<void>;
  addToCart: (item: CoffeeType) => void;
  clearCart: () => void;
  setAddress: (address: string) => void;
  orderCoffee: () => Promise<void>;
};

const coffeeSlice: StateCreator<
  CoffeeState & CoffeeActions,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set, get) => ({
  coffeeList: undefined,
  controller: undefined,
  cart: undefined,
  address: undefined,
  addToCart: (item) => {
    const { cart } = get();
    const { id, name, subTitle } = item;
    const preparedItem: OrderItem = {
      id,
      name: `${name} ${subTitle}`,
      size: "L",
      quantity: 1,
    };
    set({ cart: cart ? [...cart, preparedItem] : [preparedItem] });
  },
  clearCart: () => {
    set({ cart: undefined }); // we can reset address as well
  },
  orderCoffee: async () => {
    const { cart, address, clearCart } = get();
    // if (!address || !cart) {
    //   return;
    // }
    const order: OrderCoffeeRequest = {
      address: address!,
      orderItems: cart!,
    };
    try {
      const { data } = await axios.post<
        OrderCoffeeResponse,
        AxiosResponse<OrderCoffeeResponse>,
        OrderCoffeeRequest
      >(BASE_URL + "order", order);

      if (data.success) {
        alert(data.message);
        clearCart();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  },
  setAddress: (address) => {
    set({ address });
  },
  getCoffeeList: async (params) => {
    const { controller } = get();
    if (controller) {
      controller.abort();
    }
    const newController = new AbortController();
    set({ controller: newController });
    const { signal } = newController;
    try {
      const { data } = await axios.get(BASE_URL, {
        params,
        signal,
      });
      set({ coffeeList: data });
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      console.log(error);
    }
  },
});

export const useCoffeeStore = create<CoffeeState & CoffeeActions>()(
  devtools(
    persist(coffeeSlice, {
      name: "coffeeStore",
      partialize: (state) => ({ cart: state.cart, address: state.address }),
    }),
    { name: "coffeeStore" }
  )
);

export const getCoffeeList = (params?: GetCoffeeListRequestParams) =>
  useCoffeeStore.getState().getCoffeeList(params);
