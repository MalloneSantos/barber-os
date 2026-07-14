import Link from "next/link";
import { ArrowRight, CalendarClock, CircleAlert, Sparkles, TrendingUp, Users } from "lucide-react";

import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { QuickAppointment } from "@/components/dashboard/quick-action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { appointments, dashboardMetrics, freeSlots, impactMetrics, insights, staff, weeklyOccupancy } from "@/data/demo";
import { getSession } from "@/server/auth/session";

function statusVariant(status: string) {
  if (status === "Em atendimento") return "default" as const;
  if (status === "Sinal pendente") return "destructive" as const;
  return "secondary" as const;
}

export default async function DashboardPage() {
  const session = await getSession();
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-white" /> Operação em tempo real</div>
          <h1 className="font-heading text-3xl font-semibold tracking-[-.035em] sm:text-4xl">Bom dia, {session?.name.split(" ")[0]}.</h1>
          <p className="mt-2 text-sm text-muted-foreground">Terça começou forte: 87% das cadeiras já estão ocupadas.</p>
        </div>
        <div className="flex gap-2"><Button asChild variant="outline"><Link href="/agenda"><CalendarClock data-icon="inline-start" /> Ver agenda</Link></Button><QuickAppointment /></div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric, index) => (
          <Card key={metric.label} className={index === 0 ? "border-primary/25 bg-gradient-to-br from-primary/12 to-card" : "border-white/8"}>
            <CardHeader className="pb-1"><CardDescription>{metric.label}</CardDescription></CardHeader>
            <CardContent className="flex items-end justify-between"><p className="font-heading text-3xl font-semibold tracking-[-.04em]">{metric.value}</p><Badge variant={metric.tone === "positive" ? "default" : "secondary"}>{metric.change}</Badge></CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.45fr_.75fr]">
        <Card className="border-white/8">
          <CardHeader className="flex-row items-start justify-between"><div><CardTitle className="font-heading">Faturamento em movimento</CardTitle><CardDescription>Receita realizada nos últimos 14 dias.</CardDescription></div><Badge variant="outline">Julho</Badge></CardHeader>
          <CardContent><RevenueChart /></CardContent>
        </Card>
        <Card className="overflow-hidden border-primary/20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.1),transparent_52%)]">
          <CardHeader><div className="mb-2 grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Sparkles /></div><CardTitle className="font-heading">Impacto gerado</CardTitle><CardDescription>Receita que o sistema ajudou a proteger ou criar neste mês.</CardDescription></CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="font-heading text-4xl font-semibold tracking-[-.05em]">€ 1.600</p>
            {impactMetrics.map((impact) => <div key={impact.label} className="flex items-center justify-between border-b border-white/8 pb-2 last:border-0"><div><p className="text-xs font-medium">{impact.label}</p><p className="text-[11px] text-muted-foreground">{impact.detail}</p></div><span className="font-mono text-sm text-white">+€{impact.value}</span></div>)}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="border-white/8">
          <CardHeader className="flex-row items-center justify-between"><div><CardTitle className="font-heading">Pulso de hoje</CardTitle><CardDescription>{appointments.length} reservas na linha do tempo.</CardDescription></div><Button asChild variant="ghost" size="sm"><Link href="/agenda">Agenda completa <ArrowRight data-icon="inline-end" /></Link></Button></CardHeader>
          <CardContent>
            <div className="relative flex flex-col gap-1 before:absolute before:bottom-4 before:left-[3.45rem] before:top-4 before:w-px before:bg-gradient-to-b before:from-primary before:via-primary/30 before:to-transparent">
              {appointments.slice(0, 5).map((appointment, index) => <div key={appointment.id} className="group relative grid grid-cols-[3rem_1rem_1fr] items-center gap-2 rounded-xl px-2 py-2.5 hover:bg-white/[.025]"><span className="font-mono text-xs text-muted-foreground">{appointment.time}</span><span className={`relative z-10 size-2 rounded-full ${index <= 1 ? "bg-primary" : "bg-muted-foreground"}`} /><div className="flex min-w-0 items-center justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-medium">{appointment.customer}</p><p className="truncate text-xs text-muted-foreground">{appointment.service} · {appointment.staff}</p></div><Badge variant={statusVariant(appointment.status)}>{appointment.status}</Badge></div></div>)}
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4">
          <Card className="border-white/8"><CardHeader><CardTitle className="font-heading text-base">Horários que ainda cabem</CardTitle><CardDescription>Oportunidades para hoje.</CardDescription></CardHeader><CardContent className="flex flex-col gap-2">{freeSlots.map((slot) => <div key={`${slot.time}-${slot.staff}`} className="flex items-center justify-between rounded-xl border border-dashed border-white/12 px-3 py-2.5"><div className="flex items-center gap-3"><span className="font-mono text-sm text-primary">{slot.time}</span><div><p className="text-xs font-medium">{slot.staff}</p><p className="text-[11px] text-muted-foreground">{slot.fit}</p></div></div><Button asChild variant="ghost" size="sm"><Link href="/fila-de-espera">Preencher</Link></Button></div>)}</CardContent></Card>
          <Card className="border-white/8"><CardHeader><CardTitle className="font-heading text-base">Ocupação da semana</CardTitle></CardHeader><CardContent className="flex flex-col gap-3">{weeklyOccupancy.map((item) => <div key={item.day} className="grid grid-cols-[2rem_1fr_2.5rem] items-center gap-3"><span className="font-mono text-[11px] text-muted-foreground">{item.day}</span><Progress value={item.occupancy} /><span className="text-right font-mono text-[11px]">{item.occupancy}%</span></div>)}</CardContent></Card>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border-white/8"><CardHeader className="flex-row items-center justify-between"><div><CardTitle className="font-heading">Quem move o resultado</CardTitle><CardDescription>Faturamento e ocupação por profissional.</CardDescription></div><Users className="text-muted-foreground" /></CardHeader><CardContent className="flex flex-col gap-4">{staff.map((member, index) => <div key={member.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-3"><Avatar><AvatarFallback style={{ backgroundColor: `${member.color}22`, color: member.color }}>{member.initials}</AvatarFallback></Avatar><div><div className="flex justify-between gap-3 text-sm"><span>{member.name}</span><span className="font-mono">€ {member.revenue}</span></div><Progress value={member.occupancy} className="mt-2 h-1.5" /></div><Badge variant="outline">#{index + 1}</Badge></div>)}</CardContent></Card>
        <Card className="border-white/8"><CardHeader><CardTitle className="font-heading">Insights</CardTitle><CardDescription>Recomendações baseadas no ritmo da operação.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3">{insights.map((insight) => <div key={insight.title} className="flex gap-3 rounded-xl border border-white/8 bg-white/[.018] p-3"><span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 text-white">{insight.kind === "warning" ? <CircleAlert className="size-4" /> : <TrendingUp className="size-4" />}</span><div><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-medium">{insight.title}</p><Badge variant="secondary">{insight.impact}</Badge></div><p className="mt-1 text-xs leading-5 text-muted-foreground">{insight.detail}</p></div></div>)}</CardContent></Card>
      </section>
    </div>
  );
}
