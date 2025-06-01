import type {
  CoffeeType,
  OrderItem,
  GetCoffeeListRequestParams,
} from "../types/coffeeTypes";

export type ListState = {
  coffeeList?: CoffeeType[];
  controller?: AbortController;
  params: GetCoffeeListRequestParams;
};

export type ListActions = {
  getCoffeeList: (params?: GetCoffeeListRequestParams) => Promise<CoffeeType[]>;
  setParams: (params?: GetCoffeeListRequestParams) => void;
};

export type CartState = {
  cart?: OrderItem[];
  address?: string;
};

export type CartActions = {
  addToCart: (item: CoffeeType) => void;
  clearCart: () => void;
  setAddress: (address: string) => void;
  orderCoffee: () => Promise<void>;
};
