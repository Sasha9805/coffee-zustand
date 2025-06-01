import type { StateCreator } from "zustand";
import type {
  CartActions,
  CartState,
  ListActions,
  ListState,
} from "./storeTypes";
import axios from "axios";
import { BASE_URL } from "../api/CoreApi";

export const listSlice: StateCreator<
  CartState & CartActions & ListState & ListActions,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  ListState & ListActions
> = (set, get) => ({
  coffeeList: undefined,
  controller: undefined,
  params: {
    text: undefined,
  },
  setParams: (newParams) => {
    const { getCoffeeList, params } = get();
    set({ params: { ...params, ...newParams } }, false, "setParams");
    getCoffeeList(params);
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
