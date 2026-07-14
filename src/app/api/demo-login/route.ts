import { NextResponse } from "next/server";
import { z } from "zod";

import { authenticateDemoAccount } from "@/server/auth/demo";
import { createSessionToken, sessionCookie } from "@/server/auth/session";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  const form = await request.formData();
  const parsed = loginSchema.safeParse(Object.fromEntries(form));

  if (!parsed.success) {
    return NextResponse.redirect(new URL("/login?erro=credenciais", request.url), 303);
  }

  const account = authenticateDemoAccount(parsed.data.email, parsed.data.password);
  if (!account) {
    return NextResponse.redirect(new URL("/login?erro=credenciais", request.url), 303);
  }

  const token = await createSessionToken({
    email: account.email,
    name: account.name,
    role: account.role,
    tenantId: "tenant_as_barber",
  });
  const response = NextResponse.redirect(new URL("/painel", request.url), 303);
  response.cookies.set(sessionCookie.name, token, sessionCookie.options);
  return response;
}

