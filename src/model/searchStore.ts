import { type StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { getCoffeeList } from "./coffeeStore";
import { hashStorage } from "../helpers/hashStorage";

type SearchState = {
  text?: string;
};

type SearchActions = {
  setText: (text: string) => void;
};

const searchSlice: StateCreator<
  SearchState & SearchActions,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set) => ({
  text: undefined,
  setText: (text) => {
    set({ text }, false, "setText");
  },
});

export const useSearchStore = create<SearchState & SearchActions>()(
  devtools(
    persist(searchSlice, {
      name: "searchStore",
      storage: createJSONStorage(() => hashStorage),
    }),
    {
      name: "searchStore",
    }
  )
);

useSearchStore.subscribe((state, prevState) => {
  if (state.text !== prevState.text) {
    getCoffeeList({ text: state.text });
  }
});
