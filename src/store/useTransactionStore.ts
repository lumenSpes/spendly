import { create } from "zustand";

export type TransactionItem = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  note?: string;
  accountId: string;
  date: string;
};

type State = {
  transactions: TransactionItem[];
  setTransactions: (data: TransactionItem[]) => void;
  addTransaction: (item: TransactionItem) => void;
};

export const useTransactionStore = create<State>((set) => ({
  transactions: [],
  setTransactions: (data) => set({ transactions: data }),
  addTransaction: (item) =>
    set((state) => ({
      transactions: [item, ...state.transactions],
    })),
}));