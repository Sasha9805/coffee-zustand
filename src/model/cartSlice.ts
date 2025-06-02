import type { StateCreator } from "zustand";
import type {
  CartActions,
  CartState,
  ListActions,
  ListState,
} from "./storeTypes";
import axios, { type AxiosResponse, AxiosError } from "axios";
import type {
  OrderItem,
  OrderCoffeeRequest,
  OrderCoffeeResponse,
} from "../types/coffeeTypes";
import { BASE_URL } from "../api/CoreApi";
import { produce } from "immer";

export const cartSlice: StateCreator<
  CartState & CartActions & ListState & ListActions,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  CartActions & CartState
> = (set, get) => ({
  cart: undefined,
  address: undefined,
  addToCart: (item) => {
    const { id, name, subTitle } = item;
    const preparedItem: OrderItem = {
      id,
      name: `${name} ${subTitle}`,
      size: "L",
      quantity: 1,
    };
    set(
      produce<CartState>((draft, state) => {
        console.log(state);
        if (!draft.cart) {
          draft.cart = [];
        }
        const itemIndex = draft.cart.findIndex(
          (item) => item.id === preparedItem.id
        );
        if (itemIndex !== -1) {
          draft.cart[itemIndex].quantity += 1;
          return;
        }
        draft.cart.push(preparedItem);
      })
    );
  },
  clearCart: () => {
    set({ cart: undefined });
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
});
