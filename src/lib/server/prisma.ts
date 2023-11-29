import { PrismaClient } from '@prisma/client'
import { dev } from '$app/environment'

import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } from '$env/static/private'
// Create a new instance of the libSQL database client
let clientConfig

clientConfig = {
	url: TURSO_DATABASE_URL?.trim(),
	authToken: TURSO_AUTH_TOKEN?.trim(),
}

const libsql = createClient(clientConfig)

// Create a Prisma "adapter" for libSQL
const adapter = new PrismaLibSQL(libsql)
// Pass the adapter option to the Prisma Client instance

const prisma = new PrismaClient({ adapter })

if (dev) {
	// Handle global prisma instance for development
	// It's better to handle the types properly instead of using @ts-ignore
	global.__prisma = global.__prisma || prisma
}

export default prisma
