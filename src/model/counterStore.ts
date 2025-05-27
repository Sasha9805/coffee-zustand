import { create, type StateCreator } from "zustand";

type CounterState = {
  counter: number;
};

const counterSlice: StateCreator<CounterState> = () => ({
  counter: 0,
});

export const useCounterStore = create<CounterState>(counterSlice);
