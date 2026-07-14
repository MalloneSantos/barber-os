import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { demoAccounts } from "@/data/demo";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;

  return (
    <Card className="panel-glow w-full max-w-md border-white/10 bg-card/85 backdrop-blur-xl">
      <CardHeader>
        <div className="mb-3 grid size-11 place-items-center rounded-2xl bg-primary/15 text-primary"><LockKeyhole /></div>
        <CardTitle className="font-heading text-2xl">Bem-vindo de volta</CardTitle>
        <CardDescription>Entre no ambiente demonstrativo da AS Barber Club.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {erro ? (
          <Alert variant="destructive">
            <AlertTitle>Não foi possível entrar</AlertTitle>
            <AlertDescription>Use uma conta da demonstração e a senha demo123.</AlertDescription>
          </Alert>
        ) : null}
        <form action="/api/demo-login" method="post">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Input id="email" name="email" type="email" defaultValue="owner@asbarber.be" autoComplete="email" required />
            </Field>
            <Field>
              <div className="flex items-center justify-between"><FieldLabel htmlFor="password">Senha</FieldLabel><Link href="/recuperar-senha" className="text-xs text-primary hover:underline">Esqueci a senha</Link></div>
              <Input id="password" name="password" type="password" defaultValue="demo123" autoComplete="current-password" required />
              <FieldDescription>Senha de demonstração: demo123</FieldDescription>
            </Field>
            <Button type="submit" className="w-full">Entrar no painel <ArrowRight data-icon="inline-end" /></Button>
          </FieldGroup>
        </form>
        <div className="flex items-center gap-3"><Separator className="flex-1" /><span className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">Perfis rápidos</span><Separator className="flex-1" /></div>
        <div className="grid grid-cols-2 gap-2">
          {demoAccounts.map((account) => (
            <form action="/api/demo-login" method="post" key={account.email}>
              <input type="hidden" name="email" value={account.email} />
              <input type="hidden" name="password" value="demo123" />
              <Button type="submit" variant="outline" size="sm" className="w-full justify-start">{account.label}</Button>
            </form>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground">Ainda não tem conta? <Link href="/cadastro" className="text-foreground hover:underline">Criar ambiente</Link></p>
      </CardContent>
    </Card>
  );
}

