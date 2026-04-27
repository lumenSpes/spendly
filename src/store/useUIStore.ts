import { create } from "zustand";

type UIState = {
  currency: string;
  theme: "dark";
};

export const useUIStore = create<UIState>(() => ({
  currency: "BDT",
  theme: "dark",
}));