import {
  sqliteTable,
  text,
  integer,
  real,
} from "drizzle-orm/sqlite-core";

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  balance: real("balance").default(0),
  currencyCode: text("currency_code").default("BDT"),
  icon: text("icon"),
  color: text("color"),
  isDefault: integer("is_default").default(0),
  createdAt: text("created_at"),
});

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  icon: text("icon"),
  color: text("color"),
  parentId: text("parent_id"),
});

export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey(),
  amount: real("amount").notNull(),
  type: text("type").notNull(),
  note: text("note"),
  date: text("date").notNull(),

  accountId: text("account_id").notNull(),
  categoryId: text("category_id").notNull(),

  createdAt: text("created_at"),
});