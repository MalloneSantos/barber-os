import { NextResponse } from "next/server";

import { deleteSession, getSessionToken, sessionCookie } from "@/server/auth/session";

export async function POST(request: Request) {
  await deleteSession(await getSessionToken());
  const response = NextResponse.redirect(new URL("/login", request.url), 303);
  response.cookies.set(sessionCookie.name, "", { ...sessionCookie.options, maxAge: 0 });
  return response;
}
