import Link from "next/link";
import { ShieldX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AccessDeniedPage() {
  return (
    <Card className="mx-auto max-w-xl border-white/10">
      <CardContent className="flex flex-col items-center p-10 text-center">
        <div className="grid size-14 place-items-center rounded-full bg-destructive/10 text-destructive"><ShieldX /></div>
        <h1 className="font-heading mt-5 text-2xl font-semibold">Acesso não autorizado</h1>
        <p className="mt-2 text-sm text-muted-foreground">Seu perfil não possui permissão para consultar ou alterar este módulo.</p>
        <Button asChild className="mt-6"><Link href="/painel">Voltar ao painel</Link></Button>
      </CardContent>
    </Card>
  );
}
