import "dotenv/config";
import { PrismaClient } from "@prisma/client/extension";
import { PrismaPg } from "@prisma/adapter-pg";
import PG from "pg";

const connectionString = process.env.POSTGRE_URL;

const pool = new PG.Pool ({ connectionString});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient ({adapter});

export default prisma;