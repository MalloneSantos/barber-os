"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { appointments, staff } from "@/data/demo";

const days = ["Seg, 13 jul", "Ter, 14 jul", "Qua, 15 jul", "Qui, 16 jul", "Sex, 17 jul"];
const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export function AgendaWorkspace() {
  const [dayIndex, setDayIndex] = useState(1);
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><p className="mb-2 text-xs font-medium uppercase tracking-[.18em] text-primary">Operação do dia</p><h1 className="font-heading text-3xl font-semibold tracking-[-.035em]">Agenda</h1><p className="mt-2 text-sm text-muted-foreground">Disponibilidade e reservas por profissional.</p></div>
        <div className="flex items-center gap-2"><Button variant="outline" size="icon" onClick={() => setDayIndex((current) => Math.max(0, current - 1))}><ChevronLeft /><span className="sr-only">Dia anterior</span></Button><Badge variant="outline" className="h-9 min-w-32 justify-center">{days[dayIndex]}</Badge><Button variant="outline" size="icon" onClick={() => setDayIndex((current) => Math.min(days.length - 1, current + 1))}><ChevronRight /><span className="sr-only">Próximo dia</span></Button><Button onClick={() => toast.info("Novo agendamento", { description: "Use o botão rápido no painel para registrar a reserva." })}><Plus data-icon="inline-start" /> Novo</Button></div>
      </section>
      <Card className="panel-glow overflow-hidden border-white/8 py-0">
        <CardContent className="overflow-x-auto p-0">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[70px_repeat(4,1fr)] border-b border-white/8 bg-white/[.018]">
              <div className="p-4" />
              {staff.map((member) => <div key={member.id} className="flex items-center gap-2 border-l border-white/8 p-3"><Avatar className="size-8"><AvatarFallback style={{ color: member.color, backgroundColor: `${member.color}18` }}>{member.initials}</AvatarFallback></Avatar><div><p className="text-xs font-medium">{member.name.split(" ")[0]}</p><p className="text-[10px] text-muted-foreground">{member.occupancy}% ocupado</p></div></div>)}
            </div>
            {hours.map((hour, hourIndex) => <div key={hour} className="grid min-h-20 grid-cols-[70px_repeat(4,1fr)] border-b border-white/6 last:border-0"><div className="p-3 text-right font-mono text-[11px] text-muted-foreground">{hour}</div>{staff.map((member, staffIndex) => { const apt = appointments.find((item, index) => item.time.startsWith(hour.slice(0, 2)) && index % 4 === staffIndex); return <div key={member.id} className="relative border-l border-white/6 p-1.5">{apt ? <button type="button" onClick={() => toast(apt.customer, { description: `${apt.service} · ${apt.time}–${apt.end}` })} className="h-full w-full rounded-xl border border-primary/20 bg-primary/10 p-2 text-left transition-colors hover:bg-primary/15"><div className="flex items-center justify-between"><span className="text-xs font-medium">{apt.customer}</span><span className="size-1.5 rounded-full bg-primary" /></div><p className="mt-1 text-[10px] text-muted-foreground">{apt.service}</p><p className="mt-2 font-mono text-[10px] text-primary">{apt.time}–{apt.end}</p></button> : hourIndex > 3 ? <button type="button" onClick={() => toast.success(`Horário ${hour} selecionado`, { description: `Disponível com ${member.name}.` })} className="h-full w-full rounded-xl border border-dashed border-transparent text-[10px] text-transparent transition-colors hover:border-white/10 hover:text-muted-foreground">Disponível</button> : null}</div>; })}</div>)}
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary" /> Confirmado</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-amber-400" /> Sinal pendente</span><Badge variant="outline">Arraste e solte preparado para V2</Badge></div>
    </div>
  );
}
