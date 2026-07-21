"use client";

import { useActionState } from "react";
import { XCircle } from "lucide-react";

import { cancelAppointmentAction, type AgendaActionState } from "@/app/(dashboard)/agenda/actions";
import { Button } from "@/components/ui/button";

const initialState: AgendaActionState = { status: "idle" };

export function AppointmentCancelButton({ appointmentId }: { appointmentId: string }) {
  const [state, action, pending] = useActionState(cancelAppointmentAction, initialState);
  return <form action={action} className="flex flex-col items-end gap-1"><input type="hidden" name="appointmentId" value={appointmentId} /><Button type="submit" size="sm" variant="outline" disabled={pending}><XCircle data-icon="inline-start" />{pending ? "Cancelando..." : "Cancelar"}</Button>{state.message ? <span className={state.status === "success" ? "max-w-48 text-right text-[11px] text-primary" : "max-w-48 text-right text-[11px] text-destructive"}>{state.message}</span> : null}</form>;
}
