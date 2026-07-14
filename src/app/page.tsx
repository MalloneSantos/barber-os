import Link from "next/link";
import { ArrowRight, CalendarCheck, Check, Sparkles } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { impactMetrics, weeklyOccupancy } from "@/data/demo";

const outcomes = [
  "Reduza faltas com sinais e lembretes",
  "Preencha cancelamentos com fila inteligente",
  "Traga clientes de volta no momento certo",
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <BrandMark />
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/barbearia/as-barber-club">Ver barbearia</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Entrar <ArrowRight data-icon="inline-end" /></Link>
          </Button>
        </div>
      </nav>

      <section className="relative mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-14 px-5 pb-20 pt-10 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pt-0">
        <div className="relative z-10 max-w-2xl">
          <Badge variant="outline" className="mb-7 border-primary/30 bg-primary/10 text-primary-foreground">
            <Sparkles aria-hidden="true" /> O sistema operacional da sua barbearia
          </Badge>
          <h1 className="font-heading text-balance text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-[5.25rem]">
            Cada cadeira cheia. Cada cliente, <span className="text-primary">de volta.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Agenda, relacionamento e crescimento em um só lugar. Menos faltas, mais ocupação e decisões que aparecem no caixa.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-xl px-6">
              <Link href="/login">Explorar demonstração <ArrowRight data-icon="inline-end" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-xl px-6">
              <Link href="/barbearia/as-barber-club/agendar"><CalendarCheck data-icon="inline-start" /> Agendar como cliente</Link>
            </Button>
          </div>
          <div className="mt-9 flex flex-col gap-3">
            {outcomes.map((outcome) => (
              <div key={outcome} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="grid size-5 place-items-center rounded-full bg-[#B7F34A]/12 text-[#B7F34A]"><Check className="size-3" aria-hidden="true" /></span>
                {outcome}
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:pl-4">
          <div className="absolute -inset-20 -z-10 rounded-full bg-primary/10 blur-3xl" />
          <Card className="panel-glow overflow-hidden border-white/10 bg-card/80 py-0 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <div>
                <p className="font-heading text-sm font-semibold">Pulso da operação</p>
                <p className="text-xs text-muted-foreground">Terça-feira, 14 de julho</p>
              </div>
              <Badge className="bg-[#B7F34A]/12 text-[#B7F34A]">Ao vivo</Badge>
            </div>
            <CardContent className="p-5 sm:p-7">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 rounded-2xl border border-white/8 bg-black/15 p-4">
                  <p className="text-xs text-muted-foreground">Receita recuperada</p>
                  <p className="font-heading mt-2 text-3xl font-semibold">€ 1.600</p>
                  <p className="mt-1 text-xs text-[#B7F34A]">+24% este mês</p>
                </div>
                <div className="rounded-2xl bg-primary p-4 text-primary-foreground">
                  <p className="text-xs opacity-75">Ocupação</p>
                  <p className="font-heading mt-2 text-3xl font-semibold">87%</p>
                  <p className="mt-1 text-xs opacity-75">32 serviços</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-3 flex items-end justify-between">
                  <div><p className="text-xs text-muted-foreground">Ocupação semanal</p><p className="font-heading text-lg font-semibold">Cadeiras em movimento</p></div>
                  <p className="font-mono text-xs text-muted-foreground">38 → 100%</p>
                </div>
                <div className="flex h-32 items-end gap-2 rounded-2xl border border-white/8 bg-black/15 p-4">
                  {weeklyOccupancy.map((day) => (
                    <div key={day.day} className="flex h-full flex-1 flex-col justify-end gap-2">
                      <div className="rounded-md bg-gradient-to-t from-primary to-[#C4B5FD] transition-opacity hover:opacity-80" style={{ height: `${day.occupancy}%` }} />
                      <span className="text-center font-mono text-[10px] text-muted-foreground">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {impactMetrics.slice(0, 2).map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/8 px-3 py-3">
                    <div><p className="text-xs text-muted-foreground">{item.label}</p><p className="font-heading font-semibold">€ {item.value}</p></div>
                    <span className="size-2 rounded-full bg-[#B7F34A] shadow-[0_0_12px_#B7F34A]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

