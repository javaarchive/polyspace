export const discordLoginEnabled = import.meta.env.DISCORD_CLIENT_ID && import.meta.env.DISCORD_CLIENT_SECRET && true;
export const githubLoginEnabled = import.meta.env.GITHUB_CLIENT_ID && import.meta.env.GITHUB_CLIENT_SECRET && true;

import { AstroAuth, getSession } from 'auth-astro/server';
export async function getIsLoggedIn(req) {
    return !!(await getSession(req));
}