"use client";

import { Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SettingsForm() {
  return <form onSubmit={(event) => { event.preventDefault(); toast.success("Configurações salvas"); }} className="grid gap-4 lg:grid-cols-2"><Card><CardHeader><CardTitle className="font-heading text-base">Estabelecimento</CardTitle><CardDescription>Informações exibidas na página pública.</CardDescription></CardHeader><CardContent><FieldGroup><Field><FieldLabel htmlFor="businessName">Nome</FieldLabel><Input id="businessName" defaultValue="AS Barber Club" /></Field><Field><FieldLabel htmlFor="address">Endereço</FieldLabel><Input id="address" defaultValue="Rue Antoine Dansaert 74, Bruxelles" /></Field><Field><FieldLabel htmlFor="phoneSettings">Telefone</FieldLabel><Input id="phoneSettings" defaultValue="+32 2 555 01 84" /></Field></FieldGroup></CardContent></Card><Card><CardHeader><CardTitle className="font-heading text-base">Reserva e cancelamento</CardTitle><CardDescription>Políticas aplicadas aos novos agendamentos.</CardDescription></CardHeader><CardContent><FieldGroup><div className="grid grid-cols-2 gap-4"><Field><FieldLabel htmlFor="deposit">Sinal padrão (€)</FieldLabel><Input id="deposit" type="number" defaultValue="5" /></Field><Field><FieldLabel htmlFor="notice">Prazo (horas)</FieldLabel><Input id="notice" type="number" defaultValue="24" /></Field></div><Field orientation="horizontal"><Checkbox id="credit" defaultChecked /><div><FieldLabel htmlFor="credit">Converter em crédito</FieldLabel><FieldDescription>Cancelamentos no prazo mantêm o valor para a próxima visita.</FieldDescription></div></Field><Button type="submit"><Save data-icon="inline-start" /> Salvar configurações</Button></FieldGroup></CardContent></Card></form>;
}

