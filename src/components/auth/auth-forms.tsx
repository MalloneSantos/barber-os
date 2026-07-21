"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  loginAction,
  recoverAction,
  signupAction,
  type AuthActionState,
} from "@/app/(auth)/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialAuthState: AuthActionState = { status: "idle" };

function ErrorText({ messages }: { messages?: string[] }) {
  return messages?.[0] ? <p className="text-xs text-destructive">{messages[0]}</p> : null;
}

export function LoginForm({ email = "owner@asbarber.be", compact = false, label }: { email?: string; compact?: boolean; label?: string }) {
  const [state, action, pending] = useActionState(loginAction, initialAuthState);

  if (compact) {
    return (
      <form action={action}>
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="password" value="demo123" />
        <Button type="submit" variant="outline" size="sm" className="w-full justify-start" disabled={pending}>
          {label ?? email.split("@")[0]}
        </Button>
      </form>
    );
  }

  return (
    <form action={action}>
      <FieldGroup>
        {state.message ? <Alert variant="destructive"><AlertDescription>{state.message}</AlertDescription></Alert> : null}
        <Field>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input id="email" name="email" type="email" defaultValue={email} autoComplete="email" required />
          <ErrorText messages={state.errors?.email} />
        </Field>
        <Field>
          <div className="flex items-center justify-between"><FieldLabel htmlFor="password">Senha</FieldLabel><Link href="/recuperar-senha" className="text-xs text-primary hover:underline">Esqueci a senha</Link></div>
          <Input id="password" name="password" type="password" defaultValue="demo123" autoComplete="current-password" required />
          <FieldDescription>Senha das contas seedadas: demo123</FieldDescription>
          <ErrorText messages={state.errors?.password} />
        </Field>
        <Button type="submit" className="w-full" disabled={pending}>{pending ? "Entrando..." : "Entrar no painel"}<ArrowRight data-icon="inline-end" /></Button>
      </FieldGroup>
    </form>
  );
}

export function SignupForm() {
  const [state, action, pending] = useActionState(signupAction, initialAuthState);
  return (
    <form action={action}>
      <FieldGroup>
        {state.message ? <Alert variant="destructive"><AlertDescription>{state.message}</AlertDescription></Alert> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field><FieldLabel htmlFor="firstName">Nome</FieldLabel><Input id="firstName" name="firstName" required /><ErrorText messages={state.errors?.firstName} /></Field>
          <Field><FieldLabel htmlFor="lastName">Sobrenome</FieldLabel><Input id="lastName" name="lastName" required /><ErrorText messages={state.errors?.lastName} /></Field>
        </div>
        <Field><FieldLabel htmlFor="businessName">Nome da barbearia</FieldLabel><Input id="businessName" name="businessName" required /><ErrorText messages={state.errors?.businessName} /></Field>
        <Field><FieldLabel htmlFor="signupEmail">E-mail</FieldLabel><Input id="signupEmail" name="email" type="email" required /><ErrorText messages={state.errors?.email} /></Field>
        <Field><FieldLabel htmlFor="signupPassword">Senha</FieldLabel><Input id="signupPassword" name="password" type="password" autoComplete="new-password" required /><FieldDescription>Mínimo de 8 caracteres, com letra e número.</FieldDescription><ErrorText messages={state.errors?.password} /></Field>
        <Field orientation="horizontal"><Checkbox id="terms" name="terms" required /><div><FieldLabel htmlFor="terms" className="font-normal">Aceito os termos e a política de privacidade.</FieldLabel><ErrorText messages={state.errors?.terms} /></div></Field>
        <Button type="submit" disabled={pending}>{pending ? "Criando..." : "Criar ambiente"}</Button>
      </FieldGroup>
    </form>
  );
}

export function RecoverForm() {
  const [state, action, pending] = useActionState(recoverAction, initialAuthState);
  return (
    <form action={action}>
      <FieldGroup>
        {state.message ? <Alert><AlertDescription>{state.message}</AlertDescription></Alert> : null}
        <Field><FieldLabel htmlFor="recoverEmail">E-mail</FieldLabel><Input id="recoverEmail" name="email" type="email" placeholder="voce@barbearia.com" required /><ErrorText messages={state.errors?.email} /></Field>
        <Button type="submit" disabled={pending}>{pending ? "Enviando..." : "Enviar link simulado"}</Button>
      </FieldGroup>
    </form>
  );
}
