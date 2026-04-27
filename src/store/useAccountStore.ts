import { create } from "zustand";

type Account = {
  id: string;
  name: string;
  balance: number;
};

type State = {
  accounts: Account[];
  setAccounts: (data: Account[]) => void;
};

export const useAccountStore = create<State>((set) => ({
  accounts: [],
  setAccounts: (data) => set({ accounts: data }),
}));