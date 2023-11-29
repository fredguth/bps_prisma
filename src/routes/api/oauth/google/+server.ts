// routes/login/google/+server.ts

import { dev } from "$app/environment";
import { googleAuth } from "$lib/server/lucia.js";
import type { RequestHandler } from "./$types.js";
import { generateState, generateCodeVerifier } from 'arctic'

export const GET: RequestHandler = async ({ cookies, locals }) => {
	// const session = await locals.auth.validate()
	// if (session) {
	// 	return new Response(null, {
	// 		status: 302,
	// 		headers: {
	// 			Location: '/',
	// 		},
	// 	})
	// }
	const state = generateState()
	//   const code = generateCodeVerifier()
	const authorizationUrl = await googleAuth.createAuthorizationURL(state)

	console.log('api/oauth/google', { state, authorizationUrl })
	cookies.set('google_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60,
	})
	return new Response(null, {
		status: 302,
		headers: {
			Location: authorizationUrl.toString(),
		},
	})
}
