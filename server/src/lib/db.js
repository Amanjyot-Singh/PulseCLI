import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// Parse connection string manually
const connString = process.env.DATABASE_URL;
const url = new URL(connString);

const pool = new pg.Pool({
  user: url.username,
  password: url.password,
  host: url.hostname,
  port: parseInt(url.port || "5432"),
  database: url.pathname.slice(1),
  ssl: url.searchParams.has("sslmode"),
});

const adapter = new PrismaPg(pool);

export const db = new PrismaClient({
  adapter,
});
