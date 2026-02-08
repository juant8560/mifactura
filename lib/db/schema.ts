import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  companyName: text("company_name"),
  rtn: text("rtn"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  templateId: text("template_id").notNull(),
  color: text("color").notNull(),
  currency: text("currency").notNull(),
  companyName: text("company_name").notNull(),
  clientInfo: jsonb("client_info").notNull(),
  items: jsonb("items").notNull(),
  totals: jsonb("totals").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
