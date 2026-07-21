"use client";

import { useActionState } from "react";
import { CalendarOff, Clock3, Settings2, Trash2 } from "lucide-react";

import { createTimeOffAction, removeTimeOffAction, saveAvailabilityAction, type AgendaActionState } from "@/app/(dashboard)/agenda/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialState: AgendaActionState = { status: "idle" };
const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

type StaffOption = { id: string; name: string };
type AvailabilityRow = { id: string; staffName: string; dayOfWeek: number; hours: string; breakHours: string };
type TimeOffRow = { id: string; staffName: string; period: string; reason: string };

function StateMessage({ state }: { state: AgendaActionState }) {
  return state.message ? <p className={state.status === "success" ? "text-sm text-primary" : "text-sm text-destructive"}>{state.message}</p> : null;
}

function WorkdayDialog({ staff }: { staff: StaffOption[] }) {
  const [state, action, pending] = useActionState(saveAvailabilityAction, initialState);
  return <Dialog><DialogTrigger asChild><Button type="button" variant="outline"><Settings2 data-icon="inline-start" />Editar jornada</Button></DialogTrigger><DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>Jornada semanal</DialogTitle><DialogDescription>Salvar substitui a jornada do profissional no dia selecionado.</DialogDescription></DialogHeader><form action={action} className="flex flex-col gap-4"><FieldGroup><Field><FieldLabel htmlFor="availabilityStaff">Profissional</FieldLabel><select id="availabilityStaff" name="staffId" className="h-9 rounded-lg border border-input bg-background px-3 text-sm" required>{staff.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></Field><div className="grid grid-cols-2 gap-3"><Field><FieldLabel htmlFor="dayOfWeek">Dia</FieldLabel><select id="dayOfWeek" name="dayOfWeek" className="h-9 rounded-lg border border-input bg-background px-3 text-sm">{weekdays.map((day, index) => <option key={day} value={index}>{day}</option>)}</select></Field><Field><FieldLabel htmlFor="availabilityEnabled">Situação</FieldLabel><select id="availabilityEnabled" name="enabled" className="h-9 rounded-lg border border-input bg-background px-3 text-sm"><option value="true">Trabalha</option><option value="false">Indisponível</option></select></Field></div><div className="grid grid-cols-2 gap-3"><Field><FieldLabel htmlFor="workStart">Início</FieldLabel><Input id="workStart" name="start" type="time" defaultValue="09:00" required /></Field><Field><FieldLabel htmlFor="workEnd">Fim</FieldLabel><Input id="workEnd" name="end" type="time" defaultValue="19:00" required /></Field></div><div className="grid grid-cols-2 gap-3"><Field><FieldLabel htmlFor="breakStart">Início do intervalo</FieldLabel><Input id="breakStart" name="breakStart" type="time" defaultValue="13:00" /></Field><Field><FieldLabel htmlFor="breakEnd">Fim do intervalo</FieldLabel><Input id="breakEnd" name="breakEnd" type="time" defaultValue="14:00" /></Field></div><StateMessage state={state} /></FieldGroup><DialogFooter><Button type="submit" disabled={pending}>{pending ? "Salvando..." : "Salvar jornada"}</Button></DialogFooter></form></DialogContent></Dialog>;
}

function TimeOffDialog({ staff }: { staff: StaffOption[] }) {
  const [state, action, pending] = useActionState(createTimeOffAction, initialState);
  return <Dialog><DialogTrigger asChild><Button type="button"><CalendarOff data-icon="inline-start" />Bloquear período</Button></DialogTrigger><DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>Novo bloqueio</DialogTitle><DialogDescription>Férias, consulta ou compromisso deixam de aparecer na reserva online.</DialogDescription></DialogHeader><form action={action} className="flex flex-col gap-4"><FieldGroup><Field><FieldLabel htmlFor="timeOffStaff">Profissional</FieldLabel><select id="timeOffStaff" name="staffId" className="h-9 rounded-lg border border-input bg-background px-3 text-sm" required>{staff.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></Field><div className="grid grid-cols-2 gap-3"><Field><FieldLabel htmlFor="timeOffStart">Início</FieldLabel><Input id="timeOffStart" name="startsAt" type="datetime-local" required /></Field><Field><FieldLabel htmlFor="timeOffEnd">Fim</FieldLabel><Input id="timeOffEnd" name="endsAt" type="datetime-local" required /></Field></div><Field><FieldLabel htmlFor="timeOffReason">Motivo</FieldLabel><Input id="timeOffReason" name="reason" placeholder="Férias, consulta, treinamento..." required /></Field><StateMessage state={state} /></FieldGroup><DialogFooter><Button type="submit" disabled={pending}>{pending ? "Salvando..." : "Registrar bloqueio"}</Button></DialogFooter></form></DialogContent></Dialog>;
}

function RemoveTimeOffButton({ id }: { id: string }) {
  const [state, action, pending] = useActionState(removeTimeOffAction, initialState);
  return <form action={action} className="flex items-center gap-2"><input type="hidden" name="timeOffId" value={id} /><Button type="submit" size="icon" variant="ghost" disabled={pending}><Trash2 /><span className="sr-only">Remover bloqueio</span></Button>{state.status === "error" ? <span className="text-[10px] text-destructive">{state.message}</span> : null}</form>;
}

export function AvailabilityManager({ staff, availability, timeOff }: { staff: StaffOption[]; availability: AvailabilityRow[]; timeOff: TimeOffRow[] }) {
  return <Card className="border-white/8"><CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle className="font-heading text-base">Disponibilidade da equipe</CardTitle><CardDescription>Jornadas recorrentes e bloqueios usados no cálculo de horários.</CardDescription></div><div className="flex flex-wrap gap-2"><WorkdayDialog staff={staff} /><TimeOffDialog staff={staff} /></div></CardHeader><CardContent className="grid gap-5 lg:grid-cols-2"><div><p className="mb-3 text-xs font-medium uppercase tracking-[.15em] text-muted-foreground">Jornada semanal</p><div className="max-h-64 space-y-2 overflow-auto pr-1">{availability.map((row) => <div key={row.id} className="flex items-center justify-between rounded-xl border border-white/8 p-3"><div><p className="text-sm font-medium">{row.staffName}</p><p className="mt-1 text-xs text-muted-foreground">{weekdays[row.dayOfWeek]} · {row.hours}</p></div><Badge variant="secondary">{row.breakHours}</Badge></div>)}{availability.length === 0 ? <p className="text-sm text-muted-foreground">Nenhuma jornada configurada.</p> : null}</div></div><div><p className="mb-3 text-xs font-medium uppercase tracking-[.15em] text-muted-foreground">Próximos bloqueios</p><div className="max-h-64 space-y-2 overflow-auto pr-1">{timeOff.map((row) => <div key={row.id} className="flex items-center justify-between rounded-xl border border-white/8 p-3"><div><p className="text-sm font-medium">{row.staffName}</p><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3" />{row.period}</p><p className="mt-1 text-xs text-muted-foreground">{row.reason}</p></div><RemoveTimeOffButton id={row.id} /></div>)}{timeOff.length === 0 ? <p className="text-sm text-muted-foreground">Nenhum bloqueio futuro.</p> : null}</div></div></CardContent></Card>;
}
