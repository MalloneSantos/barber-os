import { notFound } from "next/navigation";

import { ModuleAction } from "@/components/dashboard/module-action";
import { ModuleTable } from "@/components/dashboard/module-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { authorize, type Permission } from "@/domain/auth/permissions";
import { requirePermission } from "@/server/auth/authorization";
import { db } from "@/server/db";
import { getModuleData, moduleMeta, type ModuleSlug } from "@/server/data/module-data";

const mutatePermissions: Record<ModuleSlug, Permission> = {
  agendamentos: "appointments:edit",
  clientes: "customers:edit",
  equipe: "team:edit",
  servicos: "services:edit",
  produtos: "products:edit",
  campanhas: "campaigns:create",
  fidelidade: "loyalty:edit",
  financeiro: "finance:edit",
  relatorios: "finance:view",
};

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  if (!(module in moduleMeta)) notFound();
  const slug = module as ModuleSlug;
  const session = await requirePermission(moduleMeta[slug].permission);
  const professionalStaff = session.role === "PROFESSIONAL" ? await db.staff.findFirst({ where: { tenantId: session.tenantId, userId: session.userId, deletedAt: null }, select: { id: true } }) : undefined;
  const definition = await getModuleData(slug, session.tenantId, professionalStaff?.id ?? (session.role === "PROFESSIONAL" ? null : undefined));
  const canMutate = authorize(session.role, mutatePermissions[slug]);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-medium uppercase tracking-[.18em] text-primary">{session.tenantName}</p><h1 className="font-heading text-3xl font-semibold tracking-[-.035em]">{definition.title}</h1><p className="mt-2 text-sm text-muted-foreground">{definition.description}</p></div><ModuleAction module={slug} label={definition.action} canMutate={canMutate} /></section>
      <div className="grid gap-3 sm:grid-cols-3">{definition.stats.map((stat, index) => <Card key={stat.label} className={index === 2 ? "border-primary/20 bg-primary/5" : "border-white/8"}><CardHeader className="pb-1"><CardDescription>{stat.label}</CardDescription></CardHeader><CardContent className="flex items-center justify-between"><p className="font-heading text-2xl font-semibold">{stat.value}</p>{index === 2 ? <Badge>Dados reais</Badge> : null}</CardContent></Card>)}</div>
      <ModuleTable module={slug} columns={definition.columns} rows={definition.rows} canMutate={canMutate} />
    </div>
  );
}
