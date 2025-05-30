import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type CounterState = {
  counter: number;
  persistedCounter: number;
};

type CounterActions = {
  increment: () => void;
  decrement: () => void;
  changeByAmount: (value: number) => void;
};

const counterSlice: StateCreator<
  CounterState & CounterActions,
  [["zustand/persist", unknown]]
> = (set, get) => ({
  counter: 0,
  persistedCounter: 0,
  decrement: () => {
    const { counter, persistedCounter } = get();
    // set((state) => ({ ...state, counter: counter - 1 }));
    set({ counter: counter - 1, persistedCounter: persistedCounter - 1 });
  },
  increment: () => {
    const { counter, persistedCounter } = get();
    set({ counter: counter + 1, persistedCounter: persistedCounter + 1 });
  },
  changeByAmount: (value: number) => {
    const { counter } = get();
    set({ counter: counter + value });
  },
});

export const useCounterStore = create<CounterState & CounterActions>()(
  persist(counterSlice, {
    name: "counterStore",
    partialize: (state) => ({ persistedCounter: state.persistedCounter }),
  })
);

export const changeByAmount = (value: number) =>
  useCounterStore.getState().changeByAmount(value);
export const getCounter = () => useCounterStore.getState().counter;
