import {Lucia} from "lucia";
import {BetterSqlite3Adapter} from "@lucia-auth/adapter-sqlite";
import db from "@/lib/db";
import {cookies} from "next/headers";

const adapter = new BetterSqlite3Adapter(db, {
    user: 'users',
    session: 'sessions',
});

const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
    }
}

export async function createAuthSession(userId: string) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
}

export async function verifyAuth() {
    const sessionCookie = cookies().get(lucia.sessionCookieName);
    if (!sessionCookie) {
        return {
            user: null,
            session: null,
        }
    }
    const sessionId = sessionCookie.value;
    if (!sessionId) {
        return {
            user: null,
            session: null,
        }
    }
    const result = await lucia.validateSession(sessionId);
    try {
        if (result.session && result.session.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }
        if(!result.session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
        }
    } catch (e) {
    }

    return result;
}

export async function destroySession() {
    const {session} = await verifyAuth();

    if (!session) {
        return {error: 'Unauthorized'}
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );
}