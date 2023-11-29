// routes/login/google/+server.ts

import { dev } from "$app/environment";
import { googleAuth } from "$lib/server/lucia.js";
import type { RequestHandler } from "./$types.js";

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
	const [url, state] = await googleAuth.getAuthorizationUrl()
	// console.log("cookie setting:", url, state);
	cookies.set('google_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60,
	})
	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString(),
		},
	})
}
