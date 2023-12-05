import { Lucia, TimeSpan } from 'lucia'
import { sveltekit } from 'lucia/middleware'
import { dev } from '$app/environment'


import client from '$lib/server/prisma';
// import { google } from "@lucia-auth/oauth/providers";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private'
import { Google } from 'arctic'


import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

const adapter = new PrismaAdapter(client.session, client.user);

const urlbase = dev ? 'http://localhost:5173' : 'https://bps-prisma.vercel.app'
const url = `${urlbase}/api/oauth/google/callback`

export const googleAuth = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	url,
	{
		scope: [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile',
			'openid',
		],
	},
)


// const adapter = new PrismaAdapter(client)
export const auth = new Lucia(adapter, {
	middleware: sveltekit(),
	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			name: attributes.name,
			email: attributes.email,
			cpf: attributes.cpf,
		};
	},
	sessionExpiresIn: new TimeSpan(30, "d"), // 30 days
	sessionCookie: {
		name: "session",
		expires: false,
		attributes: {}
	}
})


declare module "lucia" {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: {
			id: string;
			name: string;
			email: string;
			cpf: string;
		};
		DatabaseSessionAttributes: {
		};
	}
}

// export const auth = lucia({
// 	env: dev ? 'DEV' : 'PROD',
// 	middleware: sveltekit(),
// 	adapter: PrismaAdapter(client),
// 	getUserAttributes(databaseUser) {
// 		return {
// 			id: databaseUser.id,
// 			name: databaseUser.name,
// 			email: databaseUser.email,
// 		}
// 	},
// })
// export const googleAuth = google(auth, {
//   clientId: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   redirectUri:
//     "https://bps-prisma-fredguth.vercel.app/api/oauth/google/callback",
//   scope: [
//     "https://www.googleapis.com/auth/userinfo.email",
//     "https://www.googleapis.com/auth/userinfo.profile",
//     "openid",
//   ],
// });
// export type Auth = typeof auth

//  {scope: [
//     "https://www.googleapis.com/auth/userinfo.email",
//     "https://www.googleapis.com/auth/userinfo.profile",
//     "openid",
//   ]}
