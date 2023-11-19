import { PrismaClient } from "@prisma/client";
const prisma = global.__prisma || new PrismaClient();

if (process.env.NODE_ENV == "development") global.__prisma = prisma;

export default prisma;

// import { PrismaLibSQL } from "@prisma/adapter-libsql";
// import { createClient } from "@libsql/client";
// import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from "$env/static/private";

// const libsql = createClient({
//   url: process.env.TURSO_DATABASE_URL,
//   authToken: process.env.TURSO_AUTH_TOKEN,
// });