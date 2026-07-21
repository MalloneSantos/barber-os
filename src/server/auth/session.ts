import { randomBytes } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";

import { db } from "@/server/db";
import {
  sessionFromRecord,
  type AuthenticatedIdentity,
} from "@/server/auth/service";

const COOKIE_NAME = "barber_session";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

export type AppSession = AuthenticatedIdentity;
export type DemoSession = AppSession;

export const sessionCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  },
};

export async function createDatabaseSession(identity: Pick<AppSession, "userId" | "tenantId">) {
  const sessionToken = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + SESSION_DURATION_MS);

  await db.session.create({
    data: {
      sessionToken,
      userId: identity.userId,
      tenantId: identity.tenantId,
      expires,
    },
  });

  return { sessionToken, expires };
}

export const getSession = cache(async (): Promise<AppSession | null> => {
  const sessionToken = (await cookies()).get(COOKIE_NAME)?.value;
  if (!sessionToken) return null;

  const record = await db.session.findUnique({
    where: { sessionToken },
    select: {
      id: true,
      sessionToken: true,
      tenantId: true,
      expires: true,
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          memberships: {
            select: {
              tenantId: true,
              role: true,
              isActive: true,
              tenant: { select: { name: true, slug: true, deletedAt: true } },
            },
          },
        },
      },
    },
  });

  const session = sessionFromRecord(record);
  if (!session && record) {
    await db.session.delete({ where: { id: record.id } }).catch(() => undefined);
  }
  return session;
});

export async function deleteSession(sessionToken: string | undefined) {
  if (!sessionToken) return;
  await db.session.deleteMany({ where: { sessionToken } });
}

export async function getSessionToken() {
  return (await cookies()).get(COOKIE_NAME)?.value;
}
