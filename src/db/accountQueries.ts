import { db } from "./index";
import { accounts } from "./schema";
import { eq } from "drizzle-orm";

export async function getAccounts() {
  return await db.select().from(accounts);
}

export async function createAccount(data: any) {
  await db.insert(accounts).values(data);
}

export async function deleteAccount(id: string) {
  await db.delete(accounts).where(eq(accounts.id, id));
}

export async function updateBalance(
  id: string,
  balance: number
) {
  await db
    .update(accounts)
    .set({ balance })
    .where(eq(accounts.id, id));
}