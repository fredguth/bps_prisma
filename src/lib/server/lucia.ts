import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma } from "@lucia-auth/adapter-prisma";
import client from "$lib/server/prisma";
import { google } from "@lucia-auth/oauth/providers";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

export const auth = lucia({
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
  adapter: prisma(client, {
    user: "user", // model User {}
    key: "key", // model Key {}
    session: "session", // model Session {}
  }),
  getUserAttributes(databaseUser) {
    return {
      id: databaseUser.id,
      name: databaseUser.name,
      email: databaseUser.email,
    };
  },
});
export const googleAuth = google(auth, {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri:
    "https://bps-prisma-fredguth.vercel.app/api/oauth/google/callback",
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
  ],
});
export type Auth = typeof auth;
