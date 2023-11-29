// routes/login/google/callback/+server.ts
import { auth, googleAuth } from '$lib/server/lucia.ts'
import db from '$lib/server/prisma'
import { OAuth2RequestError } from 'arctic'

import type { RequestHandler } from './$types.js'
export const GET: RequestHandler = async ({ url, cookies, locals }) => {
	const storedState = cookies.get('google_oauth_state')
	const state = url.searchParams.get('state')
	const code = url.searchParams.get('code')

	console.log('api/oauth/google/callback', { storedState, state, code })
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
		console.log('1')
		const tokens = await googleAuth.validateAuthorizationCode(code)
		console.log('api/oauth/google/callback', { tokens })
		const googleUser = await googleAuth.getUser(tokens.accessToken)
		console.log('api/oauth/google/callback', { tokens, googleUser })
		const existingUser = await db.user.findUnique({
			where: {
				id: googleUser.sub, // using Google sub as id
			},
		})
		console.log('api/oauth/google/callback', { existingUser })
		if (existingUser) {
			const session = await auth.createSession(existingUser.id, {})
			const sessionCookie = auth.createSessionCookie(session.id)
			console.log('api/oauth/google/callback', { session, sessionCookie })
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/',
					'Set-Cookie': sessionCookie.serialize(),
				},
			})
		}

		const { sub, name, email } = googleUser
		const user = await db.user.create({
			data: {
				id: sub,
				name,
				email,
				cpf: sub,
			},
		})

		const oauthAccount = await db.oauthAccount.create({
			data: {
				providerId: 'google',
				providerUserId: sub,
				userId: sub,
			},
		})
		console.log('api/oauth/google/callback', { user, oauthAccount })
		const session = await auth.createSession(sub, {})
		const sessionCookie = auth.createSessionCookie(session.id)
		console.log('api/oauth/google/callback', { session, sessionCookie })
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
				'Set-Cookie': sessionCookie.serialize(),
			},
		})
	} catch (e) {
		console.error(e)
		if (e instanceof OAuth2RequestError) {
			// bad verification code, invalid credentials, etc
			return new Response(null, {
				status: 400,
			})
		}
		return new Response(null, {
			status: 500,
		})
	}
}
