// import { auth } from '$lib/server/lucia'
// import type { Handle } from '@sveltejs/kit'
// import { redirect, fail } from '@sveltejs/kit'
// export const handle: Handle = async ({ event, resolve }) => {
// 	const { request } = event
// 	const url = new URL(request.url)
// 	if (
// 		url.pathname === '/login' ||
// 		url.pathname === '/logout' ||
// 		url.pathname.includes('oauth')
// 	)
// 		return await resolve(event)

// 	event.locals.auth = auth.handleRequest(event)
// 	const { user, session } = await event.locals.auth.validate()
// 	if (!session) throw redirect(303, '/login')
// 	if (user) event.locals.user = user
// 	return await resolve(event)
// }
