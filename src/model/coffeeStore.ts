import type { CoffeeType } from "../types/coffeeTypes";
import { type StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const BASE_URL = "https://purpleschool.ru/coffee-api";

type CoffeeState = {
  coffeeList?: CoffeeType[];
};

type CoffeeActions = {
  getCoffeeList: () => Promise<void>;
};

const coffeeSlice: StateCreator<
  CoffeeState & CoffeeActions,
  [["zustand/devtools", never]]
> = (set) => ({
  coffeeList: undefined,
  getCoffeeList: async () => {
    try {
      const { data } = await axios.get(BASE_URL);
      set({ coffeeList: data });
    } catch (error) {
      console.log(error);
    }
  },
});

export const useCoffeeStore = create<CoffeeState & CoffeeActions>()(
  devtools(coffeeSlice)
);
