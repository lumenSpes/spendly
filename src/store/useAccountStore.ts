import { create } from "zustand";

export type AccountType =
  | "cash"
  | "bank"
  | "mobile"
  | "credit"
  | "savings";

export type Account = {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  color?: string;
  icon?: string;
  isDefault?: number;
};

type State = {
  accounts: Account[];
  setAccounts: (data: Account[]) => void;
  addAccount: (account: Account) => void;
};

export const useAccountStore = create<State>((set) => ({
  accounts: [],

  setAccounts: (data) => set({ accounts: data }),

  addAccount: (account) =>
    set((state) => ({
      accounts: [account, ...state.accounts],
    })),
}));