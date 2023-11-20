import { PrismaClient } from "@prisma/client";
import { dev } from "$app/environment";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from "$env/static/private";

// Create a new instance of the libSQL database client
// const libsql = createClient({
//   // @ts-ignore
//   url: TURSO_DATABASE_URL?.trim(),
//   authToken: TURSO_AUTH_TOKEN?.trim(),
// });

// // Create a Prisma "adapter" for libSQL
// const adapter = new PrismaLibSQL(libsql);
// // Pass the adapter option to the Prisma Client instance
// const prisma = new PrismaClient({ adapter });

// if (dev) {
//   // @ts-ignore
//   global.__prisma = prisma;
// }

// export default prisma;

const prisma = global.__prisma || new PrismaClient();

if (dev) {
  // @ts-ignore
  global.__prisma = prisma;
}

export default prisma;
