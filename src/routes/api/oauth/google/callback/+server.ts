// routes/login/google/callback/+server.ts
import { auth, googleAuth } from '$lib/server/lucia.js'
import { OAuthRequestError } from '@lucia-auth/oauth'
import type { RequestHandler } from './$types.js'

export const GET: RequestHandler = async ({ url, cookies, locals }) => {
	const session = await locals.auth.validate()
	if (session) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
			},
		})
	}
	const storedState = cookies.get('google_oauth_state')
	const state = url.searchParams.get('state')
	const code = url.searchParams.get('code')

	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		console.log('RESPONDING 400 :::')
		console.log('STORED STATE:', storedState)
		console.log('STATE:', state)
		console.log('CODE:', code)
		return new Response(null, {
			status: 400,
		})
	}
	try {
		const { getExistingUser, googleUser, createUser } =
			await googleAuth.validateCallback(code)
		const getUser = async () => {
			const existingUser = await getExistingUser()
			if (existingUser) return existingUser
			console.log('callback:', { existingUser })

			const user = await createUser({
				attributes: {
					id: String(googleUser.sub),
					name: googleUser.name,
					email: googleUser.email || '',
					cpf: String(googleUser.sub),
				},
			})
			return user
		}

		const user = await getUser()
		console.log('callback:', { user })
		if (user == null) {
			return new Response(null, {
				status: 401,
			})
		}
		const session = await auth.createSession({
			userId: user.id,
			attributes: {},
		})
		console.log('callback:', { session })

		locals.auth.setSession(session)

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
			},
		})
	} catch (e) {
		console.error(e)
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
			})
		}
		return new Response(null, {
			status: 500,
		})
	}
}
