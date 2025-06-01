import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle("http://localhost:5432/fhl_dev");
