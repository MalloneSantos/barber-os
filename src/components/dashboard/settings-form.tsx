"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";

import { updateSettingsAction, type ModuleActionState } from "@/app/(dashboard)/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type Settings = { name: string; address: string | null; phone: string | null; defaultDepositCents: number; cancellationNoticeHours: number };
const initialState: ModuleActionState = { status: "idle" };

export function SettingsForm({ settings }: { settings: Settings }) {
  const [state, action, pending] = useActionState(updateSettingsAction, initialState);
  return <form action={action} className="grid gap-4 lg:grid-cols-2"><Card><CardHeader><CardTitle className="font-heading text-base">Estabelecimento</CardTitle><CardDescription>Informações exibidas na página pública.</CardDescription></CardHeader><CardContent><FieldGroup><Field><FieldLabel htmlFor="businessName">Nome</FieldLabel><Input id="businessName" name="name" defaultValue={settings.name} required /></Field><Field><FieldLabel htmlFor="address">Endereço</FieldLabel><Input id="address" name="address" defaultValue={settings.address ?? ""} required /></Field><Field><FieldLabel htmlFor="phoneSettings">Telefone</FieldLabel><Input id="phoneSettings" name="phone" defaultValue={settings.phone ?? ""} required /></Field></FieldGroup></CardContent></Card><Card><CardHeader><CardTitle className="font-heading text-base">Reserva e cancelamento</CardTitle><CardDescription>Políticas aplicadas aos novos agendamentos.</CardDescription></CardHeader><CardContent><FieldGroup><div className="grid grid-cols-2 gap-4"><Field><FieldLabel htmlFor="deposit">Sinal padrão (€)</FieldLabel><Input id="deposit" name="defaultDeposit" type="number" step="0.01" defaultValue={settings.defaultDepositCents / 100} required /></Field><Field><FieldLabel htmlFor="notice">Prazo (horas)</FieldLabel><Input id="notice" name="cancellationNoticeHours" type="number" defaultValue={settings.cancellationNoticeHours} required /></Field></div>{state.message ? <p className={state.status === "success" ? "text-sm text-primary" : "text-sm text-destructive"}>{state.message}</p> : null}<Button type="submit" disabled={pending}><Save data-icon="inline-start" /> {pending ? "Salvando..." : "Salvar configurações"}</Button></FieldGroup></CardContent></Card></form>;
}
