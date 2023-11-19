// routes/login/google/callback/+server.ts
import { auth, googleAuth } from "$lib/server/lucia.js";
import { OAuthRequestError } from "@lucia-auth/oauth";
import type { RequestHandler } from "./$types.js";

export const GET: RequestHandler = async ({ url, cookies, locals }) => {
  const storedState = cookies.get("gootle_oauth_state");
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const { getExistingUser, googleUser, createUser } =
      await googleAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;

      if (!googleUser.email || !googleUser.name) return null;

      //return user
      return await createUser({
        attributes: { email: googleUser.email, name: googleUser.name },
      });
    };

    const user = await getUser();
    if (user == null) {
      return new Response(null, {
        status: 401,
      });
    }
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    locals.auth.setSession(session);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
