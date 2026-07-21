"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock3, Plus, Scissors } from "lucide-react";

import { AppointmentCancelButton } from "@/components/dashboard/appointment-actions";
import { AvailabilityManager } from "@/components/dashboard/availability-manager";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Appointment = { id: string; dateKey: string; time: string; end: string; customer: string; service: string; staff: string; staffInitials: string; status: string; cancellable: boolean };
type Day = { value: string; label: string };
type AvailabilityManagement = {
  staff: { id: string; name: string }[];
  availability: { id: string; staffName: string; dayOfWeek: number; hours: string; breakHours: string }[];
  timeOff: { id: string; staffName: string; period: string; reason: string }[];
};

export function AgendaWorkspace({ appointments, days, tenantSlug, canEdit, availabilityManagement }: { appointments: Appointment[]; days: Day[]; tenantSlug: string; canEdit: boolean; availabilityManagement?: AvailabilityManagement }) {
  const [dayIndex, setDayIndex] = useState(0);
  const visible = useMemo(() => appointments.filter((item) => item.dateKey === days[dayIndex]?.value), [appointments, dayIndex, days]);
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-2 text-xs font-medium uppercase tracking-[.18em] text-primary">Operação persistida</p><h1 className="font-heading text-3xl font-semibold tracking-[-.035em]">Agenda</h1><p className="mt-2 text-sm text-muted-foreground">Reservas e cancelamentos carregados diretamente do banco.</p></div><div className="flex items-center gap-2"><Button type="button" variant="outline" size="icon" onClick={() => setDayIndex((current) => Math.max(0, current - 1))} disabled={dayIndex === 0}><ChevronLeft /><span className="sr-only">Dia anterior</span></Button><Badge variant="outline" className="h-9 min-w-36 justify-center">{days[dayIndex]?.label}</Badge><Button type="button" variant="outline" size="icon" onClick={() => setDayIndex((current) => Math.min(days.length - 1, current + 1))} disabled={dayIndex === days.length - 1}><ChevronRight /><span className="sr-only">Próximo dia</span></Button>{canEdit ? <Button asChild><Link href={`/barbearia/${tenantSlug}/agendar`}><Plus data-icon="inline-start" />Novo</Link></Button> : null}</div></section>
      {availabilityManagement ? <AvailabilityManager {...availabilityManagement} /> : null}
      <div className="grid gap-3">{visible.map((appointment) => <Card key={appointment.id} className="border-white/8"><CardContent className="grid gap-4 p-5 md:grid-cols-[100px_1fr_1fr_auto] md:items-center"><div><p className="font-heading text-xl font-semibold">{appointment.time}</p><p className="text-xs text-muted-foreground">até {appointment.end}</p></div><div><p className="font-medium">{appointment.customer}</p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Scissors className="size-3" />{appointment.service}</p></div><div className="flex items-center gap-3"><Avatar><AvatarFallback>{appointment.staffInitials}</AvatarFallback></Avatar><div><p className="text-sm">{appointment.staff}</p><Badge variant="secondary" className="mt-1">{appointment.status}</Badge></div></div>{canEdit && appointment.cancellable ? <AppointmentCancelButton appointmentId={appointment.id} /> : <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3" />Histórico preservado</span>}</CardContent></Card>)}{visible.length === 0 ? <Card><CardContent className="p-12 text-center text-sm text-muted-foreground">Nenhum agendamento neste dia.</CardContent></Card> : null}</div>
    </div>
  );
}
