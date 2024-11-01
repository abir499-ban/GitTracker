import { verify } from "crypto";
import {serial,integer, boolean,pgTable, varchar,date } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id : serial('id').primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password : varchar().notNull(),
  isVerified : boolean().default(false),
  isAdmin : boolean().default(false),
  verifyPasswordToken : varchar(),
  verfiyPasswordTokenExpiry : date(),
  verifyToken : varchar(),
  verifyTokenExpiry : date()
});

