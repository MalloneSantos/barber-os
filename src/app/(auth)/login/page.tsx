import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import { LoginForm } from "@/components/auth/auth-forms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
const seededAccounts = [
  { email: "owner@asbarber.be", label: "Proprietário" },
  { email: "gerente@asbarber.be", label: "Gerente" },
  { email: "recepcao@asbarber.be", label: "Recepção" },
  { email: "lucas@asbarber.be", label: "Profissional" },
] as const;

export default function LoginPage() {
  return (
    <Card className="panel-glow w-full max-w-md border-white/10 bg-card/85 backdrop-blur-xl">
      <CardHeader>
        <div className="mb-3 grid size-11 place-items-center rounded-2xl bg-primary/15 text-primary"><LockKeyhole /></div>
        <CardTitle className="font-heading text-2xl">Bem-vindo de volta</CardTitle>
        <CardDescription>ntre no ambiente demonstrativo da AS Barber Club.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <LoginForm />
        <div className="flex items-center gap-3"><Separator className="flex-1" /><span className="text-[11px] uppercase tracking-[.18em] text-muted-foreground">Perfis rápidos</span><Separator className="flex-1" /></div>
        <div className="grid grid-cols-2 gap-2">
          {seededAccounts.map((account) => (
            <LoginForm email={account.email} label={account.label} compact key={account.email} />
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground">Ainda não tem conta? <Link href="/cadastro" className="text-foreground hover:underline">Criar ambiente</Link></p>
      </CardContent>
    </Card>
  );
}
