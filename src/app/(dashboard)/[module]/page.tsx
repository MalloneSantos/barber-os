import { notFound } from "next/navigation";

import { ModuleAction } from "@/components/dashboard/module-action";
import { ModuleTable } from "@/components/dashboard/module-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { moduleDefinitions, type ModuleSlug } from "@/data/demo";

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const definition = moduleDefinitions[module as ModuleSlug];
  if (!definition) notFound();

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-medium uppercase tracking-[.18em] text-primary">AS Barber Club</p><h1 className="font-heading text-3xl font-semibold tracking-[-.035em]">{definition.title}</h1><p className="mt-2 text-sm text-muted-foreground">{definition.description}</p></div><ModuleAction label={definition.action} /></section>
      <div className="grid gap-3 sm:grid-cols-3"><Card className="border-white/8"><CardHeader className="pb-1"><CardDescription>Total no período</CardDescription></CardHeader><CardContent><p className="font-heading text-2xl font-semibold">{definition.rows.length * 18}</p></CardContent></Card><Card className="border-white/8"><CardHeader className="pb-1"><CardDescription>Ativos agora</CardDescription></CardHeader><CardContent><p className="font-heading text-2xl font-semibold">{definition.rows.length}</p></CardContent></Card><Card className="border-primary/20 bg-primary/5"><CardHeader className="pb-1"><CardDescription>Variação mensal</CardDescription></CardHeader><CardContent className="flex items-center justify-between"><p className="font-heading text-2xl font-semibold">+14%</p><Badge>Em alta</Badge></CardContent></Card></div>
      <ModuleTable columns={definition.columns} rows={definition.rows} />
    </div>
  );
}
