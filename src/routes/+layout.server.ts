import type { LayoutServerLoad } from './$types'
// import { redirect } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.auth) {
		const { user, session } = await locals.auth.validate()
	return { user }
	}

}
