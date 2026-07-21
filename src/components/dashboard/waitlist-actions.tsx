"use client";

import { useActionState } from "react";
import { Plus, Send } from "lucide-react";

import { createWaitlistEntryAction, offerWaitlistSlotAction, type WaitlistActionState } from "@/app/(dashboard)/fila-de-espera/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const initialState: WaitlistActionState = { status: "idle" };

export function WaitlistOfferButton({ entryId }: { entryId: string }) {
  const [state, action, pending] = useActionState(offerWaitlistSlotAction, initialState);
  return <form action={action} className="flex flex-col items-end gap-1"><input type="hidden" name="entryId" value={entryId} /><Button type="submit" size="sm" variant="outline" disabled={pending}><Send data-icon="inline-start" />{pending ? "Oferecendo..." : "Oferecer"}</Button>{state.message ? <span className={state.status === "success" ? "max-w-52 text-right text-[11px] text-primary" : "max-w-52 text-right text-[11px] text-destructive"}>{state.message}</span> : null}</form>;
}

export function AddWaitlistButton({ customers, services, staff }: { customers: { id: string; name: string }[]; services: { id: string; name: string }[]; staff: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState(createWaitlistEntryAction, initialState);
  return <Dialog><DialogTrigger asChild><Button><Plus data-icon="inline-start" />Adicionar à fila</Button></DialogTrigger><DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>Nova entrada</DialogTitle><DialogDescription>Defina cliente, serviço e a janela em que ele aceita receber uma vaga.</DialogDescription></DialogHeader><form action={action} className="flex flex-col gap-4"><FieldGroup><Field><FieldLabel htmlFor="waitCustomer">Cliente</FieldLabel><select id="waitCustomer" name="customerId" className="h-9 rounded-lg border border-input bg-transparent px-3 text-sm" required>{customers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></Field><Field><FieldLabel htmlFor="waitService">Serviço</FieldLabel><select id="waitService" name="serviceId" className="h-9 rounded-lg border border-input bg-transparent px-3 text-sm" required>{services.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></Field><Field><FieldLabel htmlFor="waitStaff">Profissional</FieldLabel><select id="waitStaff" name="staffId" className="h-9 rounded-lg border border-input bg-transparent px-3 text-sm"><option value="">Qualquer profissional</option>{staff.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></Field><Field><FieldLabel htmlFor="desiredDate">Data desejada</FieldLabel><Input id="desiredDate" name="desiredDate" type="date" required /></Field><div className="grid grid-cols-2 gap-3"><Field><FieldLabel htmlFor="windowStartMinute">Início em minutos</FieldLabel><Input id="windowStartMinute" name="windowStartMinute" type="number" defaultValue="540" min="0" max="1439" required /></Field><Field><FieldLabel htmlFor="windowEndMinute">Fim em minutos</FieldLabel><Input id="windowEndMinute" name="windowEndMinute" type="number" defaultValue="1140" min="1" max="1440" required /></Field></div>{state.message ? <p className={state.status === "success" ? "text-sm text-primary" : "text-sm text-destructive"}>{state.message}</p> : null}</FieldGroup><DialogFooter><Button type="submit" disabled={pending}>{pending ? "Salvando..." : "Salvar entrada"}</Button></DialogFooter></form></DialogContent></Dialog>;
}
