import type { PageServerLoad, Actions } from './$types'
import { auth } from '$lib/server/lucia'
import { redirect, fail } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ locals }) => {
	const { user, session } = await locals.auth.validate()
	console.log('page session:', session)
	if (!session) throw redirect(302, '/login')
	return { user }
}
export const actions: Actions = {
	logout: async ({ locals }) => {
		const { session } = await locals.auth.validate()
		// console.log('loging out', session)
		if (!session) return fail(401)
		await auth.invalidateSession(session.id) // invalidate session
		locals.auth.deleteSessionCookie() // remove session cookie

		redirect(302, '/login') // redirect to login page
	},
}
