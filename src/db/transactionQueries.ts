import { db } from "./index";
import { transactions, accounts } from "./schema";
import { eq, sql } from "drizzle-orm";

export async function createTransaction(data: any) {
  await db.insert(transactions).values(data);
}

export async function getTransactions() {
  return await db.select().from(transactions);
}

export async function updateAccountBalance(
  accountId: string,
  amount: number,
  type: "income" | "expense"
) {
  const sign = type === "income" ? "+" : "-";

  await db.run(sql.raw(`
    UPDATE accounts
    SET balance = balance ${sign} ${amount}
    WHERE id = '${accountId}'
  `));
}